import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { SwapResult } from '../../types';

interface ExpandPathNode {
  dexShareToken: Token;
  input: Token;
  output: Token;
}

interface ExpandPathNodeWithPosition extends ExpandPathNode {
  position: [FixedPointNumber, FixedPointNumber];
}

export type ExpandPath = ExpandPathNode[];

export type ExpandPathWithPositions = ExpandPathNodeWithPosition[];

export interface ExchangeFee {
  denominator: FixedPointNumber;
  numerator: FixedPointNumber;
}

export type MidResult = Omit<SwapResult, 'source' | 'type' | 'path'>;
