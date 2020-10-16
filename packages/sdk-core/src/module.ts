import { BaseSDK } from './base-sdk';

export abstract class BaseModule {
  public name: string;
  private sdkRef: BaseSDK;

  constructor (name: string, sdk: BaseSDK) {
    this.name = name;
    this.sdkRef = sdk;
  }
}

export type FCModule<U extends BaseSDK, T extends BaseModule> = (sdk: U) => T;
