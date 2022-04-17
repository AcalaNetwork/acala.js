import dotenv from 'dotenv';
import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { options } from '@acala-network/api';
import { Wallet } from '../wallet';
import { Liquidity } from './index';
import { createDexShareName } from '@acala-network/sdk-core';

dotenv.config();

describe('wallet', () => {
  let sdk: Liquidity | undefined;

  jest.setTimeout(50000);

  const initSDK = async () => {
    if (sdk) return sdk;

    const endpoint = process.env.ENDPOINT || 'wss://karura.api.onfinality.io/public-ws';
    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create(options({ provider }));

    await api.isReady;

    const wallet = new Wallet(api);

    await wallet.isReady;

    return wallet.liquidity;
  };

  test('get all enabled pool should be ok', async () => {
    const liqudity = await initSDK();

    const enabledPools = await liqudity.getPoolListByStatus();

    expect(enabledPools.length).not.toEqual(0);
  });

  test('get pool info should be ok', async () => {
    const liqudity = await initSDK();

    const karksm = await liqudity.getPoolInfo('lp://KAR/KSM');

    expect(karksm.token.decimals).toEqual(12);
    expect(karksm.token.isDexShare).toEqual(true);
    expect(karksm.pair.length).toEqual(2);
    expect(karksm.pair[0].name).toEqual('KAR');
    expect(karksm.pair[1].name).toEqual('KSM');
  });

  test('get pool positions should be ok', async () => {
    const liqudity = await initSDK();

    const karksm = await liqudity.getPoolPositions('lp://KAR/KSM');

    expect(karksm.info.token.decimals).toEqual(12);
    expect(karksm.info.token.isDexShare).toEqual(true);
    expect(karksm.info.pair.length).toEqual(2);
    expect(karksm.info.pair[0].name).toEqual('KAR');
    expect(karksm.info.pair[1].name).toEqual('KSM');
    expect(karksm.amounts[1].toString()).not.toBe('0');
    expect(karksm.amounts[0].toString()).not.toBe('0');
  });

  test('get pool detail should be ok', async () => {
    const liqudity = await initSDK();

    const karksm = await liqudity.getPoolDetail('lp://KAR/KSM');

    expect(karksm.info.token.decimals).toEqual(12);
    expect(karksm.info.token.isDexShare).toEqual(true);
    expect(karksm.info.pair.length).toEqual(2);
    expect(karksm.info.pair[0].name).toEqual('KAR');
    expect(karksm.info.pair[1].name).toEqual('KSM');
    expect(karksm.amounts[1].toString()).not.toBe('0');
    expect(karksm.amounts[0].toString()).not.toBe('0');
    expect(karksm.tvl.toString()).not.toBe('0');
    expect(karksm.sharePrice.toString()).not.toBe('0');
    expect(karksm.share.toString()).not.toBe('0');
  });

  test('get user pool detail should be ok', async () => {
    const liqudity = await initSDK();

    const kusdRMRK = await liqudity.getUserLiquidityDetails(
      'seorgCZDzP5G3JEbsBjFdpQ4dTUgCWoPjQynyJqHCfXvZVW',
      createDexShareName('KUSD', 'fa://0')
    );

    expect(kusdRMRK.share.toString()).not.toBe('0');
    expect(kusdRMRK.ratio.toString()).not.toBe('0');
  });
});
