import { Token } from './token';

export class TokenSet {
  private _list: Token[];

  constructor() {
    this._list = [];
  }

  public values(): Token[] {
    return this._list;
  }

  public add(target: Token): void {
    const isExist = !!this._list.find((item) => item.isEqual(target));

    if (!isExist) {
      this._list.push(target);
    }
  }

  public delete(target: Token): void {
    const index = this._list.findIndex((item) => item.isEqual(target));

    if (index !== -1) {
      this._list.splice(index, 1);
    }
  }

  public clear(): void {
    this._list = [];
  }
}
