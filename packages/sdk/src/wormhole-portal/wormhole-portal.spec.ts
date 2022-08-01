/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EvmRpcProvider } from '@acala-network/eth-providers';
import { WormholePortal } from './wormhole-portal';
import { BigNumber } from 'ethers';

describe.skip('ausd portal', () => {
  let sdk: WormholePortal | undefined;

  jest.setTimeout(50000);

  const initSDK = async () => {
    if (sdk) return sdk;

    const kethProvider = new EvmRpcProvider('wss://karura.api.onfinality.io/public-ws', {
      subqlUrl: 'https://api.subquery.network/sq/AcalaNetwork/evm-acala'
    });

    const ethProvider = new EvmRpcProvider('wss://acala-polkadot.api.onfinality.io/public-ws', {
      subqlUrl: 'https://api.subquery.network/sq/AcalaNetwork/evm-acala'
    });

    await ethProvider._api?.isReady;
    await kethProvider._api?.isReady;

    const portal = new WormholePortal({
      ethProviders: {
        acala: ethProvider,
        karura: kethProvider
      }
    });

    await portal.isReady;

    return portal;
  };

  test('get token contract should work', async () => {
    const sdk = await initSDK();

    const contract1 = sdk.getTokenContract('acala', 'aUSD');
    const contract2 = sdk.getTokenContract('karura', 'aUSD');

    expect(contract1.address).toEqual('0x0000000000000000000100000000000000000001');
    expect(contract2.address).toEqual('0xe20683ad1ed8bbeed7e1ae74be10f19d8045b530');
  });

  test('get evm binded address should work', async () => {
    const sdk = await initSDK();

    const address1 = await sdk.getEVMAddress('acala', '0x46DBcbDe55be6cc4ce0C72C8d48BF61eb19D6be0');
    const address2 = await sdk.getEVMAddress('acala', '25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr');
    // should get undefined when passing an error address
    const address3 = await sdk.getEVMAddress('acala', '25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV23r');
    // should get undefined when not bind address
    const address4 = await sdk.getEVMAddress('acala', '23CZ1HyG56AQ8tFvtSDcx6p6uehw8EHimSLKyS3LNEwSEoF2');

    expect(address1).toEqual('0x46DBcbDe55be6cc4ce0C72C8d48BF61eb19D6be0');
    expect(address2).toEqual('0x46DBcbDe55be6cc4ce0C72C8d48BF61eb19D6be0');
    expect(address3).toEqual(undefined);
    expect(address4).toEqual(undefined);
  });

  test('get token balance should work', async () => {
    const sdk = await initSDK();

    const balance1 = await sdk.getTokenBalance('acala', 'aUSD', '0x46dbcbde55be6cc4ce0c72c8d48bf61eb19d6be0');
    const balance2 = await sdk.getTokenBalance('acala', 'aUSD', '25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr');

    expect(balance1.toString()).toEqual('1445290819903');
    expect(balance2.toString()).toEqual('1445290819903');
  });

  test('approve balance should work', async () => {
    const sdk = await initSDK();

    const call = await sdk.approve({
      token: 'aUSD',
      fromChain: 'acala',
      toChain: 'karura',
      fromAddress: '25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr',
      toAddress: '25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr',
      amount: BigNumber.from(1000 * 10 ** 12)
    });

    console.log(call.toHex());
  });

  test('transfer balance should work', async () => {
    const sdk = await initSDK();

    const call = await sdk.transfer({
      token: 'aUSD',
      fromChain: 'acala',
      toChain: 'karura',
      fromAddress: '25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr',
      toAddress: '25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr',
      amount: BigNumber.from(1 * 10 ** 12)
    });

    console.log(call.toHex());
  });

  test('redeem balance should work', async () => {
    const sdk = await initSDK();

    const call = await sdk.redeem({
      token: 'aUSD',
      fromChain: 'acala',
      toChain: 'karura',
      toAddress: '25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr',
      txHash: '0x74e8da00b81083c7c80bc143162a3cc4f399bf57a49120e6cc38ba07f1d90ae7'
    });

    console.log(call.toHex());
  });
});
