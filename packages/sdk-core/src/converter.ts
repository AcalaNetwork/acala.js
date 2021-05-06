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

export class ConvertToNameFailed extends Error {
  constructor() {
    super();

    this.name = 'convertToNameIdFailed';
    this.message = 'convert to name failed';
  }
}

export const focusToTokenSymbolCurrencyId = (api: AnyApi, target: string | Token | CurrencyId): CurrencyId => {
  try {
    if (typeof target === 'string') return api.createType('CurrencyId', { token: target as string });

    if (target instanceof Token) return target.toCurrencyId(api);

    if (Reflect.has(target, 'asToken')) return target as CurrencyId;

    throw new ConvertToCurrencyIdFailed();
  } catch (e) {
    throw new ConvertToCurrencyIdFailed();
  }
};

export const focusToDexShareCurrencyId = (api: AnyApi, target: [string, string] | CurrencyId): CurrencyId => {
  try {
    if (Array.isArray(target)) return api.createType('CurrencyId', { dexShare: target });

    if (Reflect.has(target, 'asToken')) return target as CurrencyId;

    throw new ConvertToCurrencyIdFailed();
  } catch (e) {
    throw new ConvertToCurrencyIdFailed();
  }
};

export const focusToCurrencyId = (api: AnyApi, currency: MaybeCurrency): CurrencyId => {
  let currencyId: CurrencyId | undefined;

  if (typeof currency === 'string') {
    // first handle string type
    currencyId = /-/.test(currency)
      ? focusToDexShareCurrencyId(api, currency.split('-') as [string, string])
      : focusToTokenSymbolCurrencyId(api, currency as string);
  } else if (Array.isArray(currency)) {
    // handle [string, string]
    currencyId = focusToDexShareCurrencyId(api, currency as [string, string]);
  } else if (currency instanceof Token) {
    // handle token
    currencyId = currency.toCurrencyId(api);
  } else if (
    ['isDexShare', 'isToken', 'isErc20'].reduce((acc, cur) => acc || Reflect.has(currency as CurrencyId, cur), false)
  ) {
    // handle CurrencyId
    currencyId = currency as CurrencyId;
  }

  if (!currency) throw new ConvertToCurrencyIdFailed();

  return currencyId as CurrencyId;
};

export const focusToCurrencyIdName = (target: MaybeCurrency): string => {
  if (typeof target === 'string') return target;

  if (Array.isArray(target)) return target.join('-');

  if (target instanceof Token) return target.toString();

  try {
    if ((target as CurrencyId).isToken) return target.asToken.toString();

    if ((target as CurrencyId).isDexShare)
      return `${target.asDexShare[0].toString()}-${target.asDexShare[1].toString()}`;

    if ((target as CurrencyId).isErc20) return target.asErc20.toString();
  } catch (e) {
    throw new ConvertToNameFailed();
  }

  return '';
};
