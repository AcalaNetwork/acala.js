import { CurrencyId } from '@acala-network/types/interfaces';
import { Token } from './token';
import { AnyApi } from './type';

export class ConvertToCurrencyIdFailed extends Error {
  constructor() {
    super();

    this.name = 'convertToCurrencyIdFailed';
    this.message = 'convert to currency id failed';
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
