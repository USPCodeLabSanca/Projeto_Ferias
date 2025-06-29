interface DeferredOptions {
    errorMessage?: string;
}
export declare class Deferred<T> {
    protected _promise: Promise<T>;
    protected _resolve: (value: T) => void;
    protected _reject: (error: Error) => void;
    protected _timeout: NodeJS.Timer;
    private options;
    constructor(options?: DeferredOptions);
    registerTimeout(timeoutInMillis: number, callback: Function): void;
    protected _clearTimeout(): void;
    resolve(value: T): void;
    reject(error: Error): void;
    promise(): Promise<T>;
}
export {};
