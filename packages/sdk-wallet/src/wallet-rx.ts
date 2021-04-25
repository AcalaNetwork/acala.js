import { ApiRx } from '@polkadot/api';
import { WalletBase } from './wallet-base';
import { switchMap, shareReplay } from '@polkadot/x-rxjs/operators';
import { Observable, of, BehaviorSubject } from '@polkadot/x-rxjs';
import { ChainProperties } from '@polkadot/types/interfaces';
import { DexShare, Token } from '@acala-network/sdk-core';
import { CurrencyId } from '@acala-network/types/interfaces';
import { focusToToken } from '@acala-network/sdk-core/converter';

export class WalletRx extends WalletBase<ApiRx> {
  private tokenDecimals: Map<string, number>;
  private currencyIds: Map<string, CurrencyId>;
  private isReady: BehaviorSubject<boolean>;

  constructor(api: ApiRx) {
    super(api);

    this.tokenDecimals = new Map<string, number>([]);
    this.currencyIds = new Map<string, CurrencyId>([]);
    this.isReady = new BehaviorSubject<boolean>(false);
  }

  init(): Observable<boolean> {
    return this.api.rpc.system.properties<ChainProperties>().pipe(
      switchMap((properties) => {
        const tokenDecimals = properties.tokenDecimals.unwrapOrDefault();
        const tokenSymbol = properties.tokenSymbol.unwrapOrDefault();

        const defaultTokenDecimal = tokenDecimals[0].toNumber();

        this.tokenDecimals = new Map(
          tokenSymbol.map((item, index) => [item.toHex(), tokenDecimals[index].toNumber() || defaultTokenDecimal])
        );
        this.currencyIds = new Map(tokenSymbol.map((item) => [item.toHex(), focusToToken(this.api, item.toString())]));

        this.isReady.next(true);

        return of(true);
      }),
      shareReplay(1)
    );
  }

  public getAllTokens(): Token[] {
    return Array.from(this.tokenDecimals.keys()).map((item) => {
      return new Token({
        name: item,
        decimal: this.tokenDecimals.get(item)
      });
    });
  }

  public getToken(currency: string | Token | CurrencyId | [string, string] | DexShare): Token {
    const currency = 
  }
}
