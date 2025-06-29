import type { AllowArray } from '@sequelize/utils';
export type AsyncHookReturn = Promise<void> | void;
type HookParameters<Hook> = Hook extends (...args2: any) => any ? Parameters<Hook> : never;
type OnRunHook<HookConfig extends {}> = <HookName extends keyof HookConfig>(eventTarget: object, isAsync: boolean, hookName: HookName, args: HookParameters<HookConfig[HookName]>) => AsyncHookReturn;
/**
 * @private
 */
export declare class HookHandler<HookConfig extends {}> {
    #private;
    constructor(eventTarget: object, validHookNames: Array<keyof HookConfig>, onRunHook?: OnRunHook<HookConfig>);
    removeListener<HookName extends keyof HookConfig>(hookName: HookName, listenerOrListenerName: string | HookConfig[HookName]): void;
    removeAllListeners(): void;
    hasListeners(hookName: keyof HookConfig): boolean;
    getListenerCount(hookName: keyof HookConfig): number;
    runSync<HookName extends keyof HookConfig>(hookName: HookName, ...args: HookConfig[HookName] extends (...args2: any) => any ? Parameters<HookConfig[HookName]> : never): void;
    runAsync<HookName extends keyof HookConfig>(hookName: HookName, ...args: HookConfig[HookName] extends (...args2: any) => any ? Parameters<HookConfig[HookName]> : never): Promise<void>;
    /**
     * Registers a listener for a hook.
     *
     * Returns a function that can be called to deregister the listener.
     *
     * @param hookName
     * @param listener
     * @param listenerName
     */
    addListener<HookName extends keyof HookConfig>(hookName: HookName, listener: HookConfig[HookName], listenerName?: string): () => void;
    addListeners(listeners: {
        [Key in keyof HookConfig]?: AllowArray<HookConfig[Key] | {
            name: string | symbol;
            callback: HookConfig[Key];
        }>;
    }): void;
}
export declare class HookHandlerBuilder<HookConfig extends {}> {
    #private;
    constructor(validHookNames: Array<keyof HookConfig>, onRunHook?: OnRunHook<HookConfig>);
    getFor(target: object): HookHandler<HookConfig>;
}
export interface NewHookable<HookNames extends string> {
    /**
     * Controls which hooks should be run.
     *
     * Possible values:
     * - false: All hooks will be run. (default)
     * - true: No hooks will be run.
     * - An array of strings: The hooks listed in the array will not be run.
     * - An object with the "except" property: Only the hooks listed in the array will be run.
     */
    noHooks?: boolean | undefined | readonly HookNames[] | {
        except: readonly HookNames[];
    };
}
export declare function mayRunHook<HookName extends string>(hookName: HookName, noHooksConfig: NewHookable<HookName>['noHooks']): boolean;
export {};
