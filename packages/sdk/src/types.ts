import { Observable } from 'rxjs';

export interface BaseSDK {
  get isReady(): Observable<boolean>;
}
