import { MaybeCurrency } from './types';

export class MethodNotFound extends Error {
  readonly section: string;
  readonly method: string;

  constructor(section: string, method: string) {
    super();

    this.section = section;
    this.method = method;

    this.message = `can't find ${section}.${method} in api`;
    this.name = 'MethodNotFound';
  }
}

export class ConvertToCurrencyIdFailed extends Error {
  constructor(origin: MaybeCurrency) {
    super();

    this.name = 'convertToCurrencyIdFailed';
    this.message = `convert to currency id failed ${origin.toString()}`;
  }
}

export class ConvertToCurrencyNameFailed extends Error {
  constructor(origin: MaybeCurrency) {
    super();

    this.name = 'convertToCurrencyNameFailed';
    this.message = `convert to currency name failed ${origin.toString()}`;
  }
}

export class NotDexShareName extends Error {
  constructor(origin: string) {
    super();

    this.name = 'notDexShare';
    this.message = `${origin} is not dex share name`;
  }
}

export class NotStableAssetPoolName extends Error {
  constructor(origin: string) {
    super();

    this.name = 'notStableAssetPoolId';
    this.message = `${origin} is not stable asset pool name`;
  }
}

export class NotForeignAssetName extends Error {
  constructor(origin: string) {
    super();

    this.name = 'notForeignAssetName';
    this.message = `${origin} is not foreign asset name`;
  }
}

export class NotLiquidCrowdloanName extends Error {
  constructor(origin: string) {
    super();

    this.name = 'notLiquidCrowdloan';
    this.message = `${origin} is not liquid crowdloan asset name`;
  }
}
