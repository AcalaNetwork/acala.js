import { encodeAddress } from '@polkadot/util-crypto';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import {
  // eslint-disable-next-line camelcase
  TokenImplementation__factory,
  // eslint-disable-next-line camelcase
  Bridge__factory,
  // eslint-disable-next-line camelcase
  Implementation__factory,
  CHAIN_ID_ACALA,
  CHAIN_ID_KARURA,
  createNonce,
  coalesceChainId,
  getSignedVAAWithRetry,
  getEmitterAddressEth
} from '@certusone/wormhole-sdk';

import { combineLatest, firstValueFrom, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSDK } from '../types';
import { SupportChain } from './consts';
import {
  CreateEVMTransactionFailed,
  NeedBindEVMAddress,
  NotSupportChain,
  NotSupportToken,
  QueryTxReceiptFailed,
  SubstractAPINotFound,
  TopicMismatch
} from './errors';
import {
  WormholePortalConfigs,
  TransferParams,
  WormholeRouter,
  WormholeToken,
  SupportToken,
  RedeemParams
} from './types';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BaseProvider } from '@acala-network/eth-providers';
import { toBN } from '@acala-network/bodhi/lib/utils';
import { DEFAULT_ROUTERS } from './consts/routers';
import { uniqBy } from 'lodash';
import { arrayify, getAddress, zeroPad } from 'ethers/lib/utils';
import { toPromiseQuery } from '../utils/query';
import { BigNumber } from 'ethers';
import { ApiPromise } from '@polkadot/api';
import { wormholeVAAAPIS } from './consts/wormhole-vaa-apis';

export class WormholePortal implements BaseSDK {
  private apis: {
    acala: ApiPromise;
    karura: ApiPromise;
  };

  private ethProviders: {
    acala: BaseProvider;
    karura: BaseProvider;
  };

  private routers: WormholeRouter[];

  private tokens: WormholeToken[];

  // cache evm bind address
  private evmAddresses: Record<string, string>;

  constructor({ ethProviders, routers }: WormholePortalConfigs) {
    this.ethProviders = ethProviders;

    // eject api form eth provider
    this.apis = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      acala: this.ethProviders.acala._api!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      karura: this.ethProviders.karura._api!
    };

    this.routers = routers || DEFAULT_ROUTERS;
    // eject tokens information from routers
    this.tokens = this.getTokensFromRouters();

