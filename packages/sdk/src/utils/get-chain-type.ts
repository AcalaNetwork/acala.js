import { ChainType } from '../types';

export function getChainType(type: string): ChainType | undefined {
  const tests = new Map([
    [/acala/i, ChainType.ACALA],
    [/karura/i, ChainType.KARURA],
    [/mandala/i, ChainType.MANDALA],
    [/^dev$/i, ChainType.MANDALA]
  ]);

  for (const [test, chainTyep] of tests.entries()) {
    if (test.test(type)) return chainTyep;
  }

  return undefined;
}
