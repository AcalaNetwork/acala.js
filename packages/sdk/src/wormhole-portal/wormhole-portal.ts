import { AnyApi } from '@acala-network/sdk-core';
import { encodeAddress } from '@polkadot/util-crypto';
import {
  // eslint-disable-next-line camelcase
  TokenImplementation__factory,
  // eslint-disable-next-line camelcase
  Bridge__factory,
  Implementation__factory,
  CHAIN_ID_ACALA,
  CHAIN_ID_KARURA,
  createNonce,
  coalesceChainId,
  parseSequenceFromLogEth,
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
  SubstractAPINotFound
} from './errors';
import {
  WormholePortalConfigs,
  TransferParams,
  WormholeRouter,
  WormholeToken,
  SupportToken,
  RedeemParams
} from './types';
import { Provider, TransactionRequest } from '@ethersproject/abstract-provider';
import { BaseProvider } from '@acala-network/eth-providers';
import { toBN } from '@acala-network/bodhi/lib/utils';
import { DEFAULT_ROUTERS } from './consts/routers';
import { uniqBy } from 'lodash';
import { arrayify, getAddress, zeroPad } from 'ethers/lib/utils';
import { toPromiseQuery } from '../utils/query';
import { BigNumber } from 'ethers';
import { ApiPromise } from '@polkadot/api';

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

  private getSubstractAPIByChainName(chain: SupportChain): AnyApi {
    const result = this.apis?.[chain as 'acala' | 'karura'];

    if (!result) throw new SubstractAPINotFound(chain);

    return result;
  }

  private getEthProviderByChainName(chain: SupportChain) {
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

  private getBridgeContract(chain: SupportChain, symbol: SupportToken) {
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
    const { token, fromChain, toChain, txHash } = params;

    const fromProvider = this.getEthProviderByChainName(fromChain);
    const receipt = await fromProvider.getTXReceiptByHash(txHash);
    const tokenData = this.getToken(fromChain, token);
    console.log('tx receiptent', receipt);

    if (!receipt) throw new QueryTxReceiptFailed(txHash);

    receipt.logs.forEach((item) => {
      console.log(item.topics);
    });

    const bridgeContract = this.getBridgeContract(fromChain, token);
    // get implementation contract instance
    // eslint-disable-next-line camelcase
    const implementationContract = new Implementation__factory();

    const logMessagePublished = implementationContract.interface.decodeEventLog(
      'LogMessagePublished',
      receipt.logs[2].data,
      receipt.logs[2].topics
    );

    console.log(logMessagePublished.sequence.toString());

    const { vaaBytes } = await getSignedVAAWithRetry(
      [
        'https://wormhole-v2-mainnet-api.certus.one',
        'https://wormhole.inotel.ro',
        'https://wormhole-v2-mainnet-api.mcf.rocks',
        'https://wormhole-v2-mainnet-api.chainlayer.network',
        'https://wormhole-v2-mainnet-api.staking.fund',
        'https://wormhole-v2-mainnet.01node.com'
      ],
      this.getChainId(fromChain),
      getEmitterAddressEth(tokenData.bridgeAddress),
      logMessagePublished.sequence.toString()
    );

    // console.log('sequence', sequence);
    console.log(test, vaaBytes);
  }

  // public submitProof() {}

  // public withdraw() {}
}
