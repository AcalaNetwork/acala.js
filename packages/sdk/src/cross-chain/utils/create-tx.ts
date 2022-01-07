import { AnyApi, FixedPointNumber, MaybeCurrency } from '@acala-network/sdk-core';

import { CrossChainTokenConfig } from '../types';

function createParaChainTransfer(
  api: AnyApi,
  config: CrossChainTokenConfig,
  amount: FixedPointNumber,
  address: string
) {
  const tx = api.tx.xcmPallet.reserveTransferAssets;
  const firstType = api.createType(tx.meta.args[0].type.toString());
  const isCurrent = firstType.defKeys.includes('V1');

  const dst = { X1: { ParaChain: to.paraChainId }, parents: 0 };
  const acc = { X1: { AccountId32: { id: accountId, network: 'Any' } } };
  const ass = [{ ConcreteFungible: { amount: new FixedPointNumber(amount.natural, amount.decimal).toChainData() } }];

  const params = isCurrent
    ? tx.meta.args.length === 5
      ? // Polkadot 9100
        [{ V0: dst }, { V0: acc }, { V0: ass }, 0, DEST_WEIGHT[from]]
      : // Polkadot 9110
        [{ V0: dst }, { V0: acc }, { V0: ass }, 0]
    : [dst, acc, ass, DEST_WEIGHT[from]];

  return tx(...params);
}

function createAcalaTransfer() {}

export function createTx(
  api: AnyApi,
  config: CrossChainTokenConfig,
  amount: FixedPointNumber,
  token: MaybeCurrency,
  address: string
) {
  if (config.fromChain.isParaChain) {
    return createParaChainTransfer(api, amount, address);
  }
}
