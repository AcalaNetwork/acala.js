import { BaseToken } from './base-token';

export class TokenSet {
  private _list: BaseToken[];

  constructor() {
    this._list = [];
  }

  get values(): BaseToken[] {
    return this._list;
  }

  public add(target: BaseToken): void {
    const isExist = !!this._list.find((item) => item.isEqual(target));

    if (!isExist) {
      this._list.push(target);
    }
  }

  public delete(target: BaseToken): void {
    const index = this._list.findIndex((item) => item.isEqual(target));

    if (index !== -1) {
      this._list.splice(index, 1);
    }
  }

  public clear(): void {
    this._list = [];
  }
}
