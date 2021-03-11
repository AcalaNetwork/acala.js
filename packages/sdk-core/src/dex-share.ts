import { ApiPromise, ApiRx } from '@polkadot/api';
import { CurrencyId } from '@acala-network/types/interfaces';
import { assert } from '@polkadot/util';

import { Token } from './token';
import { TokenPair } from './token-pair';
import { BaseToken } from './base-token';

export class DexShare extends BaseToken {
  readonly token1!: Token;
  readonly token2!: Token;

  static fromCurrencyId(currency: CurrencyId): DexShare {
    assert(currency.isDexShare, 'DexShare.fromCurrencyId should receive the currency of dex share');

    const [currency1, currency2] = currency.asDexShare;
    const token1 = Token.fromTokenSymbol(currency1);
    const token2 = Token.fromTokenSymbol(currency2);

    return new DexShare(token1, token2);
  }

  static fromTokenPair(pair: TokenPair): DexShare {
    const [token1, token2] = pair.getPair();

    return new DexShare(token1.clone(), token2.clone());
  }

  constructor(token1: Token, token2: Token) {
    super(Math.max(token1.decimal, token2.decimal));

    this.token1 = token1;
    this.token2 = token2;
  }

  /**
   * @name isEqual
   * @description check if `token` equal current
   */
  public isEqual(target: DexShare): boolean {
    return this.token1.isEqual(target.token1) && this.token2.isEqual(target.token2);
  }

  public toString(): string {
    return `${this.token1.toString()}-${this.token2.toString()}`;
  }

  public toChainData(): { DexShare: [string, string] } {
    return { DexShare: [this.token1.symbol, this.token2.symbol] };
  }

  public toCurrencyId(api: ApiRx | ApiPromise): CurrencyId {
    return api.createType('CurrencyId', this.toChainData());
  }

  public clone(): DexShare {
    return new DexShare(this.token1.clone(), this.token2.clone());
  }
}
