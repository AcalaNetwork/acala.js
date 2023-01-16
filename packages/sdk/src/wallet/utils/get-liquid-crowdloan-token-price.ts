import { AnyApi, FixedPointNumber } from '@acala-network/sdk-core';
import { u128 } from '@polkadot/types-codec';
import { Extrinsic, SignedBlock } from '@polkadot/types/interfaces';
import { CumulusPrimitivesParachainInherentParachainInherentData } from '@polkadot/types/lookup';
import { Storage } from '../../utils/storage';
import { map } from 'rxjs/operators';

const LEASE_BLOCK_NUMBERS: Record<number, number> = {
  13: 17_856_000
};

/*
  The LiquidCrowdloan token price is calculated by DOT oracle price and current relaychain block number
  formula: oracle price * (1 / (1 + rewardRate) ** (lease block number - current relaychain block))
*/
const getLiquidCrowdloanPrice = (
  api: AnyApi,
  lease: number,
  currentRelayBlockNumber: number,
  stakingCurrencyPrice: FixedPointNumber
): FixedPointNumber => {
  const rewardRatePerRelaychainBlock =
    (api.consts?.prices?.rewardRatePerRelaychainBlock as any as u128)?.toNumber() || 0;
  const leaseBlockNumber = LEASE_BLOCK_NUMBERS[lease];
  const discount = FixedPointNumber.ONE.div(
    new FixedPointNumber(
      (1 + rewardRatePerRelaychainBlock / 10 ** 18) ** Math.max(leaseBlockNumber - currentRelayBlockNumber, 0)
    )
  );

  return stakingCurrencyPrice.mul(discount);
};

export const subscribeLiquidCrowdloanTokenPrice = (api: AnyApi, stakingTokenPrice: FixedPointNumber, lease: number) => {
  const block$ = Storage.create<SignedBlock>({
    api: api,
    path: 'rpc.chain.getBlock',
    params: []
  }).observable;

  return block$.pipe(
    map((block) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const extrinsic = block.block.extrinsics.find((item) => {
        return item.method.section === 'parachainSystem' && item.method.method === 'setValidationData';
      }) as Extrinsic | undefined;

      if (extrinsic) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const args = extrinsic.method.args[0] as any as CumulusPrimitivesParachainInherentParachainInherentData;
        const relayChainBlockNumber = args?.validationData?.relayParentNumber?.toNumber();

        if (!LEASE_BLOCK_NUMBERS[lease]) return FixedPointNumber.ZERO;

        return getLiquidCrowdloanPrice(api, lease, relayChainBlockNumber, stakingTokenPrice);
      }

      return FixedPointNumber.ZERO;
    })
  );
};
