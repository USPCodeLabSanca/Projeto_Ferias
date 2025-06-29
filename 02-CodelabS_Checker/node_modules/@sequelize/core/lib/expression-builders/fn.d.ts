import type { Expression } from '../sequelize.js';
import { BaseSqlExpression, SQL_IDENTIFIER } from './base-sql-expression.js';
/**
 * Do not use me directly. Use {@link sql.fn}
 */
export declare class Fn extends BaseSqlExpression {
    protected readonly [SQL_IDENTIFIER]: 'fn';
    readonly fn: string;
    readonly args: readonly Expression[];
    constructor(fnName: string, args: Fn['args']);
}
/**
 * Creates an object representing a database function. This can be used in search queries, both in where and order parts, and as default values in column definitions.
 * If you want to refer to columns in your function, you should use {@link sql.attribute} (recommended), {@link sql.identifier}, or {@link sql.col} (discouraged)
 * otherwise the value will be interpreted as a string.
 *
 * ℹ️ This method is usually verbose and we recommend using the {@link sql} template string tag instead.
 *
 * @param fnName The SQL function you want to call
 * @param args All further arguments will be passed as arguments to the function
 *
 * @example Convert a user's username to upper case
 * ```ts
 * instance.update({
 *   username: fn('upper', col('username'))
 * });
 * ```
 */
export declare function fn(fnName: string, ...args: Fn['args']): Fn;
