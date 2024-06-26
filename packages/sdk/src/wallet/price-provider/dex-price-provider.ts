import { Observable, firstValueFrom } from 'rxjs';
import { PriceProvider } from './types.js';
import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { Liquidity } from '../../liquidity/index.js';

export class DexPriceProvider implements PriceProvider {
  private liquidity: Liquidity;

  constructor(liquidity: Liquidity) {
    this.liquidity = liquidity;
  }

  public subscribe(currency: Token): Observable<FN> {
    return this.liquidity.subscribeDexPrice(currency);
  }

  public async query(currency: Token): Promise<FN> {
    return firstValueFrom(this.subscribe(currency));
  }
}
