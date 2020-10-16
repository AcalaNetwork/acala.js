import { ApiPromise } from '@polkadot/api';
import { EventEmitter } from 'events';
import { isEmpty } from 'lodash';
import { FCModule, BaseModule } from './module';
import { KNOWN_MODULES, CHAIN } from './type';

/**
 * BaseSKD support the base feaatur for the SKD
 */

export interface BaseSDKOptions {
  instances: Record<CHAIN, ApiPromise>;
  enables?: FCModule<BaseSDK, BaseModule>[];
}

export class BaseSDK {
  // instances stores multiply apis for different chain
  protected instances: Record<CHAIN, ApiPromise>;
  private __modules!: Record<string, BaseModule>;
  readonly event!: EventEmitter;

  constructor (options: BaseSDKOptions) {
    this.instances = options.instances;
    this.event = new EventEmitter();

    if (options.enables && !isEmpty(options.enables)) {
      options.enables.forEach((fc) => this.insertModule(fc, true));
    }
  }

  /**
   * get the instance by chain namae
   */
  getInstance (chain: CHAIN = 'acala'): ApiPromise | undefined {
    return this.instances[chain];
  }

  /**
   * @name setInstance
   * @description set the `chain` 's api to instances
   */
  setInstance (chain: CHAIN, api: ApiPromise, force?: boolean): boolean {
    if (chain in this.instances && !force) {
      console.error(`${chain}'s api is already ready, can't modify. you can use force flag to modify.`);

      return false;
    }

    this.instances[chain] = api;

    return true;
  }

  public insertModule (fc: FCModule<BaseSDK, BaseModule>, force?: boolean): boolean {
    const module = fc(this);

    if (module.name in this.__modules && !force) {
      console.error(`name ${module.name} is already initaizlied, coun't modify, you can use force flag to modify`);

      return false;
    }

    this.__modules[module.name] = module;
    this.bindModule(module.name);

    return true;
  }

  private bindModule (name: string): void {
    const module = this.__modules[name];

    Object.defineProperty(this, name, {
      enumerable: true,
      configurable: false,
      writable: false,
      value: module
    });
  }
}
