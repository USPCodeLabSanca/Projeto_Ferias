import { Deferrable } from '../deferrable.js';
import type { AssociationPath } from '../expression-builders/association-path.js';
import type { Attribute } from '../expression-builders/attribute.js';
import type { Cast } from '../expression-builders/cast.js';
import type { Col } from '../expression-builders/col.js';
import type { DialectAwareFn } from '../expression-builders/dialect-aware-fn.js';
import type { Fn } from '../expression-builders/fn.js';
import type { JsonPath } from '../expression-builders/json-path.js';
import type { Literal } from '../expression-builders/literal.js';
import type { Sequelize } from '../sequelize.js';
import type { AbstractDialect } from './dialect.js';
import type { EscapeOptions } from './query-generator-typescript.js';
import type { AddLimitOffsetOptions } from './query-generator.internal-types.js';
import type { GetConstraintSnippetQueryOptions, TableOrModel } from './query-generator.types.js';
import { WhereSqlBuilder } from './where-sql-builder.js';
export declare class AbstractQueryGeneratorInternal<Dialect extends AbstractDialect = AbstractDialect> {
    readonly dialect: Dialect;
    readonly whereSqlBuilder: WhereSqlBuilder;
    get sequelize(): Sequelize;
    get queryGenerator(): Dialect['queryGenerator'];
    constructor(dialect: Dialect);
    getTechnicalDatabaseNames(): readonly string[];
    getTechnicalSchemaNames(): readonly string[];
    getConstraintSnippet(tableName: TableOrModel, options: GetConstraintSnippetQueryOptions): string;
    getDeferrableConstraintSnippet(deferrable: Deferrable): "DEFERRABLE INITIALLY DEFERRED" | "DEFERRABLE INITIALLY IMMEDIATE" | "NOT DEFERRABLE";
    formatAssociationPath(associationPath: AssociationPath): string;
    formatJsonPath(jsonPathVal: JsonPath, options?: EscapeOptions): string;
    formatLiteral(piece: Literal, options?: EscapeOptions): string;
    formatAttribute(piece: Attribute, options?: EscapeOptions): string;
    formatFn(piece: Fn, options?: EscapeOptions): string;
    formatDialectAwareFn(piece: DialectAwareFn, options?: EscapeOptions): string;
    formatCast(cast: Cast, options?: EscapeOptions): string;
    formatCol(piece: Col, options?: EscapeOptions): any;
    /**
     * Returns an SQL fragment for adding result constraints.
     *
     * @param _options
     */
    addLimitAndOffset(_options: AddLimitOffsetOptions): string;
}
