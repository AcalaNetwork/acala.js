import { Observable, firstValueFrom, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PriceProvider } from './types.js';
import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';

interface AggregatedProviderConfigs {
  market?: PriceProvider;
  dex: PriceProvider;
}

export class AggregateProvider implements PriceProvider {
  private marketPriceProvider: PriceProvider | undefined;
  private dexPriceProvider: PriceProvider;

  constructor({ market, dex }: AggregatedProviderConfigs) {
    this.marketPriceProvider = market;
    this.dexPriceProvider = dex;
  }

  public subscribe(token: Token): Observable<FN> {
    // query market price first, try to query price from dex when the market price is zero
    const marketPriceProvider = this.marketPriceProvider;
    const dexPriceProvider = this.dexPriceProvider;

    if (!marketPriceProvider) {
      return dexPriceProvider.subscribe(token);
    }

    const marketPrice$ = marketPriceProvider.subscribe(token);

    return marketPrice$.pipe(
      switchMap((result) => {
        if (result.isZero()) {
          return dexPriceProvider.subscribe(token);
        }

        return of(result);
      })
    );
  }

  public async query(currency: Token): Promise<FN> {
    return firstValueFrom(this.subscribe(currency));
  }
}
