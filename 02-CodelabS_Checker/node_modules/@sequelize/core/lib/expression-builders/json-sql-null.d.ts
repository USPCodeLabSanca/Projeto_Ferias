import type { AbstractDialect } from '../abstract-dialect/dialect.js';
import { DialectAwareFn } from './dialect-aware-fn.js';
declare class JsonNullClass extends DialectAwareFn {
    get maxArgCount(): number;
    get minArgCount(): number;
    supportsDialect(): boolean;
    applyForDialect(dialect: AbstractDialect): string;
}
/**
 * null as a JSON value
 */
export declare const JSON_NULL: JsonNullClass;
/**
 * null as an SQL value
 */
export declare const SQL_NULL: import("./literal.js").Literal;
export {};
