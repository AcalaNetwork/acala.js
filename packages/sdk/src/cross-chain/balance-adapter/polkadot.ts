import { AnyApi, FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { map } from 'rxjs/operators';
import { BalanceData } from '../../wallet/type';
import { BalanceAdapter } from '../../wallet/balance-adapter/types';
import { Observable } from 'rxjs';
import { Storage } from '../../utils/storage';
import { DeriveBalancesAll } from '@polkadot/api-derive/balances/types';
import { CurrencyNotFound } from '../../wallet/errors';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createBalanceStorages = (api: AnyApi) => {
  return {
    balances: (address: string) =>
      Storage.create<DeriveBalancesAll>({
        api: api,
        path: 'derive.balances.all',
        params: [address]
      })
  };
};

interface PolkadotBalanceAdapterConfigs {
  api: AnyApi;
}

export class PolkadotBalanceAdapter implements BalanceAdapter {
  private storages: ReturnType<typeof createBalanceStorages>;
  readonly decimals: number;
  readonly ed: FN;
  readonly nativeToken: string;

  constructor({ api }: PolkadotBalanceAdapterConfigs) {
    this.storages = createBalanceStorages(api);
    this.decimals = api.registry.chainDecimals[0];
    this.ed = FN.fromInner(api.consts.balances.existentialDeposit.toString(), this.decimals);
    this.nativeToken = api.registry.chainTokens[0];
  }

  public subscribeBalance(token: string, address: string): Observable<BalanceData> {
    const storage = this.storages.balances(address);

    if (token !== this.nativeToken) throw new CurrencyNotFound(token);

    return storage.observable.pipe(
      map((data) => ({
        free: FN.fromInner(data.freeBalance.toString(), this.decimals),
        locked: FN.fromInner(data.lockedBalance.toString(), this.decimals),
        reserved: FN.fromInner(data.reservedBalance.toString(), this.decimals),
        available: FN.fromInner(data.availableBalance.toString(), this.decimals)
      }))
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getED(_token?: string | Token): FN {
    return this.ed;
  }
}
