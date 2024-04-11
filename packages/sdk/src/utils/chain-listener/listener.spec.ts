/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { options } from '@acala-network/api';
import { ChainListener } from './listener.js';

describe.skip('chain listener', () => {
  let sdk: ChainListener | undefined;

  jest.setTimeout(50000);

  const initSDK = async (endpoint = 'wss://karura.api.onfinality.io/public-ws') => {
    if (sdk) return sdk;

    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create(options({ provider }));

    await api.isReady;

    return ChainListener.create({ api });
  };

  test('subscribe should work', async () => {
    const sdk = await initSDK();

    sdk.subscribeByEvents([{ section: 'tokens', method: '*' }]).subscribe((data) => {
      // do
      console.log(
        data.extrinsics?.map((item) => item.raw.toHuman()),
        data.extrinsics?.[0].events?.[1]?.event.section.toString()
      );
    });
  });
});
