### AUSD Bridge SDK

## Summary
WormholePortal is an sdk support transfer aUSD form **acala** to **karura** with substract wallet.

### Transfer aUSD from acala to karura
0. install
```bash
yarn add @acala-network/bodhi.js @acala-network/sdk@4.1.6.26
```
1. setup sdk
```javascript
import { EvmRpcProvider } from '@acala-network/eth-providers';
import { BigNumber } from 'ethers';

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
const keyring = new Keyring({ type: 'ss25519' });
const fromAccount = keyring.fromMenmonic('XXX);
const toAccount = keyring.fromMenominc('XXX);

const transferParams = {
  token: 'aUSD',
  fromChain: 'acala',
  toChain: 'karura',
  amount: BigNumber.from('1000000000000'),
  fromAddress: fromAccount.addres,
  toAddress: toAccount.addres
};
```

3. approve balance and send balance        
```javascript
const approve = await sdk.approve(tranfesrParams);

await approve.signAndSend(fromAccount, { nonce: -1 });

// SHOULD WAIT APPROVE SUCCES

const transfer = await sdk.transfer(transferParams);

const hash = await transfer.signAndSend(fromAccount, { nonce: -1 });
```

4. redeem  
when the tranfser finished, we should get signedVAA information from wormhole and send an redeem TX at **toChain**
```javascript
// pass the transfer TX hash 
const redeem = await sdk.redeem({ ...transferParams, txHash: hash });

await redeem.signAndSend(toAccount, { nonce: -1 });

// SHOULD WAIT REDEEM SUCCES
```

5. convert waUSD to aUSD        
the **toAddress** in karura will receive the same amount of **waUSD** in the distance of **acala** to **karura** after redeem TX successed, so we should send an additional TX to convert **waUSD** to **aUSD**
```javascript
const convert = sdk.convert({ from: 'waUSD', to: 'aUSD', amount: 'all' });

await convert.signAndSend(toAccount, { nonce: -1 });
```

6. Congratulate that transfer aUSD from **acala** to **karura** successfully.

### Transfer aUSD From Karura to Acala   
Transfer aUSD from **karura** to **acala** is almost the same as from **acala** to **karura**, but should convert **aUSD** to **waUSD** at first.

```javascript
const convert = sdk.convert({ from: 'aUSD', to: 'waUSD', amount: 'all', address: transferParams.toAddress });

await convert.signAndSend(fromAccount, { nonce: -1 });

const transferParams = {
  token: 'waUSD',
  fromChain: 'karura',
  toChain: 'acala',
  amount: BigNumber.from('1000000000000'),
  fromAddress: fromAccount.address,
  toAddress: toAccount.address
};

/** should complete approve and transfer **/
```

and then when the TX complated, we should redeem at **toChain**, but redeem *aUSD*.
```javascript
const redeem = await sdk.redeem({ ...transferParams, token: 'aUSD', txHash: hash });

await redeem.signAndSend(toAccount, { nonce: -1 });
```
