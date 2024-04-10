export declare class DIDWeb3Name {
    private api;
    private cached;
    constructor();
    getName(address: string): Promise<string | undefined>;
    subscribeName(address: string): import("rxjs").Observable<Promise<string | undefined>>;
}
