import { BaseToken } from './base-token';
import { Token } from './token';

export class TokenSet<T extends BaseToken = Token> {
  private _list: T[];

  constructor() {
    this._list = [];
  }

  get values(): T[] {
    return this._list;
  }

  public add(target: T): void {
    const isExist = !!this._list.find((item) => item.isEqual(target));

    if (!isExist) {
      this._list.push(target);
    }
  }

  public delete(target: T): void {
    const index = this._list.findIndex((item) => item.isEqual(target));

    if (index !== -1) {
      this._list.splice(index, 1);
    }
  }

  public clear(): void {
    this._list = [];
  }
}
