import { StorageKey, u32, Vec, Option, U128 } from '@polkadot/types';
import {
  ModuleSupportIncentivesPoolId,
  PalletSchedulerScheduled,
  FrameSupportPreimagesBounded
} from '@polkadot/types/lookup';
import { ITuple, CallFunction } from '@polkadot/types/types';
import { getPoolId } from './get-pool-id.js';
import { AnyApi } from '@acala-network/sdk-core';

export function getDeductionEndtimeConfigs(
  api: AnyApi,
  data: [StorageKey<[u32]>, Vec<Option<PalletSchedulerScheduled>>][]
): Record<string, number> {
  const result: [string, number][] = [];

  data.forEach(([key, value]) => {
    const blockNumber = key.args[0].toNumber();

    const inner = (data: FrameSupportPreimagesBounded) => {
      let call: CallFunction | null = null;

      try {
        call = api.registry.createType('Call', data.asInline.toHex()) as unknown as CallFunction;
      } catch (error) {
        console.error(error);
      }

      if (!call) return;

      if (call.method === 'updateClaimRewardDeductionRates' && call.section === 'incentives') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const args = call.args as any as Vec<Vec<ITuple<[ModuleSupportIncentivesPoolId, U128]>>>;

        args.forEach((i) => {
          i.forEach((item) => {
            const ratio = item[1].toString();

            if (ratio === '0') {
              result.push([getPoolId(item[0]), blockNumber]);
            }
          });
        });
      }

      if (call.method === 'batchAll' && call.section === 'utility') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (call.args[0] as any as PalletSchedulerScheduled['call'][]).forEach((item) => inner(item));
      }
    };

    value.forEach((item) => inner(item.unwrapOrDefault().call));
  });

  return Object.fromEntries(result);
}
