import { FixedPointNumber } from '@acala-network/sdk-core/fixed-point-number';

export const FeeRateMatrix: FixedPointNumber[][] = [
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(231487, 100000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(526013, 100000000), // 20%
    FixedPointNumber.fromRational(106148, 10000000), // 30%
    FixedPointNumber.fromRational(243221, 10000000), // 40%
    FixedPointNumber.fromRational(597041, 10000000), // 50%
    FixedPointNumber.fromRational(126422, 1000000), // 60%
    FixedPointNumber.fromRational(214815, 1000000), // 70%
    FixedPointNumber.fromRational(311560, 1000000), // 80%
    FixedPointNumber.fromRational(410715, 1000000), // 90%
    FixedPointNumber.fromRational(510500, 1000000) // 100%
  ],
  // when used_buffer_percent is 10%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(260999, 100000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(584962, 100000000), // 20%
    FixedPointNumber.fromRational(114942, 10000000), // 30%
    FixedPointNumber.fromRational(254703, 10000000), // 40%
    FixedPointNumber.fromRational(610531, 10000000), // 50%
    FixedPointNumber.fromRational(127866, 1000000), // 60%
    FixedPointNumber.fromRational(216285, 1000000), // 70%
    FixedPointNumber.fromRational(313035, 1000000), // 80%
    FixedPointNumber.fromRational(412191, 1000000), // 90%
    FixedPointNumber.fromRational(511976, 1000000) // 100%
  ],
  // when used_buffer_percent is 20%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(376267, 100000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(815202, 100000000), // 20%
    FixedPointNumber.fromRational(149288, 10000000), // 30%
    FixedPointNumber.fromRational(299546, 10000000), // 40%
    FixedPointNumber.fromRational(663214, 10000000), // 50%
    FixedPointNumber.fromRational(133503, 1000000), // 60%
    FixedPointNumber.fromRational(222025, 1000000), // 70%
    FixedPointNumber.fromRational(318797, 1000000), // 80%
    FixedPointNumber.fromRational(417955, 1000000), // 90%
    FixedPointNumber.fromRational(517741, 1000000) // 100%
  ],
  // when used_buffer_percent is 30%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(807626, 100000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(167679, 10000000), // 20%
    FixedPointNumber.fromRational(277809, 10000000), // 30%
    FixedPointNumber.fromRational(467319, 10000000), // 40%
    FixedPointNumber.fromRational(860304, 10000000), // 50%
    FixedPointNumber.fromRational(154595, 1000000), // 60%
    FixedPointNumber.fromRational(243507, 1000000), // 70%
    FixedPointNumber.fromRational(340357, 1000000), // 80%
    FixedPointNumber.fromRational(439528, 1000000), // 90%
    FixedPointNumber.fromRational(539315, 1000000) // 100%
  ],
  // when used_buffer_percent is 40%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(219503, 10000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(444770, 10000000), // 20%
    FixedPointNumber.fromRational(691029, 10000000), // 30%
    FixedPointNumber.fromRational(100646, 1000000), // 40%
    FixedPointNumber.fromRational(149348, 1000000), // 50%
    FixedPointNumber.fromRational(222388, 1000000), // 60%
    FixedPointNumber.fromRational(312586, 1000000), // 70%
    FixedPointNumber.fromRational(409701, 1000000), // 80%
    FixedPointNumber.fromRational(508916, 1000000), // 90%
    FixedPointNumber.fromRational(608707, 1000000) // 100%
  ],
  // when used_buffer_percent is 50%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(511974, 10000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(102871, 1000000), // 20%
    FixedPointNumber.fromRational(156110, 1000000), // 30%
    FixedPointNumber.fromRational(213989, 1000000), // 40%
    FixedPointNumber.fromRational(282343, 1000000), // 50%
    FixedPointNumber.fromRational(364989, 1000000), // 60%
    FixedPointNumber.fromRational(458110, 1000000), // 70%
    FixedPointNumber.fromRational(555871, 1000000), // 80%
    FixedPointNumber.fromRational(655197, 1000000), // 90%
    FixedPointNumber.fromRational(755000, 1000000) // 100%
  ],
  // when used_buffer_percent is 60%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(804354, 10000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(161193, 1000000), // 20%
    FixedPointNumber.fromRational(242816, 1000000), // 30%
    FixedPointNumber.fromRational(326520, 1000000), // 40%
    FixedPointNumber.fromRational(414156, 1000000), // 50%
    FixedPointNumber.fromRational(506779, 1000000), // 60%
    FixedPointNumber.fromRational(603334, 1000000), // 70%
    FixedPointNumber.fromRational(701969, 1000000), // 80%
    FixedPointNumber.fromRational(801470, 1000000), // 90%
    FixedPointNumber.fromRational(901293, 1000000) // 100%
  ],
  // when used_buffer_percent is 70%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(942895, 10000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(188758, 1000000), // 20%
    FixedPointNumber.fromRational(283590, 1000000), // 30%
    FixedPointNumber.fromRational(379083, 1000000), // 40%
    FixedPointNumber.fromRational(475573, 1000000), // 50%
    FixedPointNumber.fromRational(573220, 1000000), // 60%
    FixedPointNumber.fromRational(671864, 1000000), // 70%
    FixedPointNumber.fromRational(771169, 1000000), // 80%
    FixedPointNumber.fromRational(870838, 1000000), // 90%
    FixedPointNumber.fromRational(970685, 1000000) // 100%
  ],
  // when used_buffer_percent is 80%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(985811, 10000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(197241, 1000000), // 20%
    FixedPointNumber.fromRational(296017, 1000000), // 30%
    FixedPointNumber.fromRational(394949, 1000000), // 40%
    FixedPointNumber.fromRational(494073, 1000000), // 50%
    FixedPointNumber.fromRational(593401, 1000000), // 60%
    FixedPointNumber.fromRational(692920, 1000000), // 70%
    FixedPointNumber.fromRational(792596, 1000000), // 80%
    FixedPointNumber.fromRational(892388, 1000000), // 90%
    FixedPointNumber.fromRational(992259, 1000000) // 100%
  ],
  // when used_buffer_percent is 90%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.fromRational(997132, 10000000), // when demand_in_available_percent is 10%
    FixedPointNumber.fromRational(199444, 1000000), // 20%
    FixedPointNumber.fromRational(299194, 1000000), // 30%
    FixedPointNumber.fromRational(398965, 1000000), // 40%
    FixedPointNumber.fromRational(498757, 1000000), // 50%
    FixedPointNumber.fromRational(598570, 1000000), // 60%
    FixedPointNumber.fromRational(698404, 1000000), // 70%
    FixedPointNumber.fromRational(798259, 1000000), // 80%
    FixedPointNumber.fromRational(898132, 1000000), // 90%
    FixedPointNumber.fromRational(998024, 1000000) // 100%
  ],
  // when used_buffer_percent is 100%
  [
    FixedPointNumber.ZERO,
    FixedPointNumber.ONE, // when demand_in_available_percent is 10%
    FixedPointNumber.ONE, // 20%
    FixedPointNumber.ONE, // 30%
    FixedPointNumber.ONE, // 40%
    FixedPointNumber.ONE, // 50%
    FixedPointNumber.ONE, // 60%
    FixedPointNumber.ONE, // 70%
    FixedPointNumber.ONE, // 80%
    FixedPointNumber.ONE, // 90%
    FixedPointNumber.ONE // 100%
  ]
];

