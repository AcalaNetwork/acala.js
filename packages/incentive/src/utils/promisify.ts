import { Observable, firstValueFrom } from "rxjs";

export function promisify<T>(r: Promise<T> | Observable<T>): Promise<T> {
  return r instanceof Promise ? r : firstValueFrom(r);
}