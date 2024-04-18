import { describe, beforeAll } from 'vitest';
import { Wallet } from '@acala-network/sdk';
import { AcalaDex, AggregateDex } from '@acala-network/sdk-swap';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Payment } from './Payment.js';

describe.skip('payment', () => {
  const karuraEndpoint = 'wss://karura-rpc-0.aca-api.network';

  let payment;

  beforeAll(async () => {
    const api = await ApiPromise.create({ provider: new WsProvider(karuraEndpoint) });

    await api.isReady;

    const wallet = new Wallet(api);
    const dex = new AggregateDex({ api, wallet, providers: [new AcalaDex({ api, wallet })] });

    await wallet.isReady;
    await dex.isReady;

    payment = new Payment({ api, wallet, dex });

    await payment.isReady;
  });
});
