import { ChainType } from '../types';

export function getChainType(type: string): ChainType {
  const tests = new Map([
    [/dev/i, ChainType.MANDALA],
    [/mandala/i, ChainType.MANDALA],
    [/acala/i, ChainType.ACALA],
    [/karura/i, ChainType.KARURA]
  ]);

  for (const [test, chainTyep] of tests.entries()) {
    if (test.test(type)) return chainTyep;
  }

  return ChainType.MANDALA;
}
