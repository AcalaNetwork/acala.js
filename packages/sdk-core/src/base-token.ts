export abstract class BaseToken {
  readonly decimal: number;

  constructor(decimal: number) {
    this.decimal = decimal;
  }

  public abstract isEqual(target: BaseToken): boolean;
  public abstract clone(): BaseToken;
}