    // cached evm address
    this.evmAddresses = {};
  }

  private getTokensFromRouters() {
    return uniqBy(
      this.routers.map((i) => i.token),
      (i) => `${i.address}-${i.chain}`
    );
  }

  get isReady$(): Observable<boolean> {
    const apis = Object.values(this.apis);

    return combineLatest(apis.map((item) => from(item.isReady))).pipe(map((values) => values.length === apis.length));
  }

  get isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$);
  }

  public getSubstractAPIByChainName(chain: SupportChain): ApiPromise {
    const result = this.apis?.[chain as 'acala' | 'karura'];

    if (!result) throw new SubstractAPINotFound(chain);

    return result;
  }

  public getEthProviderByChainName(chain: SupportChain) {
    const temp = this.ethProviders?.[chain as 'acala' | 'karura'];

    if (!temp) throw new SubstractAPINotFound(chain);

    return temp;
  }

  public getToken(chain: SupportChain, symbol: SupportToken) {
    const token = this.tokens.find((i) => i.chain === chain && i.symbol === symbol);

    if (!token) throw new NotSupportToken(symbol);

    return token;
  }

  public getChainId(chain: SupportChain) {
    if (chain === 'acala') return CHAIN_ID_ACALA;

    if (chain === 'karura') return CHAIN_ID_KARURA;

    throw new NotSupportChain(chain);
  }

  public getTokenContract(chain: SupportChain, symbol: SupportToken) {
    const provider = this.getEthProviderByChainName(chain);
    const token = this.getToken(chain, symbol);

    // eslint-disable-next-line camelcase
    return TokenImplementation__factory.connect(token.address, provider);
  }

  public getBridgeContract(chain: SupportChain, symbol: SupportToken) {
    const provider = this.getEthProviderByChainName(chain);
    const token = this.getToken(chain, symbol);

    // eslint-disable-next-line camelcase
    return Bridge__factory.connect(token.bridgeAddress, provider);
  }

  public isEthereumAddress(address: string) {
    if (!address.startsWith('0x')) return false;

    try {
      getAddress(address);

      return true;
    } catch (e) {
      // ignore error
    }

    return false;
  }

  public isSubstractAddress(address: string) {
    try {
      encodeAddress(address);

      return true;
    } catch (e) {
      // ignore error
    }

    return false;
  }

  public async getEVMAddress(chain: SupportChain, address: string): Promise<string | undefined> {
    if (this.isEthereumAddress(address)) return address;

    // hit cache
    if (this.evmAddresses[address]) return this.evmAddresses[address];

    const api = this.getSubstractAPIByChainName(chain);

    return toPromiseQuery(api.query.evmAccounts.evmAddresses(address))
      .then((result) => {
        console.log('evm address', result.toString());

        const evmAddress = result.unwrap().toString();

        this.evmAddresses[address] = evmAddress;

        return getAddress(evmAddress);
      })
      .catch(() => {
        // ignore error
        return undefined;
      });
  }

  public async getTokenBalance(chain: SupportChain, symbol: SupportToken, address: string): Promise<BigNumber> {
    const token = this.getTokenContract(chain, symbol);

    const evmAddress = await this.getEVMAddress(chain, address);

    if (!evmAddress) throw new NeedBindEVMAddress(address);

    const balance = await token.balanceOf(evmAddress);

    return balance;
  }

  private async getEVMCallFromETHTransaction(transaction: TransactionRequest, provider: BaseProvider) {
    const resources = await provider.estimateResources(transaction);

    let gasLimit: BigNumber;
    let storageLimit: BigNumber;
    let totalLimit = transaction.gasLimit;

    if (totalLimit === null || totalLimit === undefined) {
      gasLimit = resources.gas;
      storageLimit = resources.storage;
      totalLimit = resources.gas.add(resources.storage);
    } else {
      const estimateTotalLimit = resources.gas.add(resources.storage);

      gasLimit = BigNumber.from(totalLimit).mul(resources.gas).div(estimateTotalLimit).add(1);
      storageLimit = BigNumber.from(totalLimit).mul(resources.storage).div(estimateTotalLimit).add(1);
    }

    transaction.gasLimit = totalLimit;

    if (!transaction.data) {
      throw new CreateEVMTransactionFailed('Request data not found');
    }

    if (!transaction.from) {
      throw new CreateEVMTransactionFailed('Request from not found');
    }

    if (!transaction.to) {
      return provider.api.tx.evm.create(
        transaction.data.toString(),
        toBN(transaction.value),
        toBN(gasLimit),
        toBN(storageLimit.isNegative() ? 0 : storageLimit),
        (transaction.accessList || []) as any
      );
    } else {
      return provider.api.tx.evm.call(
        transaction.to,
        transaction.data.toString(),
        toBN(transaction.value),
        toBN(gasLimit),
        toBN(storageLimit.isNegative() ? 0 : storageLimit),
        (transaction.accessList || []) as any
      );
    }
  }

  public async approve(params: TransferParams) {
    const { amount, fromChain, toChain, fromAddress, toAddress, token } = params;

    const fromEVMAddress = await this.getEVMAddress(fromChain, fromAddress);
    const toEVMAddress = await this.getEVMAddress(toChain, toAddress);

    if (!(fromEVMAddress && toEVMAddress)) throw new NeedBindEVMAddress(`${fromAddress}/${toAddress}`);

    const fromProvider = this.getEthProviderByChainName(fromChain) as BaseProvider;
    const tokenContract = this.getTokenContract(fromChain, token);
    const tokenData = this.getToken('acala', token);

    // create tx payload
    const tx = await tokenContract.populateTransaction.approve(tokenData.bridgeAddress, amount.toString());

    // insert from field for estimate resource
    tx.from = fromEVMAddress;

    return this.getEVMCallFromETHTransaction(tx, fromProvider);
  }

  public async transfer(params: TransferParams) {
    const { amount, fromChain, toChain, fromAddress, toAddress, token } = params;

    const fromEVMAddress = await this.getEVMAddress(fromChain, fromAddress);
    const toEVMAddress = await this.getEVMAddress(toChain, toAddress);

    if (!(fromEVMAddress && toEVMAddress)) throw new NeedBindEVMAddress(`${fromAddress}/${toAddress}`);

    const fromProvider = this.getEthProviderByChainName(fromChain);
    const bridgeContract = this.getBridgeContract(fromChain, token);
    const tokenData = this.getToken(fromChain, token);
    const formatedToAddress = toEVMAddress ? zeroPad(arrayify(toEVMAddress), 32) : '';

    // create tx payload
    const tx = await bridgeContract.populateTransaction.transferTokens(
      tokenData.address,
      amount,
      coalesceChainId(toChain),
      formatedToAddress,
      // relayerFee is zero in default
      0,
      createNonce()
    );

    // insert from field for estimate resource
    tx.from = fromEVMAddress;

    return this.getEVMCallFromETHTransaction(tx, fromProvider);
  }

  public async redeem(params: RedeemParams) {
    const { token, fromChain, toChain, toAddress, txHash } = params;

    const fromProvider = this.getEthProviderByChainName(fromChain);
    const toProvider = this.getEthProviderByChainName(toChain);
    const receipt = await fromProvider.getTXReceiptByHash(txHash);
    const tokenData = this.getToken(fromChain, token);
    const toEVMAddress = await this.getEVMAddress(toChain, toAddress);

    if (!receipt) throw new QueryTxReceiptFailed(txHash);

    const bridgeContract = this.getBridgeContract(toChain, token);
    // eslint-disable-next-line camelcase
    const implementationContract = new Implementation__factory();

    const topicHash = implementationContract.interface.getEventTopic('LogMessagePublished');

    console.log(topicHash);

    const target = receipt.logs.find((item) => item.topics[0] === topicHash);

    if (!target) throw new TopicMismatch();

    const logMessagePublished = implementationContract.interface.decodeEventLog(
      'LogMessagePublished',
      target.data,
      target.topics
    );

    const { vaaBytes } = await getSignedVAAWithRetry(
      wormholeVAAAPIS,
      this.getChainId(fromChain),
      getEmitterAddressEth(tokenData.bridgeAddress),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      logMessagePublished.sequence.toString(),
      {
        transport: NodeHttpTransport()
      }
    );

    const tx = await bridgeContract.populateTransaction.completeTransfer(vaaBytes);

    tx.from = toEVMAddress;

    return this.getEVMCallFromETHTransaction(tx, toProvider);
  }
}
