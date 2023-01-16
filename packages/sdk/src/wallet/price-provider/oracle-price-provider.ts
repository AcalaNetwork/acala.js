import { Observable, firstValueFrom, of } from 'rxjs';
import { Option } from '@polkadot/types-codec';
import { map, switchMap } from 'rxjs/operators';
import { OracleConfig, PriceProvider } from './types';
import { AnyApi, FixedPointNumber, FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { Storage } from '../../utils/storage';
import { OrmlOracleModuleTimestampedValue } from '@polkadot/types/lookup';
import { subscribeLiquidCrowdloanTokenPrice } from '../utils/get-liquid-crowdloan-token-price';
import { TokenProvider } from '../token-provider/type';

const DEFAULT_ORACLE_STRATEGIES: OracleConfig['strategies'] = {
  taiKSM: ['AS', 'KSM'],
  tDOT: ['AS', 'DOT'],
  lcDOT: ['LIQUID_CROWDLOAN', 13]
};

export class OraclePriceProvider implements PriceProvider {
  private api: AnyApi;
  private stakingToken: Token;
  private strategies: OracleConfig['strategies'];
  private tokenProvider: TokenProvider;

  constructor(api: AnyApi, config: OracleConfig) {
    this.api = api;

    this.stakingToken = config.stakingToken;
    this.tokenProvider = config.tokenPrivoder;
    this.strategies = config?.strategies || DEFAULT_ORACLE_STRATEGIES;
  }

  private queryFormOracle(token: Token) {
    const storage$ = Storage.create<Option<OrmlOracleModuleTimestampedValue>>({
      api: this.api,
      path: 'query.acalaOracle.values',
      params: [token.toChainData()]
    }).observable;

    return storage$.pipe(
      map((value) => {
        const price = value.isEmpty ? '0' : value.value.value.toString();

        return FixedPointNumber.fromInner(price, 18);
      })
    );
  }

  public subscribe(token: Token): Observable<FN> {
    const strategies = this.strategies;

    if (!strategies) return of(FixedPointNumber.ZERO);

    const symbol = token.symbol;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [strategy, addon] = strategies[symbol] || ['STORAGE', ''];

    if (strategy === 'AS') {
      return this.subscribe(this.tokenProvider.getToken(addon as string));
    }

    if (strategy === 'LIQUID_CROWDLOAN') {
      return this.subscribe(this.stakingToken).pipe(
        switchMap((price) => {
          return subscribeLiquidCrowdloanTokenPrice(this.api, price, addon as number);
        })
      );
    }

    return this.queryFormOracle(token);
  }

  public async query(currency: Token): Promise<FN> {
    return firstValueFrom(this.subscribe(currency));
  }
}
