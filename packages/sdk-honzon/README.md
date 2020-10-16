# @acala-network/sdk-honzon

```bash
npm install @acala-network/sdk @acala-network/sdk-honzon
```

```js
import { AcalaSDK, PRESET_TOKENS } from '@acala-network/sdk';
import { honzon } from '@acala-network/sdk-honzon';

const sdk = new AcalaSDK({ endpoint: 'http://localhost:9933' });
const mnemonic = '';

// inject honzon module
sdk.modules.inject(honzon);

// insert sender account
sdk.address.insert({
  type: 'ss2556',
  name: 'account1',
  mnemonic: mnemonic,
});

const dotAmount = sdk.queryTokenBalance('account1', PRESET_TOKENS.acala.DOT);


const depositDOT = new Token({ amount: 1, name: 'DOT' });
const targetBrowAUSD = new Token({ amount: 100, name: 'AUSD' });

sdk.honzon.depositAndBrow({
  deposit: depositDOT,
  brow: targetbrowAUSD
});


```