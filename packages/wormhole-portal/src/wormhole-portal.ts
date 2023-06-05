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
import { BaseSDK } from '@acala-network/sdk';
import { SupportChain } from './consts';
import {
  ConvertAssetsShouldNotEqual,
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
  RedeemParams,
  ConvertParams
} from './types';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BaseProvider } from '@acala-network/eth-providers';
import { DEFAULT_ROUTERS } from './consts/routers';
import { arrayify, getAddress, zeroPad } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import { ApiPromise } from '@polkadot/api';
import { wormholeVAAAPIS } from './consts/wormhole-vaa-apis';
import { DEFAULT_TOKENS } from './consts/tokens';
import { getTxReceiptWithRetry, toBN } from './utils';

export class WormholePortal implements BaseSDK {
  private apis: {
    acala: ApiPromise;
    karura: ApiPromise;
  };

  private ethProviders: {
    acala: BaseProvider;
    karura: BaseProvider;
  };

  public readonly routers: WormholeRouter[];

  public readonly tokens: WormholeToken[];

  // cache evm bind address
  private evmAddresses: Record<string, string>;

  constructor({ ethProviders, routers, supportTokens }: WormholePortalConfigs) {
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
    this.tokens = supportTokens || DEFAULT_TOKENS;

    // cached evm address
    this.evmAddresses = {};
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

    const provider = this.getEthProviderByChainName(chain);

    return provider.getEvmAddress(address);
  }

  public async getTokenBalance(chain: SupportChain, symbol: SupportToken, address: string): Promise<BigNumber> {
    const token = this.getTokenContract(chain, symbol);

    const evmAddress = await this.getEVMAddress(chain, address);

    if (!evmAddress) throw new NeedBindEVMAddress(address);

    const balance = await token.balanceOf(evmAddress);

    return balance;
  }

  private async getEVMCallFromETHTransaction(transaction: TransactionRequest, provider: BaseProvider) {
    const { usedStorage, gasLimit } = await provider.estimateResources(transaction);

    transaction.gasLimit = gasLimit;

    if (!transaction.data) {
      throw new CreateEVMTransactionFailed('Request data not found');
    }

    if (!transaction.from) {
      throw new CreateEVMTransactionFailed('Request from not found');
    }

    if (!transaction.to) {
      return provider.api.tx.evm.create(
        transaction.data.toString(),
        toBN(transaction.value).toString(),
        toBN(gasLimit).toString(),
        toBN(usedStorage.isNegative() ? 0 : usedStorage.add(BigNumber.from(10))).toString(),
        (transaction.accessList || []) as any
      );
    } else {
      return provider.api.tx.evm.call(
        transaction.to,
        transaction.data.toString(),
        toBN(transaction.value).toString(),
        toBN(gasLimit).toString(),
        toBN(usedStorage.isNegative() ? 0 : usedStorage.add(BigNumber.from(10))).toString(),
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
    const tokenData = this.getToken(fromChain, token);

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
    const tokenData = this.getToken(fromChain, token);
    const toEVMAddress = await this.getEVMAddress(toChain, toAddress);

    const receipt = await getTxReceiptWithRetry(fromProvider, txHash);
    if (!receipt) throw new QueryTxReceiptFailed(txHash);

    const bridgeContract = this.getBridgeContract(toChain, token);
    // eslint-disable-next-line camelcase
    const implementationContract = new Implementation__factory();
    const topicHash = implementationContract.interface.getEventTopic('LogMessagePublished');
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

  public async convert(params: ConvertParams) {
    const { from, to, address, amount } = params;

    if (from === to) throw new ConvertAssetsShouldNotEqual();

    // the convert required only in karura
    const api = this.getSubstractAPIByChainName('karura');

    // convert waUSD to aUSD
    if (from === 'waUSD') {
      let sendAmount = amount;

      if (amount === 'all') {
        sendAmount = await this.getTokenBalance('karura', 'waUSD', address);
      }

      return api.tx.honzonBridge.fromBridged(sendAmount.toString());
    }

    // convert aUSD to waUSD
    let sendAmount = BigNumber.from(0);

    if (amount === 'all') {
      sendAmount = await this.getTokenBalance('karura', 'aUSD', address);
    }

    return api.tx.honzonBridge.toBridged(sendAmount.toString());
  }
}
