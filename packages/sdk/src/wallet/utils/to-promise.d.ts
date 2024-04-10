import { Observable } from 'rxjs';
export declare function toPromise<T>(a: Observable<T> | Promise<T>): Promise<T>;
