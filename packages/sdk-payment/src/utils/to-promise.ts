import { Observable, isObservable, firstValueFrom } from 'rxjs';

export function toPromise <T extends unknown>(run: Promise<T> | Observable<T>): Promise<T> {
  if (isObservable(run)) {
    return firstValueFrom(run);
  }

  return run;
}