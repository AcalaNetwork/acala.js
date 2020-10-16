import { BaseSDK, BaseSDKOptions } from './base-sdk';
import { Token } from './token';
import { FixedPointNumber } from './fixed-point-number';

interface SDKOptions extends BaseSDKOptions {
  endpoint?: string;
}

export class AcalaSDK extends BaseSDK {
  constructor (options: SDKOptions) {
    super(options);
  }
}
