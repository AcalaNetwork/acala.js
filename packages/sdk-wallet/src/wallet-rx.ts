import { ApiRx } from '@polkadot/api';
import { WalletBase } from './wallet-base';
import { switchMap, shareReplay, map, takeWhile } from '@polkadot/x-rxjs/operators';
import { assert, memoize } from '@polkadot/util';
import { Observable, of, BehaviorSubject, combineLatest } from '@polkadot/x-rxjs';
import { Balance, ChainProperties } from '@polkadot/types/interfaces';
import { FixedPointNumber, Token, TokenBalance } from '@acala-network/sdk-core';
import { CurrencyId, TokenSymbol } from '@acala-network/types/interfaces';
import { focusToCurrencyId, focusToTokenSymbolCurrencyId } from '@acala-network/sdk-core/converter';
import { MaybeAccount, MaybeCurrency } from '@acala-network/sdk-core/types';

export class WalletRx extends WalletBase<ApiRx> {
  private decimalMap: Map<string, number>;
  private currencyIdMap: Map<string, CurrencyId>;
  private tokenMap: Map<string, Token>;
  private isReady$: BehaviorSubject<boolean>;

  constructor(api: ApiRx) {
    super(api);

    this.decimalMap = new Map<string, number>([]);
    this.currencyIdMap = new Map<string, CurrencyId>([]);
    this.tokenMap = new Map<string, Token>([]);
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.init().subscribe();
  }

  public get isReady(): Observable<boolean> {
    return this.isReady$;
  }

  public init(): Observable<boolean> {
    return this._init();
  }

  public getAllTokens(): Token[] {
    return Array.from(this.tokenMap.values());
  }

  public getToken(currency: MaybeCurrency): Token | undefined {
    const currencyId = focusToCurrencyId(this.api, currency);

    if (currencyId.isDexShare) {
      const decimal1 = this.decimalMap.get(currencyId.asDexShare[0].toString()) || 18;
      const decimal2 = this.decimalMap.get(currencyId.asDexShare[1].toString()) || 18;

      return Token.fromCurrencyId(currencyId, [decimal1, decimal2]);
    }
    if (currencyId.isErc20) {
      return Token.fromCurrencyId(currencyId);
    }

    const key = currencyId.asToken.toHex();

    return this.tokenMap.get(key);
  }

  public queryBalance(account: MaybeAccount, currency: MaybeCurrency): Observable<TokenBalance> {
    return this._queryBalance(account, currency);
  }

  private checkIfKarura(name: string) {
    return /karura/i.test(name);
  }

  private getTokenListByChain(isKarura: boolean) {
    const karuraCurrencyIndex = 100;
    const tokenSymbolType = this.api.registry.createType('TokenSymbol' as any) as TokenSymbol;

    return tokenSymbolType.defKeys.filter((_value, index) => {
      const indexes = tokenSymbolType.defIndexes;

      if (isKarura) {
        return indexes[index] >= karuraCurrencyIndex;
      }

      return indexes[index] < karuraCurrencyIndex;
    });
  }

  private _init = memoize(
    (): Observable<boolean> => {
      return combineLatest([this.api.rpc.system.chain(), this.api.rpc.system.properties<ChainProperties>()]).pipe(
        switchMap(([chainName, properties]) => {
          const isKarura = this.checkIfKarura(chainName.toString());
          const tokenDecimals = properties.tokenDecimals.unwrapOrDefault();
          const tokenSymbol = properties.tokenSymbol.unwrapOrDefault();
          const tokenList = this.getTokenListByChain(isKarura);

          const defaultTokenDecimal = tokenDecimals?.[0].toNumber() || 18;

          try {
            tokenSymbol.forEach((item, index) => {
              const key = item.toString();
              const currencyId = focusToTokenSymbolCurrencyId(this.api, key);
              const decimal = tokenDecimals?.[index].toNumber() || defaultTokenDecimal;

              if (tokenList.find((i) => i === key)) {
                this.decimalMap.set(key, tokenDecimals?.[index].toNumber() || defaultTokenDecimal);
                this.currencyIdMap.set(key, currencyId);
                this.tokenMap.set(key, Token.fromCurrencyId(currencyId, decimal));
              }
            });

            this.isReady$.next(true);
          } catch (e) {
            throw new Error('init wallet sdk failed');
          }

          return of(true);
        }),
        shareReplay(1)
      );
    }
  );

  private _queryBalance = memoize(
    (account: MaybeAccount, currency: MaybeCurrency): Observable<TokenBalance> => {
      const currencyId = focusToCurrencyId(this.api, currency);

      return this.isReady.pipe(
        takeWhile((isReady) => isReady),
        switchMap(() => {
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
          return ((this.api.derive as any).currencies.balance(account, currencyId) as Observable<Balance>).pipe(
            map((balance) => {
              let token: Token | undefined;

              if (currencyId?.isDexShare) {
                const key1 = currencyId.asDexShare[0].toString();
                const key2 = currencyId.asDexShare[1].toString();

                token = Token.fromCurrencyId(currencyId, [
                  this.decimalMap.get(key1) || 18,
                  this.decimalMap.get(key2) || 18
                ]);
              } else if (currencyId?.isToken) {
                const key = currencyId.asToken.toString();

                token = Token.fromCurrencyId(currencyId, this.decimalMap.get(key));
              } else if (currencyId?.isErc20) {
                console.warn(`doesn't support query ERC20 balance`);

                token = new Token(currencyId.asErc20.toString(), {
                  isERC20: true,
                  isDexShare: false,
                  isTokenSymbol: false,
                  decimal: 18
                });
              }

              const _balance = FixedPointNumber.fromInner(balance.toString(), token?.decimal);

              assert(token && _balance, `token or balance create failed in query balance`);

              return new TokenBalance(token, _balance);
            }),
            shareReplay(1)
          );
        })
      );
    }
  );
}
