### AUSD Bridge SDK

## Summary
WormholePortal is an sdk support transfer aUSD from **Acala** to **Karura** with substract wallet.

## Tips
1. we recommend bounded the EVM address at first before transfer aUSD.
2. please confirm that address in **fromChain** or **toChain** have enough native token as TX fee. the **approve**, **transfer** will charge fees at **fromChain** and the **redeem** will charge fees at **toChain**.
3. the minimum transferable **aUSD** is 0.1 AUSD beacuse of that the **aUSD** existential deposit amount at *Acala** is 0.1 and **waUSD** existential deposit at **Karura** is 0.1.

### Transfer aUSD From Acala To Karura
0. install
```bash
yarn add @acala-network/bodhi.js @acala-network/sdk@4.1.6.28
```
1. setup sdk
```javascript
import { EvmRpcProvider } from '@acala-network/eth-providers';
import { TransferParams, WormholePortal } from '@acala-network/sdk/wormhole-portal'
import { BigNumber } from "ethers"
import { Keyring } from '@polkadot/api';

const acalaProvider = new EvmRpcProvider(
  'wss://acala-polkadot.api.onfinality.io/public-ws',
  { subqlUrl: 'https://api.subquery.network/sq/AcalaNetwork/evm-acala' }
);

const karuraProvider = new EvmRpcProvider(
  'wss://karura.api.onfinality.io/public-ws',
  { subqlUrl: 'https://api.subquery.network/sq/AcalaNetwork/evm-karura' }
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
```javascript
const keyring = new Keyring({ type: 'sr25519' });
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
const redeem = await sdk.redeem({ ...transferParams, txHash: hash.toString() });

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

### Transfer aUSD From Karura To Acala   
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

and then when the TX complated, we should redeem at **toChain**, but becareful should redeem *aUSD* this time.
```javascript
const redeem = await sdk.redeem({ ...transferParams, token: 'aUSD', txHash: hash.toString() });

await redeem.signAndSend(toAccount, { nonce: -1 });
```
