import { Observable, ReplaySubject, Subscription, firstValueFrom, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { PriceProvider } from './types';
import { TimestampedValue } from '@open-web3/orml-types/interfaces';
import {
  AnyApi,
  FixedPointNumber,
  FixedPointNumber as FN,
  forceToCurrencyName,
  isLiquidCrowdloanName,
  MaybeCurrency
} from '@acala-network/sdk-core';
import { OracleKey } from '@acala-network/types/interfaces';
import { Storage } from '../../utils/storage';
import { AcalaPrimitivesCurrencyCurrencyId } from '@acala-network/types/interfaces/types-lookup';
import { SignedBlock } from '@polkadot/types/interfaces';
import { getAllLiquidCrowdloanTokenPrice } from '../utils/get-liquid-crowdloan-token-price';

export class OraclePriceProvider implements PriceProvider {
  private api: AnyApi;
  private oracleProvider: string;
  private subject: ReplaySubject<Record<string, FN>>;
  private liquidCrowdloanSubject: ReplaySubject<Record<string, FN>>;
  private processSubscriber: Subscription;
  private crowdloanPriceProcessSubscriber: Subscription;
  private consts: {
    stakingCurrency: AcalaPrimitivesCurrencyCurrencyId;
    liquidCurrency: AcalaPrimitivesCurrencyCurrencyId;
  };

  constructor(api: AnyApi, oracleProvider = 'Aggregated') {
    this.api = api;
    this.oracleProvider = oracleProvider;
    this.subject = new ReplaySubject<Record<string, FN>>(1);
    this.liquidCrowdloanSubject = new ReplaySubject(1);

    this.consts = {
      stakingCurrency: api.consts.prices.getStakingCurrencyId,
      liquidCurrency: api.consts.prices.getLiquidCurrencyId
    };

    this.processSubscriber = this.process();
    this.crowdloanPriceProcessSubscriber = this.liquidCrowdloanPriceProcess();
  }

  public unsub(): void {
    this.processSubscriber.unsubscribe();
    this.crowdloanPriceProcessSubscriber.unsubscribe();
  }

  private oraclePrice$(name: string) {
    return this.subject.pipe(
      filter((values) => !!values),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map((values) => values![name])
    );
  }

  private liquidCrowdloanPriceProcess = () => {
    const storage$ = Storage.create<SignedBlock>({
      api: this.api,
      path: 'rpc.chain.getBlock',
      params: []
    }).observable;

    return combineLatest({
      signedBlock: storage$,
      stakingTokenPrice: this.oraclePrice$(forceToCurrencyName(this.consts.stakingCurrency))
    }).subscribe({
      next: ({ signedBlock, stakingTokenPrice }) => {
        if (!stakingTokenPrice) return;

        const prices = getAllLiquidCrowdloanTokenPrice(this.api, signedBlock, stakingTokenPrice);

        if (prices) {
          // update all crowdloan token price
          this.liquidCrowdloanSubject.next(prices);
        }
      }
    });
  };

  private process = () => {
    const storage$ = Storage.create<[[OracleKey, TimestampedValue]]>({
      api: this.api,
      path: 'rpc.oracle.getAllValues',
      params: [this.oracleProvider],
      events: [{ section: '*', method: 'NewFeedData' }]
    }).observable;

    return storage$.subscribe({
      next: (result) => {
        const formated = Object.fromEntries(
          result.map((item) => {
            const currency = forceToCurrencyName(item[0]);
            const price = FN.fromInner(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              (item[1]?.value as any)?.value.toString() || '0'
            );

            return [currency, price];
          })
        );
        this.subject.next(formated);
      }
    });
  };

  public subscribe(currency: MaybeCurrency): Observable<FN> {
    return combineLatest({
      oracle: this.subject,
      liquidCrowdloanPrices: this.liquidCrowdloanSubject
    }).pipe(
      filter(({ oracle }) => oracle !== undefined),
      map(({ oracle, liquidCrowdloanPrices }) => {
        const name = forceToCurrencyName(currency);

        if (isLiquidCrowdloanName(name)) {
          return liquidCrowdloanPrices[name] || FixedPointNumber.ZERO;
        }

        // TODO: should check the token symbol
        if (name === 'sa://0') {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return oracle!.KSM || FixedPointNumber.ZERO;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return oracle![forceToCurrencyName(currency)] || FixedPointNumber.ZERO;
      })
    );
  }

  public async query(currency: MaybeCurrency): Promise<FN> {
    return firstValueFrom(this.subscribe(currency));
  }
}
