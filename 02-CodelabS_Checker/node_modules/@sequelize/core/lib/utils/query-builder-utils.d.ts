import type { AbstractDialect } from '../abstract-dialect/dialect.js';
/**
 * Determine if the default value provided exists and can be described
 * in a db schema using the DEFAULT directive.
 *
 * @param value Any default value.
 * @param dialect
 * @private
 */
export declare function defaultValueSchemable(value: unknown, dialect: AbstractDialect): boolean;
/**
 * Returns true if a where clause is empty, even with Symbols
 *
 * @param obj
 */
export declare function isWhereEmpty(obj: object): boolean;
