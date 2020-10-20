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
const api = ApiPromise.create(options({ provider }));

const aca = getPresetToken('ACA').clone({ amount: new FixedPointNumber(100) });
const ausd = getPresetToken('AUSD');

const availableTokenPairs = SwapTrade.getAvailableToenPairs(api);
const maxTradePathLength = new FixedPointNumber(api.const.dex.tradingPathLimit.toString());
const fee = {
  numerator: new FixedPointNumber(api.const.dex.getExchangeFee[0].toString()),
  denominator: new FixedPointNumber(api.const.dex.getExchanngeFee[1].toString())
};

const swapTrade = new SwapTrade({
  input: aca,
  output: ausd,
  mode: 'EXACT_INPUT',
  availableTokenPairs,
  maxTradePathLength,
  fee,
  acceptSlippage: new FixedPointNumber(0.001)
});

const tradePairs = SwapTrade.getTradeTokenPairsByPaths();

const unsub = api.query.queryMulti(
  tradePairs.map((item) => ([api.query.dex.liquidityPool, ...item.toChainData()])),
  (result) => {
    const pools = SwapTrade.convertLiquidityPoolsToTokenPairs(result, tradePairs);
    const tradeParameters = swapTrade.getTradeParameters(pools)

    if (tradeParameters.mode === 'EXECT_INPUT') {
      api.tx.dex.swapWithExactSupply(...tradeParameters.toChainData(tradeParameters.mode)).signAndSend(...)
    } else {
      api.tx.dex.swapWithExactTarget(...tradeParameters.toChainData(tradeParameters.mode)).signAndSend(...)
    }

    unsub();
  }
);
```