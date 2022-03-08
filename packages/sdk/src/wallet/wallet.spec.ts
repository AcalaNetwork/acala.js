import { Wallet } from './index';
import dotenv from 'dotenv';
import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { options } from '@acala-network/api';
import { TokenType } from '@acala-network/sdk-core';
import { PriceProviderType } from './price-provider/types';

dotenv.config();

describe('wallet', () => {
  let sdk: Wallet | undefined;

  jest.setTimeout(30000);

  const initSDK = async () => {
    if (sdk) return sdk;

    const endpoint = process.env.ENDPOINT || 'wss://karura.api.onfinality.io/public-ws';
    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create(options({ provider }));

    await api.isReady;

    const wallet = new Wallet(api);

    await wallet.isReady;

    return wallet;
  };

  test('get token sould work', async () => {
    const sdk = await initSDK();

    const rmrk1 = await sdk.getToken('RMRK');
    const rmrk2 = await sdk.getToken('fa://0');
    const taiKSM1 = await sdk.getToken('taiKSM');
    const taiKSM2 = await sdk.getToken('sa://0');
    const taiKSM3 = await sdk.getToken('Taiga KSM');

    expect(rmrk1.symbol).toEqual('RMRK');
    expect(rmrk2.symbol).toEqual('RMRK');
    expect(rmrk1.decimals).toEqual(10);
    expect(rmrk2.decimals).toEqual(10);
    expect(taiKSM1.symbol).toEqual('taiKSM');
    expect(taiKSM2.symbol).toEqual('taiKSM');
    expect(taiKSM3.symbol).toEqual('taiKSM');
    expect(taiKSM1.decimals).toEqual(12);
    expect(taiKSM2.decimals).toEqual(12);
    expect(taiKSM3.decimals).toEqual(12);
  });

  test('get tokens should work', async () => {
    const sdk = await initSDK();

    const tokens1 = await sdk.getTokens(TokenType.BASIC);
    const tokens2 = await sdk.getTokens(TokenType.DEX_SHARE);
    const tokens3 = await sdk.getTokens([TokenType.BASIC, TokenType.DEX_SHARE]);

    expect(Object.values(tokens1).length).not.toBe('KAR');
    expect(Object.values(tokens2).length).not.toBe(0);
    expect(Object.values(tokens3).length).toEqual(Object.values(tokens1).length + Object.values(tokens2).length);
  });

  test('get location should work', async () => {
    const sdk = await initSDK();

    const rmrk = await sdk.getToken('RMRK');
    const qtz = await sdk.getToken('QTZ');

    expect(rmrk.locations?.generalIndex).toBe(8);
    expect(rmrk.locations?.paraChainId).toBe(1000);
    expect(rmrk.locations?.palletInstance).toBe(50);
    expect(qtz.locations?.paraChainId).toBe(2095);
  });

  test('get market price should work', async () => {
    const sdk = await initSDK();

    const price1 = await sdk.getPrice('KSM');
    const price2 = await sdk.getPrice('RMRK');
    const price3 = await sdk.getPrice('LKSM');

    expect(price1.toString()).not.toBe('0');
    expect(price1.toString()).not.toBe(undefined);
    expect(price2.toString()).not.toBe('0');
    expect(price2.toString()).not.toBe(undefined);
    expect(price3.toString()).not.toBe('0');
    expect(price3.toString()).not.toBe(undefined);
  });

  test('get dex price should work', async () => {
    const sdk = await initSDK();

    const price1 = await sdk.getPrice('KSM', PriceProviderType.DEX);
    const price2 = await sdk.getPrice('RMRK', PriceProviderType.DEX);
    const price3 = await sdk.getPrice('LKSM', PriceProviderType.DEX);

    expect(price1.toString()).not.toBe('0');
    expect(price1.toString()).not.toBe(undefined);
    expect(price2.toString()).not.toBe('0');
    expect(price2.toString()).not.toBe(undefined);
    expect(price3.toString()).not.toBe('0');
    expect(price3.toString()).not.toBe(undefined);
  });
});
