import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { PriceProvider } from './types';
import {
  AnyApi,
  createDexShareName,
  FixedPointNumber as FN,
  forceToCurrencyName,
  MaybeCurrency,
  Token
} from '@acala-network/sdk-core';
import { AcalaPrimitivesCurrencyCurrencyId } from '@polkadot/types/lookup';
import { Liquidity } from '@acala-network/sdk';

export class DexPriceProvider implements PriceProvider {
  private liquidity: Liquidity;
  private consts: {
    stableCoinCurrency: AcalaPrimitivesCurrencyCurrencyId;
  };

  constructor(api: AnyApi, liquidity: Liquidity) {
    this.liquidity = liquidity;

    this.consts = {
      stableCoinCurrency: api.consts.cdpEngine.getStableCurrencyId
    };
  }

  public subscribe(currency: MaybeCurrency): Observable<FN> {
    const name = forceToCurrencyName(currency);
    const stableCoinName = forceToCurrencyName(this.consts.stableCoinCurrency);
    const [token0, token1] = Token.sortTokenNames(name, stableCoinName);

    return this.liquidity.subscribePoolDetail(createDexShareName(token0, token1)).pipe(
      map((data) => {
        if (token0 === name) {
          return data.amounts[1].div(data.amounts[0]);
        }

        return data.amounts[0].div(data.amounts[1]);
      })
    );
  }

  public async query(currency: MaybeCurrency): Promise<FN> {
    return firstValueFrom(this.subscribe(currency));
  }
}
