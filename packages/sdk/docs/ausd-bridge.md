### AUSD Bridge SDK

## Summary
WormholePortal is an sdk support transfer aUSD form **acala** to **karura** with substract wallet.

### Transfer aUSD from acala to karura
1. setup sdk
```javascript
import { EvmRpcProvider } from '@acala-network/eth-providers';

const acalaProvider = new EvmRpcProvider(
  'wss://acala-polkadot.api.onfinality.io/public-ws',
  { subqlUrl: 'https://api.subquery.network/sq/AcalaNetwork/evm-acala' }
);

const karuraProvider = new EvmRpcProvider(
  'wss://karura.api.onfinality.io/public-ws',
  { subqlUrl: 'https://karura-evm-subql.aca-api.network' }
);

const sdk = new WormholePortal({
  ethProviders: {
    acala: acalaProvider,
    karura: karuraProvider
  }
});

await sdk.isReady;
```

2. parper the transfer params
**fromChain** and **toChain** address were both bounded the EVM address when cross aUSD is better.
```javascript
const transferParams = {
  token: 'aUSD',
  formChain: 'acala',
  toChain: 'karura',
  fromAddress: '25XX...XX',
  toAddress: '25XX...XXX'
};
```
3. approve balance and send balance
```javascript
const approve = await sdk.approve(tranfesrParams);

await approve.signAndSend(KEY, { nonce: -1 });

const transfer = await sdk.transfer(transferParams);

const hash = await transfer.signAndSend(KEY, { nonce: -1 });
```

4. redeem 
when the tranfser finished, we should get signedVAA information from wormhole and send an redeem transaction in **toChain**
```javascript
// pass the transfer TX hash 
const redeem = await sdk.redeem( ...tranfserParams, txHash: hash );

await redeem.signedAndSend(KEY, { nonce: -1 });
```

5. convert waUSD to aUSD
the **toAddress** in karura will receive the same amount of **waUSD** in the distance of **acala** to **karura** after redeem TX successed, so we should send an additional TX to convert **waUSD** to **aUSD**
```javascript
const convert = sdk.convert({ from: 'waUSD', to: 'aUSD', amount: 'total' });

await convert.signAndSend(KEY, { nonce: -1 });
```

6. Congratulate that transfer aUSD from **acala** to **karura** successfully.

### Transfer aUSD From Karura to Acala
Transfer aUSD from **karura** to **acala** is almost the same as from **acala** to **karura**, but should convert **aUSD** to **waUSD** at first.

```javascript
const convert = sdk.convert({ from: 'aUSD', to: 'waUSD', amount: 'total' });

await convert.signAndSend(KEY, { nonce: -1 });

const transferParams = {
  token: 'waUSD',
  formChain: 'karura',
  toChain: 'acala',
  fromAddress: '25XX...XX',
  toAddress: '25XX...XXX'
};

/** should complete approve and transfer and redeem process **/
```