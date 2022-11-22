import { Rate } from '@acala-network/types/interfaces';
import { StorageKey, u32, Vec, Option } from '@polkadot/types';
import { ModuleSupportIncentivesPoolId, PalletSchedulerScheduledV3 } from '@acala-network/types/lookup';
import { ITuple } from '@polkadot/types/types';
import { getPoolId } from './get-pool-id';

export function getDeductionEndtimeConfigs(
  data: [StorageKey<[u32]>, Vec<Option<PalletSchedulerScheduledV3>>][]
): Record<string, number> {
  const result: [string, number][] = [];

  data.forEach(([key, value]) => {
    const blockNumber = key.args[0].toNumber();

    const inner = (data: PalletSchedulerScheduledV3['call']) => {
      const value = data.asValue;

      if (!value) return;

      if (value.method === 'updateClaimRewardDeductionRates' && value.section === 'incentives') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const args = value.args as any as Vec<Vec<ITuple<[ModuleSupportIncentivesPoolId, Rate]>>>;

        args.forEach((i) => {
          i.forEach((item) => {
            const ratio = item[1].toString();

            if (ratio === '0') {
              result.push([getPoolId(item[0]), blockNumber]);
            }
          });
        });
      }

      if (value.method === 'batchAll' && value.section === 'utility') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (value.args[0] as any as PalletSchedulerScheduledV3['call'][]).forEach((item) => inner(item));
      }
    };

    value.forEach((item) => inner(item.unwrapOrDefault().call));
  });

  return Object.fromEntries(result);
}
