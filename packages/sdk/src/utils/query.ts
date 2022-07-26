import { firstValueFrom, isObservable, Observable } from 'rxjs';

// convert query with rxjs to promise
export function toPromiseQuery<T>(query: Observable<T> | Promise<T>) {
  if (isObservable(query)) return firstValueFrom(query);

  return query;
}
