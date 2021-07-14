import { CurrencyId } from '@acala-network/types/interfaces';
import { Token } from './token';
import { AnyApi, MaybeCurrency } from './types';

export class ConvertToCurrencyIdFailed extends Error {
  constructor() {
    super();

    this.name = 'convertToCurrencyIdFailed';
    this.message = 'convert to currency id failed';
  }
}

export class ConvertToCurrencyIdNameFailed extends Error {
  constructor() {
    super();

    this.name = 'convertToNameIdFailed';
    this.message = 'convert to name failed';
  }
}

export const forceToTokenSymbolCurrencyId = (api: AnyApi, target: string | Token | CurrencyId): CurrencyId => {
  try {
    if (typeof target === 'string') return api.createType('CurrencyId', { token: target as string });

    if (target instanceof Token) return target.toCurrencyId(api);

    if (target?.isToken || target?.isDexShare || target?.isErc20) return target as CurrencyId;

    throw new ConvertToCurrencyIdFailed();
  } catch (e) {
    throw new ConvertToCurrencyIdFailed();
  }
};

export const forceToDexShareCurrencyId = (api: AnyApi, target: [string, string] | CurrencyId): CurrencyId => {
  try {
    if (Array.isArray(target))
      return api.createType('CurrencyId', { dexShare: target.map((item) => ({ token: item })) });

    if (target?.isToken || target?.isDexShare || target?.isErc20) return target as CurrencyId;

    throw new ConvertToCurrencyIdFailed();
  } catch (e) {
    throw new ConvertToCurrencyIdFailed();
  }
};

export const forceToCurrencyId = (api: AnyApi, currency: MaybeCurrency): CurrencyId => {
  let currencyId: CurrencyId | undefined;

  if (typeof currency === 'string') {
    // first handle string type
    if (isDexShare(currency)) {
      currencyId = forceToDexShareCurrencyId(api, getLPCurrenciesFormName(currency));
    } else {
      currencyId = forceToTokenSymbolCurrencyId(api, currency as string);
    }
  } else if (Array.isArray(currency)) {
    // handle [string, string]
    currencyId = forceToDexShareCurrencyId(api, currency as [string, string]);
  } else if (currency instanceof Token) {
    // handle token
    currencyId = currency.toCurrencyId(api);
  } else {
    // handle CurrencyId
    currencyId = currency as CurrencyId;
  }

  // if currencyId is undefined after process, throw error
  if (!currencyId) throw new ConvertToCurrencyIdFailed();

  return currencyId as CurrencyId;
};

export const forceToCurrencyIdName = (target: MaybeCurrency): string => {
  if (typeof target === 'string') return target;

  if (Array.isArray(target)) return createLPCurrencyName(target[0], target[1]);

  if (target instanceof Token) return target.toString();

  try {
    if ((target as CurrencyId).isToken) return target.asToken.toString();

    if ((target as CurrencyId).isDexShare) {
      return createLPCurrencyName(
        forceToCurrencyIdName(target.asDexShare[0] as CurrencyId),
        forceToCurrencyIdName(target.asDexShare[1] as CurrencyId)
      );
    }

    if ((target as CurrencyId).isErc20) return target.asErc20.toString();
  } catch (e) {
    throw new ConvertToCurrencyIdNameFailed();
  }

  return '';
};

export function createLPCurrencyName(name1: string, name2: string): string {
  return `lp://${name1}/${name2}`;
}

export function getLPCurrenciesFormName(name: string): [string, string] {
  return name.replace('lp://', '').split('/') as [string, string];
}

export function isDexShare(currency: MaybeCurrency): boolean {
  const name = forceToCurrencyIdName(currency);

  return name.startsWith('lp://');
}
