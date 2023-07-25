import { Wallet } from '@acala-network/sdk';
import { AggregateDex } from '@acala-network/sdk-swap';
import { PaymentConfig, PaymentMethod, PaymentMethodTypes, Tx } from './types';
import { AnyApi, Token } from '@acala-network/sdk-core';
import { isEmpty } from 'lodash';
import { ensureReady, toPromise } from './utils';
import { Storages, createStorages } from './storage';

export class Payment {
  readonly wallet: Wallet;
  readonly dex: AggregateDex;
  readonly api: AnyApi;
  public isReady = false;
  private paymentMethods: PaymentMethod[] = [];
  private storages: Storages;

  constructor(config: PaymentConfig) {
    this.wallet = config.wallet;
    this.dex = config.dex;
    this.api = config.api;
    this.storages = createStorages(this.api);
  }

  public async ready() {
    await this.wallet.isReady;
    await this.dex.isReady;

    this.isReady = true;

    return true;
  }

  private get defaultFeeToken(): Token[] {
    const defaultFeeTokens = this.api.consts.transactionPayment.defaultFeeTokens;

    return defaultFeeTokens.map((i) => this.wallet.getToken(i));
  }

  @ensureReady
  public async getPaymentMethods(): Promise<PaymentMethod[]> {
    if (!isEmpty(this.paymentMethods)) return this.paymentMethods;

    const { dex } = this;
    const swapTradableTokens = await dex.getTradableTokens();
    const globalFeePaths = await this.storages.globalFeeSwapPathes().query();
    const defaultFeeTokens = this.defaultFeeToken;
    const { nativeToken } = this.wallet.getPresetTokens();

    // insert native token first
    const paymentMethods = [{ type: PaymentMethodTypes.NATIVE_TOKEN, path: [nativeToken] }];

    // insert default fee tokens
    defaultFeeTokens.forEach((token) => {
      paymentMethods.push({ type: PaymentMethodTypes.DEFAULT_FEE_TOKEN, path: [token] });
    });

    // insert global fee path
    globalFeePaths.forEach(([key, value]) => {
      const path = value.unwrapOrDefault();
      const first = this.wallet.getToken(key.args[0]);

      // remove native token when native token is exist in defaultFeeTokens
      if (first.isEqual(nativeToken)) return;

      // remove first when first is exist in defaultFeeTokens
      if (defaultFeeTokens.find((i) => i.isEqual(first))) return;

      paymentMethods.push({
        type: PaymentMethodTypes.GLOBAL_SWAP_PATH,
        path: path.map((i) => this.wallet.getToken(i))
      });
    });

    // insert swap path
    for (const token of swapTradableTokens) {
      // get trade path from token to native token
      const paths = dex.getTradingPaths(token, nativeToken, 'acala');

      if (isEmpty(paths)) continue;

      // remove native token when native token is exist in defaultFeeTokens
      if (token.isEqual(nativeToken)) continue;

      // remove token when token is exist in defaultFeeTokens
      if (defaultFeeTokens.find((i) => i.isEqual(token))) continue;

      // remove token when token is exist in globalFeePaths
      if (globalFeePaths.find(([key]) => this.wallet.getToken(key.args[0]).isEqual(token))) continue;

      const path = paths[0][1][1];

      if (isEmpty(path)) continue;

      paymentMethods.push({
        type: PaymentMethodTypes.SWAP,
        path
      });
    }

    return paymentMethods;
  }

  private getSurplusByType(type: PaymentMethodTypes) {
    switch (type) {
      case PaymentMethodTypes.NATIVE_TOKEN:
        return 1;
      case PaymentMethodTypes.DEFAULT_FEE_TOKEN:
        return 1.2;
      case PaymentMethodTypes.GLOBAL_SWAP_PATH:
        return 1.5;
      case PaymentMethodTypes.SWAP:
        return 1.5;
      default:
        return 1;
    }
  }

  @ensureReady
  public createWrappedTx(tx: Tx, paymentMethod: PaymentMethod) {
    const { api } = this;
    const { path, type } = paymentMethod;
    const surplus = this.getSurplusByType(type);

    let wrapped: Tx;

    switch (type) {
      case PaymentMethodTypes.NATIVE_TOKEN:
        wrapped = tx;
        break;
      case PaymentMethodTypes.DEFAULT_FEE_TOKEN:
        wrapped = api.tx.transactionPayment.withFeePath(
          path.map((i) => i.toChainData()),
          tx.method.toHex()
        );
        break;
      case PaymentMethodTypes.GLOBAL_SWAP_PATH:
        wrapped = api.tx.transactionPayment.withFeeCurrency(path[0].toChainData(), tx.method.toHex());
        break;
      case PaymentMethodTypes.SWAP:
        wrapped = api.tx.transactionPayment.withFeePath(
          path.map((i) => i.toChainData()),
          tx.method.toHex()
        );
        break;
      default:
        throw new Error('unknown payment method');
    }

    return { tx: wrapped, surplus };
  }

  @ensureReady
  public async estimateTxFee(tx: Tx, account: string, surplus: number) {
    const { partialFee } = await toPromise(tx.paymentInfo(account));

    return partialFee.muln(surplus);
  }

  @ensureReady
  public async estimateTxFeeByCallName(account: string, section: string, method: string) {
    const { api } = this;

    const call = api.tx[section][method];

    if (!call) throw new Error('unknown call');

    const args = call.meta.args.map((i) => api.createType(i.typeName.toString()));
    const tx = call(...args);

    return this.estimateTxFee(tx, account, 1);
  }
}
