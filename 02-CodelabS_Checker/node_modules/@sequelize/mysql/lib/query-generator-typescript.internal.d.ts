import type { Expression, ListSchemasQueryOptions, ListTablesQueryOptions, RemoveIndexQueryOptions, ShowConstraintsQueryOptions, TableOrModel, TruncateTableQueryOptions } from '@sequelize/core';
import { AbstractQueryGenerator } from '@sequelize/core';
import type { EscapeOptions } from '@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/query-generator-typescript.js';
import type { MySqlDialect } from './dialect.js';
import { MySqlQueryGeneratorInternal } from './query-generator.internal.js';
/**
 * Temporary class to ease the TypeScript migration
 */
export declare class MySqlQueryGeneratorTypeScript extends AbstractQueryGenerator {
    #private;
    constructor(dialect: MySqlDialect, internals?: MySqlQueryGeneratorInternal);
    listSchemasQuery(options?: ListSchemasQueryOptions): string;
    describeTableQuery(tableName: TableOrModel): string;
    listTablesQuery(options?: ListTablesQueryOptions): string;
    truncateTableQuery(tableName: TableOrModel, options?: TruncateTableQueryOptions): string;
    showConstraintsQuery(tableName: TableOrModel, options?: ShowConstraintsQueryOptions): string;
    showIndexesQuery(tableName: TableOrModel): string;
    getToggleForeignKeyChecksQuery(enable: boolean): string;
    removeIndexQuery(tableName: TableOrModel, indexNameOrAttributes: string | string[], options?: RemoveIndexQueryOptions): string;
    jsonPathExtractionQuery(sqlExpression: string, path: ReadonlyArray<number | string>, unquote: boolean): string;
    formatUnquoteJson(arg: Expression, options?: EscapeOptions): string;
    versionQuery(): string;
    getUuidV1FunctionCall(): string;
}
