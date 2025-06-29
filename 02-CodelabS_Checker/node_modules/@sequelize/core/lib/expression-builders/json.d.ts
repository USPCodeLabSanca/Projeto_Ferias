import type { AssociationPath } from './association-path.js';
import type { Attribute } from './attribute.js';
import type { Cast } from './cast.js';
import type { DialectAwareFn } from './dialect-aware-fn.js';
import type { JsonPath } from './json-path.js';
import type { Where } from './where.js';
/**
 * Creates an object representing nested where conditions for postgres/sqlite/mysql json data-type.
 *
 * @param conditionsOrPath A hash containing strings/numbers or other nested hash, a string using dot notation or a string using postgres/sqlite/mysql json syntax.
 * @param value An optional value to compare against. Produces a string of the form "<json path> = '<value>'".
 *
 * @deprecated use {@link sql.where}, {@link sql.attribute}, and/or {@link sql.jsonPath} instead.
 */
export declare function json(conditionsOrPath: {
    [key: string]: any;
} | string, value?: string | number | boolean | null): Cast | JsonPath | AssociationPath | Attribute | DialectAwareFn | Where;
