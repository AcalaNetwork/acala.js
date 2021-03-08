import { ApiPromise, ApiRx } from '@polkadot/api';
import { CurrencyId } from '@acala-network/types/interfaces';
import { assert } from '@polkadot/util';
import primitivesConfig from '@acala-network/type-definitions/primitives';

import { tokenConfig } from './token-config';
import { CHAIN } from './type';

export interface TokenParams {
  chain?: CHAIN; // which chain the token is in
  name: string; // The name of the token
  symbol?: string; // short name of the token
  decimal?: number; // the decimal of the token
}

export class Token {
  // keep all properties about token readonly
  readonly chain!: CHAIN;
  readonly name!: string;
  readonly symbol!: string;
  readonly decimal!: number;

  static fromCurrencyId(currency: CurrencyId): Token {
    assert(currency.isToken, 'Token.fromCurrencyId should receive the currency of token');

    const symbol = currency.asToken.toString();

    return new Token({
      chain: tokenConfig.getChain(symbol),
      name: tokenConfig.getName(symbol),
      symbol,
      decimal: tokenConfig.getDecimal(symbol)
    });
  }

  constructor(config: TokenParams) {
    this.name = config.name;
    this.symbol = config.symbol || config.name;
    this.decimal = config.decimal || 18;
    this.chain = config.chain || 'acala';
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

  public clone(newConfig?: Partial<TokenParams>): Token {
    return new Token({
      name: newConfig?.name || this.name || '',
      chain: newConfig?.chain || this.chain || '',
      decimal: newConfig?.decimal || this.decimal || 18,
      symbol: newConfig?.symbol || this.symbol || ''
    });
  }
}

const TOKEN_SORT: Record<string, number> = primitivesConfig.types.TokenSymbol._enum;

export function sortTokens(token1: Token, token2: Token, ...other: Token[]): Token[] {
  const result = [token1, token2, ...other];

  return result.sort((a, b) => TOKEN_SORT[a.name] - TOKEN_SORT[b.name]);
}
