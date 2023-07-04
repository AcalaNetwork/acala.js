/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Wallet } from './index';
import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { options } from '@acala-network/api';
import { TokenType } from '@acala-network/sdk-core';
import { PriceProviderType } from './price-provider/types';
import { WalletConfigs } from './types';
import { AcalaJsonRpcProvider } from '@acala-network/eth-providers';

describe('wallet', () => {
  let sdk: Wallet | undefined;
  let acalaSDK: Wallet | undefined;

  const karuraEndpoint = 'wss://karura-rpc-0.aca-api.network';
  const acalaEndpoint = 'wss://acala-rpc-0.aca-api.network';
  const karuraEthRpc = 'https://eth-rpc-karura.aca-api.network';
  const acalaEthRpc = 'https://eth-rpc-acala.aca-api.network';

  const initSDK = async (
    endpoint = karuraEndpoint,
    ethRPC = karuraEthRpc,
    configs?: Partial<WalletConfigs>
  ) => {
    // try {
    //   const provider = new WsProvider(endpoint);
    //   const api = await ApiPromise.create(options({ provider }));
    //   const evm = new AcalaJsonRpcProvider(ethRPC);

    //   await api.isReady;

    //   const wallet = new Wallet(api, {
    //     evm,
    //     ...configs
    //   });

    //   await wallet.isReady;

    //   console.log(`init ${endpoint} wallet success`);

    //   return wallet;
    // } catch(e) {
    //   console.log(e);
    // }
  };

  beforeAll(async () => {
    // sdk = await initSDK();
    // acalaSDK = await initSDK(acalaEndpoint, acalaEthRpc);
  });

  test('init sdk success', (done) => {
    expect(sdk).toBeDefined();

    done();
  });

  // test('get token sould work', async () => {
  //   console.log('??');
  //   const rmrk1 = await sdk.getToken('RMRK');
  //   const rmrk2 = await sdk.getToken('fa://0');
  //   const taiKSM1 = await sdk.getToken('taiKSM');
  //   const taiKSM2 = await sdk.getToken('sa://0');
  //   const taiKSM3 = await sdk.getToken('Taiga KSM');

  //   console.log(rmrk1);

  //   expect(rmrk1.symbol).toEqual('RMRK');
  //   expect(rmrk2.symbol).toEqual('RMRK');
  //   expect(rmrk1.decimals).toEqual(10);
  //   expect(rmrk2.decimals).toEqual(10);
  //   expect(taiKSM1.symbol).toEqual('taiKSM');
  //   expect(taiKSM2.symbol).toEqual('taiKSM');
  //   expect(taiKSM3.symbol).toEqual('taiKSM');
  //   expect(taiKSM1.decimals).toEqual(12);
  //   expect(taiKSM2.decimals).toEqual(12);
  //   expect(taiKSM3.decimals).toEqual(12);
  // });

  // test.skip('get tokens should work', async () => {
  //   const tokens1 = await sdk.getTokens(TokenType.BASIC);
  //   const tokens2 = await sdk.getTokens(TokenType.DEX_SHARE);
  //   const tokens3 = await sdk.getTokens([TokenType.BASIC, TokenType.DEX_SHARE]);

  //   expect(Object.values(tokens1).length).not.toBe(0);
  //   expect(Object.values(tokens2).length).not.toBe(0);
  //   expect(Object.values(tokens3).length).toEqual(Object.values(tokens1).length + Object.values(tokens2).length);
  // });

  // test.skip('get location should work', async (done) => {
  //   const rmrk = await sdk.getToken('RMRK');
  //   const qtz = await sdk.getToken('QTZ');

  //   expect(rmrk.locations?.generalIndex).toBe(8);
  //   expect(rmrk.locations?.paraChainId).toBe(1000);
  //   expect(rmrk.locations?.palletInstance).toBe(50);
  //   expect(qtz.locations?.paraChainId).toBe(2095);

  //   done();
  // });

  // test.skip('get aggregate price should work', async (done) => {
  //   const price1 = await sdk.getPrice('KSM');
  //   const price2 = await sdk.getPrice('RMRK');
  //   const price3 = await sdk.getPrice('LKSM');
  //   const price4 = await sdk.getPrice('KINT');
  //   const price5 = await sdk.getPrice('QTZ');
  //   const price6 = await sdk.getPrice('MOVR');

  //   expect(price1.toString()).not.toBe('0');
  //   expect(price1.toString()).not.toBe(undefined);
  //   expect(price2.toString()).not.toBe('0');
  //   expect(price2.toString()).not.toBe(undefined);
  //   expect(price3.toString()).not.toBe('0');
  //   expect(price3.toString()).not.toBe(undefined);
  //   expect(price4.toString()).not.toBe('0');
  //   expect(price4.toString()).not.toBe(undefined);
  //   expect(price5.toString()).not.toBe('0');
  //   expect(price5.toString()).not.toBe(undefined);
  //   expect(price6.toString()).not.toBe('0');
  //   expect(price6.toString()).not.toBe(undefined);

  //   const aPrice1 = await acalaSDK.getPrice('ACA');
  //   const aPrice2 = await acalaSDK.getPrice('DOT');
  //   const aPrice3 = await acalaSDK.getPrice('IBTC');
  //   const aPrice4 = await acalaSDK.getPrice('LCDOT');
  //   const aPrice5 = await acalaSDK.getPrice('lp://ACA/DOT');

  //   expect(aPrice1.toString()).not.toBe('0');
  //   expect(aPrice1.toString()).not.toBe(undefined);
  //   expect(aPrice2.toString()).not.toBe('0');
  //   expect(aPrice2.toString()).not.toBe(undefined);
  //   expect(aPrice3.toString()).not.toBe('0');
  //   expect(aPrice3.toString()).not.toBe(undefined);
  //   expect(aPrice4.toString()).not.toBe('0');
  //   expect(aPrice4.toString()).not.toBe(undefined);
  //   expect(aPrice5.toString()).not.toBe('0');
  //   expect(aPrice5.toString()).not.toBe(undefined);

  //   done();
  // });

  // test.skip('get market price should work', async (done) => {
  //   const price1 = await sdk.getPrice('KSM', PriceProviderType.MARKET);
  //   const price2 = await sdk.getPrice('RMRK', PriceProviderType.MARKET);
  //   const price3 = await sdk.getPrice('LKSM', PriceProviderType.MARKET);
  //   const price4 = await sdk.getPrice('KINT', PriceProviderType.MARKET);
  //   const price5 = await sdk.getPrice('QTZ', PriceProviderType.MARKET);
  //   const price6 = await sdk.getPrice('MOVR', PriceProviderType.MARKET);
  //   const price7 = await sdk.getPrice('taiKSM', PriceProviderType.MARKET);
  //   const price8 = await sdk.getPrice('PHA', PriceProviderType.MARKET);

  //   expect(price1.toString()).not.toBe('0');
  //   expect(price1.toString()).not.toBe(undefined);
  //   expect(price2.toString()).not.toBe('0');
  //   expect(price2.toString()).not.toBe(undefined);
  //   expect(price3.toString()).not.toBe('0');
  //   expect(price3.toString()).not.toBe(undefined);
  //   expect(price4.toString()).not.toBe('0');
  //   expect(price4.toString()).not.toBe(undefined);
  //   expect(price5.toString()).not.toBe('0');
  //   expect(price5.toString()).not.toBe(undefined);
  //   expect(price6.toString()).not.toBe('0');
  //   expect(price6.toString()).not.toBe(undefined);
  //   expect(price7.toString()).not.toBe('0');
  //   expect(price7.toString()).not.toBe(undefined);
  //   expect(price8.toString()).not.toBe('0');
  //   expect(price8.toString()).not.toBe(undefined);

  //   done();
  // });

  // test.skip('get dex price should work', async (done) => {
  //   const price1 = await sdk.getPrice('KSM', PriceProviderType.DEX);
  //   const price2 = await sdk.getPrice('RMRK', PriceProviderType.DEX);
  //   const price3 = await sdk.getPrice('LKSM', PriceProviderType.DEX);
  //   const price4 = await sdk.getPrice('BNC', PriceProviderType.DEX);
  //   const price5 = await sdk.getPrice('TAI', PriceProviderType.DEX);

  //   expect(price1.toString()).not.toBe('0');
  //   expect(price1.toString()).not.toBe(undefined);
  //   expect(price2.toString()).not.toBe('0');
  //   expect(price2.toString()).not.toBe(undefined);
  //   expect(price3.toString()).not.toBe('0');
  //   expect(price3.toString()).not.toBe(undefined);
  //   expect(price4.toString()).not.toBe('0');
  //   expect(price4.toString()).not.toBe(undefined);
  //   expect(price5.toString()).not.toBe('0');
  //   expect(price5.toString()).not.toBe(undefined);

  //   done();
  // });

  // test.skip('support ausd should work', async (done) => {
  //   const token0 = await sdk.getToken('AUSD');

  //   expect(token0.display).toBe('aUSD');

  //   done();
  // });

  // test.skip('query balance should work', async () => {
  //   const usdtBalance0 = await sdk.getBalance('USDT', '0x2804F43DDD8c08B66B61A1Cf8DcC744f1B109971');
  //   const usdtBalance1 = await sdk.getBalance('USDT', '5GREeQcGHt7na341Py6Y6Grr38KUYRvVoiFSiDB52Gt7VZiN');
  //   const usdtBalance2 = await sdk.getBalance('USDT', 'p62hgj46CwnVtZjP2MUAxLzoxG7SJdpFq5RYbBdy4SMzS9i');

  //   expect(usdtBalance0.free.toString()).not.toBe('0');
  //   expect(usdtBalance1.free.toString()).not.toBe('0');
  //   expect(usdtBalance2.free.toString()).not.toBe('0');
  // });
});
