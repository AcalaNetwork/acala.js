import { Token } from '@acala-network/sdk-core/token';
import { AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesTradingPair } from '@polkadot/types/lookup';
import { AnyApi } from './types';
export declare class TokenPair {
    private token1;
    private token2;
    private origin;
    static fromCurrencyId(currency: AcalaPrimitivesCurrencyCurrencyId): TokenPair;
    static fromCurrencies(currency1: AcalaPrimitivesCurrencyCurrencyId, currency2: AcalaPrimitivesCurrencyCurrencyId): TokenPair;
    static fromTrandingPair(tradingPair: AcalaPrimitivesTradingPair): TokenPair;
    constructor(token1: Token, token2: Token);
    getOrigin(): [Token, Token];
    getPair(): [Token, Token];
    isEqual(pair: TokenPair, compare?: (token1: Token, token2: Token) => boolean): boolean;
    toChainData(): [{
        Token: string;
    }, {
        Token: string;
    }];
    toTradingPair(api: AnyApi): AcalaPrimitivesTradingPair;
}
