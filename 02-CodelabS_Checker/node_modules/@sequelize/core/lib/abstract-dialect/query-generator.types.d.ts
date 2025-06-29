import type { Deferrable } from '../deferrable';
import type { BaseSqlExpression } from '../expression-builders/base-sql-expression';
import type { Literal } from '../expression-builders/literal';
import type { Filterable, IndexHintable, ModelStatic, ReferentialAction } from '../model';
import type { ModelDefinition } from '../model-definition.js';
import type { TableHints } from '../table-hints';
import type { TransactionType } from '../transaction';
import type { AddLimitOffsetOptions } from './query-generator.internal-types.js';
import type { TableName } from './query-interface.js';
import type { ConstraintType } from './query-interface.types';
import type { WhereOptions } from './where-sql-builder-types';
export type TableOrModel = TableName | ModelStatic<any> | ModelDefinition<any>;
export interface CreateDatabaseQueryOptions {
    charset?: string;
    collate?: string;
    ctype?: string;
    encoding?: string;
    template?: string;
}
export interface ListDatabasesQueryOptions {
    skip?: string[];
}
export interface CreateSchemaQueryOptions {
    authorization?: string | Literal;
    charset?: string;
    collate?: string;
    comment?: string;
    ifNotExists?: boolean;
    replace?: boolean;
}
export interface DropSchemaQueryOptions {
    cascade?: boolean;
    ifExists?: boolean;
}
export interface ListSchemasQueryOptions {
    /** List of schemas to exclude from output */
    skip?: string[];
}
export interface DropTableQueryOptions {
    cascade?: boolean;
}
export interface ListTablesQueryOptions {
    schema?: string;
}
export interface RenameTableQueryOptions {
    changeSchema?: boolean;
}
export interface TruncateTableQueryOptions {
    cascade?: boolean;
    restartIdentity?: boolean;
}
export interface RemoveColumnQueryOptions {
    cascade?: boolean;
    ifExists?: boolean;
}
export interface BaseConstraintQueryOptions {
    name?: string;
    type: ConstraintType;
    fields: Array<string | BaseSqlExpression | {
        attribute?: string;
        name: string;
    }>;
}
export interface AddCheckConstraintQueryOptions extends BaseConstraintQueryOptions {
    type: 'CHECK';
    where?: WhereOptions<any>;
}
export interface AddDefaultConstraintQueryOptions extends BaseConstraintQueryOptions {
    type: 'DEFAULT';
    defaultValue?: unknown;
}
export interface AddUniqueConstraintQueryOptions extends BaseConstraintQueryOptions {
    type: 'UNIQUE';
    deferrable?: Deferrable;
}
export interface AddPrimaryKeyConstraintQueryOptions extends BaseConstraintQueryOptions {
    type: 'PRIMARY KEY';
    deferrable?: Deferrable;
}
export interface AddForeignKeyConstraintQueryOptions extends BaseConstraintQueryOptions {
    type: 'FOREIGN KEY';
    references: {
        table: TableOrModel;
        field?: string;
        fields: string[];
    } | {
        table: TableOrModel;
        field: string;
        fields?: string[];
    };
    onDelete?: ReferentialAction;
    onUpdate?: ReferentialAction;
    deferrable?: Deferrable;
}
export type AddConstraintQueryOptions = AddCheckConstraintQueryOptions | AddUniqueConstraintQueryOptions | AddDefaultConstraintQueryOptions | AddPrimaryKeyConstraintQueryOptions | AddForeignKeyConstraintQueryOptions;
export interface GetConstraintSnippetQueryOptions {
    name?: string;
    type: ConstraintType;
    fields: Array<string | BaseSqlExpression | {
        /**
         * @deprecated use `name` instead
         */
        attribute?: string;
        name: string;
    }>;
    where?: WhereOptions<any>;
    defaultValue?: unknown;
    references?: {
        table: TableOrModel;
        field?: string;
        fields: string[];
    } | {
        table: TableOrModel;
        field: string;
        fields?: string[];
    };
    onDelete?: ReferentialAction;
    onUpdate?: ReferentialAction;
    deferrable?: Deferrable;
}
export interface RemoveConstraintQueryOptions {
    ifExists?: boolean;
    cascade?: boolean;
}
export interface ShowConstraintsQueryOptions {
    columnName?: string;
    constraintName?: string;
    constraintType?: ConstraintType;
}
export interface StartTransactionQueryOptions {
    readOnly?: boolean;
    transactionName?: string;
    transactionType?: TransactionType | undefined;
}
export interface QuoteTableOptions extends IndexHintable {
    alias: boolean | string;
    tableHints?: TableHints[] | undefined;
}
export interface BulkDeleteQueryOptions<TAttributes = any> extends AddLimitOffsetOptions, Filterable<TAttributes> {
}
export interface RemoveIndexQueryOptions {
    concurrently?: boolean;
    ifExists?: boolean;
    cascade?: boolean;
}
