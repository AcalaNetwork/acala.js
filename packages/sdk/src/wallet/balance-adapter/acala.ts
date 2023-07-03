import { AnyApi, FixedPointNumber, FixedPointNumber as FN, forceToCurrencyName, Token } from '@acala-network/sdk-core';
import { BaseProvider } from '@ethersproject/providers';
import { OrmlAccountData } from '@open-web3/orml-types/interfaces';
import { utils } from 'ethers';
import { map } from 'rxjs/operators';
import { AccountInfo, Balance } from '@polkadot/types/interfaces';
import { BalanceData } from '../types';
import { AcalaExpandBalanceAdapter } from './types';
import { Observable } from 'rxjs';
import { NotSupportETHAddress, NotSupportEVM} from '../errors';
import { Storage } from '../../utils/storage';
import { ERC20Adapter } from './erc20-adapter';

interface AcalaAdapterConfigs {
  api: AnyApi;
  evm?: BaseProvider;
}

const createStorages = (api: AnyApi) => {
  return {
    nativeBalance: (address: string) =>
      Storage.create<AccountInfo>({
        api: api,
        query: api.query.system.account,
        params: [address]
      }),
    nonNativeBalance: (token: Token, address: string) =>
      Storage.create<OrmlAccountData>({
        api: api,
        query: api.query.tokens.accounts,
        params: [address, token.toChainData()]
      }),
    issuance: (token: Token) => {
      const nativeTokenName = api.registry.chainTokens[0];

      const isNativeToken = forceToCurrencyName(nativeTokenName) === forceToCurrencyName(token);

      return Storage.create<Balance>({
        api: api,
        query: isNativeToken ? api.query.balances.totalIssuance : api.query.tokens.totalIssuance,
        params: isNativeToken ? [] : [token.toChainData()]
      });
    }
  };
};

export class AcalaBalanceAdapter implements AcalaExpandBalanceAdapter {
  private storages: ReturnType<typeof createStorages>;
  private nativeCurrency: string;
  private erc20Adapter!: ERC20Adapter;
  private api: AnyApi;

  constructor({ api, evm }: AcalaAdapterConfigs) {
    this.api = api;
    this.storages = createStorages(this.api);
    this.nativeCurrency = api.registry.chainTokens[0];

    if (evm) {
      this.erc20Adapter = new ERC20Adapter(api, evm);
    }
  }

  private transformNative = (data: AccountInfo, token: Token) => {
    const free = FN.fromInner(data.data.free.toString(), token.decimals);
    const locked = FN.fromInner(data.data.miscFrozen.toString(), token.decimals).max(
      FN.fromInner(data.data.feeFrozen.toString(), token.decimals)
    );
    const reserved = FN.fromInner(data.data.reserved.toString(), token.decimals);
    const available = free.sub(locked).max(FN.ZERO);

    return { available, free, locked, reserved };
  };

  private transformNonNative = (data: OrmlAccountData, token: Token) => {
    const free = FN.fromInner(data.free.toString(), token.decimals);
    const locked = FN.fromInner(data.frozen.toString(), token.decimals);
    const reserved = FN.fromInner(data.reserved.toString(), token.decimals);
    const available = free.sub(locked).max(FN.ZERO);

    return { available, free, locked, reserved };
  };

  public subscribeBalance(token: Token, address: string): Observable<BalanceData> {
    const { nativeCurrency } = this;
    const isNativeToken = nativeCurrency === token.name;

    if (!token.isERC20 && utils.isAddress(address)) {
      throw new NotSupportETHAddress(address);
    }

    if (token.isERC20 && !this.erc20Adapter) {
      throw new NotSupportEVM();
    }

    if (token.isERC20) {
      return this.erc20Adapter.subscribeBalance(token, address);
    }

    if (isNativeToken) {
      const storage = this.storages.nativeBalance(address);

      return storage.observable.pipe(map((data) => this.transformNative(data, token)));
    }

    // nonNative token
    const storage = this.storages.nonNativeBalance(token, address);

    return storage.observable.pipe(map((data) => this.transformNonNative(data, token)));
  }

  public getED(token: Token): FixedPointNumber {
    return token.ed;
  }

  public subscribeIssuance(token: Token): Observable<FixedPointNumber> {
    if (token.isERC20 && !this.erc20Adapter) {
      throw new NotSupportEVM();
    }

    if (token.isERC20) {
      return this.erc20Adapter.subscribeIssuance(token);
    }

    const storage = this.storages.issuance(token);

    const handleIssuance = (data: Balance, token: Token) => FN.fromInner(data.toString(), token.decimals);

    return storage.observable.pipe(map((data) => handleIssuance(data, token)));
  }
}
