import { Observable, firstValueFrom, isObservable } from 'rxjs';

export function toPromise<T>(a: Observable<T> | Promise<T>): Promise<T> {
  if (isObservable(a)) return firstValueFrom(a);

  return a;
}
