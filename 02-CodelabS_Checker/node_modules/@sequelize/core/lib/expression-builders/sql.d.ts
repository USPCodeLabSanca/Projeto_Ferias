import { BaseSqlExpression } from './base-sql-expression.js';
import { Literal } from './literal.js';
import { SqlUuidV1, SqlUuidV4 } from './uuid.js';
/**
 * The template tag function used to easily create {@link sql.literal}.
 *
 * @param rawSql
 * @param values
 * @example
 * ```ts
 * sql`SELECT * FROM ${sql.identifier(table)} WHERE ${sql.identifier(column)} = ${value}`
 * ```
 */
export declare function sql(rawSql: TemplateStringsArray, ...values: unknown[]): Literal;
export declare namespace sql {
    var attribute: typeof import("./attribute.js").attribute;
    var cast: typeof import("./cast.js").cast;
    var col: typeof import("./col.js").col;
    var fn: typeof import("./fn.js").fn;
    var identifier: typeof import("./identifier.js").identifier;
    var jsonPath: typeof import("./json-path.js").jsonPath;
    var list: typeof import("./list.js").list;
    var literal: typeof import("./literal.js").literal;
    var where: typeof import("./where.js").where;
    var uuidV4: SqlUuidV4;
    var uuidV1: SqlUuidV1;
    var unquote: (...args: unknown[]) => import("./dialect-aware-fn.js").DialectAwareFn;
    var join: typeof joinSql;
}
/**
 * A version of {@link Array#join}, but for SQL expressions.
 * Using {@link Array#join} directly would not work, because the end result would be a string, not a SQL expression.
 *
 * @param parts The parts to join. Each part can be a SQL expression, or a value to escape.
 * @param separator A raw SQL string, or a SQL expression to separate each pair of adjacent elements of the array.
 * @returns A SQL expression representing the concatenation of all parts, interspersed with the separator.
 */
declare function joinSql(parts: unknown[], separator: string | BaseSqlExpression): Literal;
export {};