export function getFee (
  remainAvailablePercent: FixedPointNumber,
  availableAmount: FixedPointNumber,
  requestAmount: FixedPointNumber,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  baseFeeRate: FixedPointNumber
): FixedPointNumber | null {
  if (
    remainAvailablePercent.isZero() ||
    remainAvailablePercent.isGreaterThan(FixedPointNumber.ONE) ||
    requestAmount.isGreaterThan(availableAmount) ||
    requestAmount.isZero()
  ) {
    return null;
  }

  const usedBufferPrecent = FixedPointNumber.ONE.minus(remainAvailablePercent);
  const demandInAvailablePercent = FixedPointNumber.fromRational(requestAmount, availableAmount);
  const x = usedBufferPrecent.times(FixedPointNumber.TEN);
  const x0 = x.trunc().toNumber();
  const prefixX = x.frac();
  const y = demandInAvailablePercent.times(FixedPointNumber.TEN);
  let y0 = y.trunc().toNumber();
  let prefixY = y.frac();

  let multiplier = FeeRateMatrix[x0][y0];

  if (!(prefixX.isZero() && prefixY.isZero())) {
    if (y0 === 10) {
      y0 = y0 - 1;
      prefixY = prefixY.plus(FixedPointNumber.fromRational(10, 100));
    }

    const x0y0Rate = FeeRateMatrix[x0][y0];
    const x0y1Rate = FeeRateMatrix[x0][y0 + 1];
    const x1y0Rate = FeeRateMatrix[x0 + 1][y0];
    const x1y1Rate = FeeRateMatrix[x0 + 1][y0 + 1];

    const y0x = prefixX.times(x1y0Rate.minus(x0y0Rate)).plus(x0y0Rate);
    const y1x = prefixX.times(x1y1Rate.minus(x0y1Rate)).plus(x0y1Rate);

    multiplier = y1x.minus(y0x).times(prefixY).plus(y0x);
  }

  return multiplier.times(availableAmount);
}
