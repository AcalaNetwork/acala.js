import { ApiPromise, ApiRx } from '@polkadot/api';
import { CurrencyId } from '@acala-network/types/interfaces';
import { assert, warn } from './utils';
import { TokenPair } from './token-pair';

export type CHAIN = 'mandala' | 'acala' | 'karura' | 'polkadot' | 'kusama';

// decorator for check chain
function checkChain(chains: CHAIN[]) {
  return (target: BasicToken, key: string, descriptor: any) => {
    if (!chains.includes(target.chain.toLowerCase() as CHAIN)) {
      throw new Error(`acala-sdk: the ${key} method can only be called with ${chains} chain`);
    }

    return descriptor; 
  }
}

export type TokenType = 'token_symbol' | 'dex_share' | 'ERC20';

export const ACALA_CHAINS: CHAIN[] = ['acala', 'mandala', 'karura'];

export const TokenStringMap = new Map<string, string>([
  ['KAR', 'KAR'],
  ['ACA', 'ACA'],
  ['AUSD', 'aUSD'],
  ['DOT', 'DOT'],
  ['LDOT', 'LDOT'],
  ['XBTC', 'XBTC'],
  ['RENBTC', 'renBTC']
])

export abstract class BasicToken {
  constructor (
    readonly identifier: string, // token identifier should be unique for comparing
    readonly chain: CHAIN, // which chain the token is in
    readonly type: TokenType, // the attribute is only effective in acala/karura chain. otherwise, the attribute is 'token_symbol' always.
    readonly precision: number
  ) {}

  public get isTokenSymbol (): boolean {
    return this.type === 'token_symbol';
  }

  public get isDexShare (): boolean {
    return this.type === 'dex_share';
  }

  public get isERC20 (): boolean {
    return this.type === 'ERC20';
  }

  public get isAcalaChain (): boolean {
    return this.chain === 'acala'
      || this.chain === 'karura'
      || this.chain === 'mandala';
  } 

  public abstract toString (): string;

  public abstract toChainData (): object |  string;

  public isEqual (token: BasicToken) {
    return this.identifier === token.identifier
      && this.chain === token.chain;
  }
}

export class TokenSymbol extends BasicToken {
  readonly symbol: string;

  constructor (symbol: string, chain: CHAIN = 'acala', precision = 18) {
    super(
      `token_symbol_${symbol}`,
      chain,
      'token_symbol',
      precision
    );
    
    assert(!!symbol, 'token symbol should not empty');

    this.symbol = symbol;
  }

  static fromCurrencyId (currency: CurrencyId, chain: CHAIN, precision = 18) {
    if (!currency.isToken) throw new Error(`acala sdk: can't convert the CurrencyId which is not Token to TokenSymbol object`);

    return new TokenSymbol(
      currency.asToken.toString(),
      chain,
      precision
    );
  }

  @checkChain(ACALA_CHAINS)
  public toCurrencyId (api: ApiPromise | ApiRx): CurrencyId {
    return api.createType('CurrencyId', this.toChainData());
  }

  public toString () {
    if (TokenStringMap.has(this.symbol)) {
      // ensure that the result type is always string
      return TokenStringMap.get(this.symbol) as string;
    }

    return this.symbol;
  }

  public toChainData (): { Token: string } | string {
    if (this.isAcalaChain) {
      return { Token: this.symbol };
    }

    return this.symbol;
  }
}

export class DexShare extends BasicToken {
  readonly token1: TokenSymbol;
  readonly token2: TokenSymbol;

  constructor (token1: string, token2: string, chain: CHAIN = 'acala', precision = 18) {
    super(
      `_dex_share_${token1}_${token2}`,
      chain,
      'dex_share',
      precision
    );

    this.token1 = new TokenSymbol(token1, chain, precision);
    this.token2 = new TokenSymbol(token2, chain, precision);
  }

  public static fromCurrencyId (currency: CurrencyId, chain: CHAIN, precision = 18): DexShare {
    if (!ACALA_CHAINS.includes(chain)) {
      throw new Error(`acala-sdk: the fromCurrencyId method can only be called with ${ACALA_CHAINS} chain`);
    }

    return new DexShare(
      currency.asDexShare[0].toString(),
      currency.asDexShare[1].toString(),
      chain,
      precision
    );
  }

  @checkChain(ACALA_CHAINS)
  public toCurrencyId (api: ApiPromise | ApiRx) {
    return api.createType('CurrencyId', this.toChainData());
  }

  @checkChain(ACALA_CHAINS)
  public toString (): string {
    return `${this.token1.toString()} ${this.token2.toString()}`;
  }

  @checkChain(ACALA_CHAINS)
  public toChainData (): { DEXShare: { Token: string}[] } {
    return {
      DEXShare: [this.token1.toChainData() as { Token: string }, this.token2.toChainData() as { Token: string }]
    };
  }

  @checkChain(ACALA_CHAINS)
  public toTokenPare(): TokenPair {
    return new TokenPair(this.token1, this.token2);
  }
}

export class Token {
  inner: BasicToken;

  constructor (inner: BasicToken, warning: boolean = true) {
    this.inner = inner;

    Object.defineProperties(this, Object.getOwnPropertyDescriptors(this.inner));

    if (warning) {
      warn('directly called the constructor of Token is not recommendly');
    }
  }

  public static fromBasicToken<T extends BasicToken> (token: T): T {
    return new Token(token, false) as any as T;
  }

  public static fromCurrencyId (currency: CurrencyId, chain: CHAIN, precision = 18): Token | null {
    if (currency.isToken) {
      return new Token (TokenSymbol.fromCurrencyId(currency, chain, precision), false);
    }

    if (currency.isDexShare) {
      return new Token(DexShare.fromCurrencyId(currency, chain, precision), false);
    }

    return null;
  }
}
