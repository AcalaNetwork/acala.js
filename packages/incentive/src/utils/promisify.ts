import { Observable, firstValueFrom } from "rxjs";

export function promisify<T>(result: Promise<T> | Observable<T>): Promise<T> {

  return result instanceof Promise ? result : firstValueFrom(result);
}