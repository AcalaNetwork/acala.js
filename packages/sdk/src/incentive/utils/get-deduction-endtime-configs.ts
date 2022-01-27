import { Rate } from '@acala-network/types/interfaces';
import { StorageKey, u32, Vec, Option } from '@polkadot/types';
import { ModuleIncentivesPoolId, PalletSchedulerScheduledV2 } from '@polkadot/types/lookup';
import { ITuple } from '@polkadot/types/types';
import { getPoolId } from './get-pool-id';

export function getDeductionEndtimeConfigs(
  data: [StorageKey<[u32]>, Vec<Option<PalletSchedulerScheduledV2>>][]
): Record<string, number> {
  const result: [string, number][] = [];

  data.forEach(([key, value]) => {
    const blockNumber = key.args[0].toNumber();

    const inner = (data: PalletSchedulerScheduledV2['call']) => {
      if (data.method === 'updateClaimRewardDeductionRates' && data.section === 'incentives') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const args = data.args as any as Vec<Vec<ITuple<[ModuleIncentivesPoolId, Rate]>>>;

        args.forEach((i) => {
          i.forEach((item) => {
            const ratio = item[1].toString();

            if (ratio === '0') {
              result.push([getPoolId(item[0]), blockNumber]);
            }
          });
        });
      }

      if (data.method === 'batchAll' && data.section === 'utility') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (data.args[0] as any as PalletSchedulerScheduledV2['call'][]).forEach((item) => inner(item));
      }
    };

    value.forEach((item) => inner(item.unwrapOrDefault().call));
  });

  return Object.fromEntries(result);
}
