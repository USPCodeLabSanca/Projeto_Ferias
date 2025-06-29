import type { AbstractDialect } from '../abstract-dialect/dialect.js';
/**
 * Some dialects emit an Error with a string code, that are not ErrnoException.
 * This serves as a more generic check for those cases.
 *
 * @param val The value to check
 */
export declare function isErrorWithStringCode(val: unknown): val is Error & {
    code: string;
};
export declare function isDevEnv(): boolean;
/**
 * For use in per-dialect implementation of methods to warn the user when they use an option that TypeScript declares as valid,
 * but that the dialect they use does not support.
 *
 * @param methodName The name of the method that received the options
 * @param dialect The dialect to which the implementation belongs
 * @param allSupportableOptions All options that this method *can* support. The ones that are declared in TypeScript typings.
 * @param supportedOptions The subset of options that this dialect *actually does* support.
 * @param receivedOptions The user provided options passed to the method.
 */
export declare function rejectInvalidOptions<T extends string>(methodName: string, dialect: AbstractDialect, allSupportableOptions: Set<T>, supportedOptions: Iterable<T> | Partial<Record<T, boolean>>, receivedOptions: object): void;
export declare function buildInvalidOptionReceivedError(methodName: string, dialectName: string, invalidOptions: string[]): Error;
