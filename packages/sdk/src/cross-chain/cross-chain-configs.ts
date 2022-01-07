import { forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';
import { Chain, CrossChainSelected, CrossChainTokenConfig } from './types';

type OnChangeCallback = (selected: CrossChainSelected) => void;

function uniqueChains(chains: Chain[]): Chain[] {
  return chains.reduce((acc, cur) => {
    if (acc.find((item) => item.name === cur.name)) return acc;

    acc.push(cur);

    return acc;
  }, [] as Chain[]);
}

export class CrossChainSelector {
  private selected!: CrossChainSelected;
  public readonly configs: CrossChainTokenConfig[];
  public readonly fromChains: Chain[];
  public readonly toChains: Chain[];
  public readonly tokens: string[];
  private callback!: OnChangeCallback;

  constructor(configs: CrossChainTokenConfig[]) {
    this.configs = configs;
    this.fromChains = uniqueChains(configs.map((item) => item.fromChain));
    this.toChains = uniqueChains(configs.map((item) => item.toChain));
    this.tokens = configs.map((item) => item.token);

    // initialize token selected
    this.selected = {
      fromChains: this.fromChains.slice(),
      toChains: this.toChains.slice(),
      tokens: this.tokens.slice()
    };
  }

  get value(): CrossChainSelected {
    return { ...this.selected };
  }

  /**
   * @name onChangeTrigger
   * @description onChangeTrigger will calcuate all avialable options and trigge onChange callback
   */
  private onChagneTrigger(type: 'token' | 'from' | 'to', value: string) {
    if (type === 'token') {
      const allCrossChainTokenConfigs = this.configs.filter((item) => {
        return forceToCurrencyName(item.token) === value;
      });

      const fromChains = allCrossChainTokenConfigs.reduce((acc, cur) => {
        if (acc.find((item) => item.name === cur.fromChain.name)) {
          return acc;
        }

        acc.push(cur.fromChain);

        return acc;
      }, [] as Chain[]);

      const toChains = allCrossChainTokenConfigs.reduce((acc, cur) => {
        if (acc.find((item) => item.name === cur.toChain.name)) {
          return acc;
        }

        acc.push(cur.toChain);

        return acc;
      }, [] as Chain[]);

      // update selected value
      if (!this.selected.from) {
        this.selected.fromChains = fromChains;
      }

      if (!this.selected.to) {
        this.selected.toChains = toChains;
      }

      this.selected.tokens = [value];
      this.selected.token = value;
    }

    if (type === 'from') {
      const allCrossChainTokenConfigs = this.configs.filter((item) => {
        return item.fromChain.name === value;
      });

      const toChains = allCrossChainTokenConfigs.reduce((acc, cur) => {
        if (acc.find((item) => item.name === cur.toChain.name)) {
          return acc;
        }

        acc.push(cur.toChain);

        return acc;
      }, [] as Chain[]);

      const tokens = allCrossChainTokenConfigs.reduce((acc, cur) => {
        if (acc.find((item) => item === cur.token)) {
          return acc;
        }

        acc.push(cur.token);

        return acc;
      }, [] as string[]);

      if (!this.selected.to) {
        this.selected.toChains = toChains;
      }

      if (!this.selected.token) {
        this.selected.tokens = tokens;
      }

      const fromChain = this.fromChains.find((item) => item.name === value);

      if (fromChain) {
        this.selected.from = fromChain;
        this.selected.fromChains = [fromChain];
      }
    }

    if (type === 'to') {
      const allCrossChainTokenConfigs = this.configs.filter((item) => {
        return item.toChain.name === value;
      });

      const fromChains = allCrossChainTokenConfigs.reduce((acc, cur) => {
        if (acc.find((item) => item.name === cur.fromChain.name)) {
          return acc;
        }

        acc.push(cur.toChain);

        return acc;
      }, [] as Chain[]);

      const tokens = allCrossChainTokenConfigs.reduce((acc, cur) => {
        if (acc.find((item) => item === cur.token)) {
          return acc;
        }

        acc.push(cur.token);

        return acc;
      }, [] as string[]);

      if (!this.selected.from) {
        this.selected.fromChains = fromChains;
      }

      if (!this.selected.token) {
        this.selected.tokens = tokens;
      }

      const toChain = this.toChains.find((item) => item.name === value);

      if (toChain) {
        this.selected.to = toChain;
        this.selected.toChains = [toChain];
      }
    }

    this.callback(this.value);
  }

  public selectToken(token: MaybeCurrency): CrossChainSelected {
    const name = forceToCurrencyName(token);

    this.onChagneTrigger('token', name);

    return this.value;
  }

  public selectFrom(chain: string): CrossChainSelected {
    this.onChagneTrigger('from', chain);

    return this.value;
  }

  public selectTo(chain: string): CrossChainSelected {
    this.onChagneTrigger('to', chain);

    return this.value;
  }

  /**
   * @name onChange
   * @description when we select fromChain, toChain, token, onChange will auto callback
   */
  onChange(callback: OnChangeCallback): void {
    this.callback = callback;
  }
}
