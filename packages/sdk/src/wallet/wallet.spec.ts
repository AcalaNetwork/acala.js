import { Wallet } from './index';
import dotenv from 'dotenv';
import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { options } from '@acala-network/api';
import { TokenType } from '@acala-network/sdk-core';

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

    expect(rmrk1.symbol).toEqual('RMRK');
    expect(rmrk2.symbol).toEqual('RMRK');
    expect(rmrk1.decimals).toEqual(10);
    expect(rmrk2.decimals).toEqual(10);
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

  test('get price should work', async () => {
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
});
