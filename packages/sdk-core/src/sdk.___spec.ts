import { WsProvider, ApiPromise } from '@polkadot/api';
import { options } from '@acala-network/api';
import { AcalaSDK } from './sdk';
import { CHAIN } from './type';

describe('acala sdk', () => {
  const provider = new WsProvider('ws://127.0.0.1:9944');
  const acalaApi = new ApiPromise(options({ provider }));

  let sdk: AcalaSDK;

  beforeAll(async () => {
    await acalaApi.isReady;

    sdk = new AcalaSDK({
      instances: { acala: acalaApi } as Record<CHAIN, ApiPromise>
    });
  });

  test('getInstance should be ok', () => {
    expect(sdk.getInstance()?.isConnected).toEqual(true);
  });

  test('event should be ok', () => {
    sdk.event.on('test', () => {
      expect(true).toEqual(true);
    });

    sdk.event.emit('test');
  });
});
