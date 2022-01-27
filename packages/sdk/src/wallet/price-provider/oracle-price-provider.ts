import { Observable, BehaviorSubject, Subscription, firstValueFrom, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { PriceProvider } from './types';
import { TimestampedValue } from '@open-web3/orml-types/interfaces';
import {
  AnyApi,
  createLiquidCrowdloanName,
  FixedPointNumber,
  FixedPointNumber as FN,
  forceToCurrencyName,
  isLiquidCrowdloanName,
  MaybeCurrency
} from '@acala-network/sdk-core';
import { OracleKey } from '@acala-network/types/interfaces';
import { Storage } from '../../utils/storage';
import {
  AcalaPrimitivesCurrencyCurrencyId,
  CumulusPrimitivesParachainInherentParachainInherentData
} from '@polkadot/types/lookup';
import { u128 } from '@polkadot/types-codec';
import { Extrinsic, SignedBlock } from '@polkadot/types/interfaces';

// current crowdloan token lease
const CROWDLOAN_TOKEN_LEASE: number[] = [13];

const LEASE_BLOCK_NUMBERS: Record<number, number> = {
  13: 10_787_650
};

export class OraclePriceProvider implements PriceProvider {
  private api: AnyApi;
  private oracleProvider: string;
  private subject: BehaviorSubject<Record<string, FN>>;
  private liquidCrowdloanSubject: BehaviorSubject<Record<string, FN>>;
  private processSubscriber: Subscription;
  private crowdloanPriceProcessSubscriber: Subscription;
  private leaseBlockNumbers: Record<number, number>;
  private consts: {
    stakingCurrency: AcalaPrimitivesCurrencyCurrencyId;
    liquidCurrency: AcalaPrimitivesCurrencyCurrencyId;
    rewardRatePerRelaychainBlock: number;
  };

  constructor(api: AnyApi, leaseBlockNumbers = LEASE_BLOCK_NUMBERS, oracleProvider = 'Aggregated') {
    this.api = api;
    this.oracleProvider = oracleProvider;
    this.subject = new BehaviorSubject({});
    this.liquidCrowdloanSubject = new BehaviorSubject({});
    this.leaseBlockNumbers = leaseBlockNumbers;

    this.consts = {
      stakingCurrency: api.consts.prices.getStakingCurrencyId,
      liquidCurrency: api.consts.prices.getLiquidCurrencyId,
      rewardRatePerRelaychainBlock: (api.consts?.prices?.rewardRatePerRelaychainBlock as any as u128)?.toNumber() || 0
    };

    this.processSubscriber = this.process();
    this.crowdloanPriceProcessSubscriber = this.liquidCrowdloanPriceProcess();
  }

  public unsub(): void {
    this.processSubscriber.unsubscribe();
    this.crowdloanPriceProcessSubscriber.unsubscribe();
  }

  /*
  The LiquidCrowdloan token price is calculated by DOT oracle price and current relaychain block number

  formula: oracle price * (1 / (1 + rewardRate) ** (lease block number - current relaychain block))
  */
  private getLiquidCrowdloanPrice(
    lease: number,
    currentRelayBlockNumber: number,
    stakingCurrencyPrice: FixedPointNumber
  ): FixedPointNumber {
    const { rewardRatePerRelaychainBlock } = this.consts;
    const leaseBlockNumber = this.leaseBlockNumbers[lease];
    const discount = FixedPointNumber.ONE.div(
      new FixedPointNumber(
        (1 + rewardRatePerRelaychainBlock / 10 ** 18) ** Math.max(leaseBlockNumber - currentRelayBlockNumber, 0)
      )
    );

    return stakingCurrencyPrice.mul(discount);
  }

  private liquidCrowdloanPriceProcess = () => {
    const storage$ = Storage.create<SignedBlock>({
      api: this.api,
      path: 'rpc.chain.getBlock',
      params: []
    }).observable;

    return combineLatest({
      signedBlock: storage$,
      stakingTokenPrice: this.subject.pipe(map((values) => values[forceToCurrencyName(this.consts.stakingCurrency)]))
    }).subscribe({
      next: ({ signedBlock, stakingTokenPrice }) => {
        if (!stakingTokenPrice) return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const extrinsic = signedBlock.block.extrinsics.find((item) => {
          return item.method.section === 'parachainSystem' && item.method.method === 'setValidationData';
        }) as Extrinsic | undefined;

        if (extrinsic) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const args = extrinsic.method.args[0] as any as CumulusPrimitivesParachainInherentParachainInherentData;
          const relayChainBlockNumber = args?.validationData?.relayParentNumber?.toNumber();

          const prices = CROWDLOAN_TOKEN_LEASE.map((lease) => {
            return [
              createLiquidCrowdloanName(lease),
              this.getLiquidCrowdloanPrice(lease, relayChainBlockNumber, stakingTokenPrice)
            ];
          });

          // update all crowdloan token price
          this.liquidCrowdloanSubject.next(Object.fromEntries([...prices]));
        }
      }
    });
  };

  private process = () => {
    const storage$ = Storage.create<[[OracleKey, TimestampedValue]]>({
      api: this.api,
      path: 'rpc.oracle.getAllValues',
      params: [this.oracleProvider],
      triggleEvents: [{ section: '*', method: 'NewFeedData' }]
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
      map(({ oracle, liquidCrowdloanPrices }) => {
        const name = forceToCurrencyName(currency);

        if (isLiquidCrowdloanName(name)) {
          return liquidCrowdloanPrices[name] || FixedPointNumber.ZERO;
        }

        return oracle[forceToCurrencyName(currency)] || FixedPointNumber.ZERO;
      }),
      filter((i) => !i.isZero())
    );
  }

  public async query(currency: MaybeCurrency): Promise<FN> {
    return firstValueFrom(this.subscribe(currency));
  }
}
