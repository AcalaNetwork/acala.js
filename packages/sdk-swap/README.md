# @acala-network/sdk-swap

```bash
npm install @acala-network/sdk-core @acala-network/sdk-swap
```

```js
import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@acala-network/api';
import { Token, FixedPointNumber, getPresetToken } from '@acala-network/sdk-core';
import { SwapTrade } from '@acala-network/sdk-swap';

const provider = new WsProvider('ws://localhost:9944');
const api = await ApiPromise.create(options({ provider }));

await api.isReady;

const swap = new SwapPromise(api);

const input = new FixedPointNumber(1, 12);

// KAR -> KSM
const result = swap.swap(['KAR', 'KSM'], input, 'EXACT_INPUT');

console.log(`
  path: ${result.path.map((item) => item.toString()).join('->')}
  input: ${result.input.amount.toString()},
  output: ${result.output.amount.toString()}
  mode: ${result.mode}
  exchangeFee: ${result.exchangeFee.toString()}
`)
);
```