import { Rate } from '@acala-network/types/interfaces';
import { StorageKey, u32, Vec, Option } from '@polkadot/types';
import { ModuleIncentivesPoolId, PalletSchedulerScheduledV3 } from '@acala-network/types/interfaces/types-lookup';
import { ITuple } from '@polkadot/types/types';
import { getPoolId } from './get-pool-id';

export function getDeductionEndtimeConfigs(
  data: [StorageKey<[u32]>, Vec<Option<PalletSchedulerScheduledV3>>][]
): Record<string, number> {
  const result: [string, number][] = [];

  data.forEach(([key, value]) => {
    const blockNumber = key.args[0].toNumber();

    const inner = (data: PalletSchedulerScheduledV3['call']) => {
      const _data = data.asValue;

      if (_data.method === 'updateClaimRewardDeductionRates' && _data.section === 'incentives') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const args = _data.args as any as Vec<Vec<ITuple<[ModuleIncentivesPoolId, Rate]>>>;

        args.forEach((i) => {
          i.forEach((item) => {
            const ratio = item[1].toString();

            if (ratio === '0') {
              result.push([getPoolId(item[0]), blockNumber]);
            }
          });
        });
      }

      if (_data.method === 'batchAll' && _data.section === 'utility') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (_data.args[0] as any as PalletSchedulerScheduledV3['call'][]).forEach((item) => inner(item));
      }
    };

    value.forEach((item) => inner(item.unwrapOrDefault().call));
  });

  return Object.fromEntries(result);
}
