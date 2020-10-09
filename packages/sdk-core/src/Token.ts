import { FixedPointNumber } from './FixedPointNumber';

export abstract class Token extends FixedPointNumber {
  private name!: string;
  private shortName!: string;
  private longName!: string;
  
  constructor () {};
}
