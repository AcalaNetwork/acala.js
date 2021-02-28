import { ApiPromise, ApiRx } from '@polkadot/api';
import { CurrencyId } from '@acala-network/types/interfaces';
import { assert } from '@polkadot/util';
import primitivesConfig from '@acala-network/type-definitions/primitives';

import { FixedPointNumber } from './fixed-point-number';
import { CHAIN } from './type';

export interface TokenConfig {
  chain?: CHAIN; // which chain the token is in
  name: string; // The name of the token
  symbol?: string; // short name of the token
  precision?: number; // the precision of the token
  amount?: number | string | FixedPointNumber; // the amount of the token
}

export const TokenAmount = FixedPointNumber;

export class Token {
  readonly chain!: CHAIN;
  // keep all properties about token readonly
  readonly name!: string;
  readonly symbol!: string;
  readonly precision!: number;
  public amount!: FixedPointNumber;

  static fromCurrencyId(currency: CurrencyId): Token {
    assert(currency.isToken, 'Token.fromCurrencyId should receive the currency of token');

    return new Token({
      name: currency.asToken.toString(),
      symbol: currency.asToken.toString(),
      precision: 18,
      amount: FixedPointNumber.ZERO
    });
  }

  constructor(config: TokenConfig) {
    this.name = config.name;
    this.symbol = config.symbol || config.name;
    this.precision = config.precision || 18;
    this.chain = config.chain || 'acala';

    if (config.amount) {
      if (config.amount instanceof FixedPointNumber) {
        this.amount = config.amount;
      } else {
        this.amount = new TokenAmount(config.amount || 0, this.precision);
      }
    }
  }

  /**
   * @name isEqual
   * @description check if `token` equal current
   */
  public isEqual(token: Token): boolean {
    return this.chain === token.chain && this.name === token.name;
  }

  public toString(): string {
    return this.name;
  }

  public toChainData(): { Token: string } | string {
    if (this.chain === 'acala') {
      return { Token: this.name };
    }

    return this.name;
  }

  public toCurrencyId(api: ApiRx | ApiPromise): CurrencyId {
    return api.createType('CurrencyId', this.toChainData());
  }

  public clone(newConfig?: Partial<TokenConfig>): Token {
    return new Token({
      name: newConfig?.name || this.name || '',
      chain: newConfig?.chain || this.chain || '',
      precision: newConfig?.precision || this.precision || 0,
      amount: newConfig?.amount || this.amount || new FixedPointNumber(0),
      symbol: newConfig?.symbol || this.symbol || ''
    });
  }
}

const TOKEN_SORT: Record<string, number> = primitivesConfig.types.TokenSymbol._enum;

export function sortTokens(token1: Token, token2: Token, ...other: Token[]): Token[] {
  const result = [token1, token2, ...other];

  return result.sort((a, b) => TOKEN_SORT[a.name] - TOKEN_SORT[b.name]);
}
