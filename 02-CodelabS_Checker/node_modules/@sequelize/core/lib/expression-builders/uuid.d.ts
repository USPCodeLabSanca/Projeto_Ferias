import type { AbstractDialect } from '../abstract-dialect/dialect.js';
import { DialectAwareFn } from './dialect-aware-fn.js';
export declare class SqlUuidV4 extends DialectAwareFn {
    get maxArgCount(): number;
    get minArgCount(): number;
    supportsJavaScript(): boolean;
    applyForJavaScript(): unknown;
    supportsDialect(dialect: AbstractDialect): boolean;
    applyForDialect(dialect: AbstractDialect): string;
}
export declare class SqlUuidV1 extends DialectAwareFn {
    get maxArgCount(): number;
    get minArgCount(): number;
    supportsJavaScript(): boolean;
    applyForJavaScript(): unknown;
    supportsDialect(dialect: AbstractDialect): boolean;
    applyForDialect(dialect: AbstractDialect): string;
}
