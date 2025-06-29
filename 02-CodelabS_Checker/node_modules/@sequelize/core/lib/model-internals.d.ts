import type { IndexOptions } from './abstract-dialect/query-interface.js';
import type { WhereAttributeHash } from './abstract-dialect/where-sql-builder-types.js';
import type { Attributes, Filterable, Model, Transactionable } from './model';
import type { ModelDefinition } from './model-definition.js';
import type { Sequelize } from './sequelize';
export declare function _validateIncludedElements(options: any, tableNames?: any): any;
export declare function combineIncludes(a: any, b: any): any;
export declare function throwInvalidInclude(include: any): never;
export declare function setTransactionFromCls(options: Transactionable, sequelize: Sequelize): void;
export declare function conformIndex(index: IndexOptions): IndexOptions;
export declare function getPrimaryKeyValueOrThrow(instance: Model, attributeName: string): unknown;
/**
 * Returns a Where Object that can be used to uniquely select this instance, using the instance's primary keys.
 *
 * @param instance The instance for which the where options should be built.
 * @param checkVersion include version attribute in where hash
 * @param nullIfImpossible return null instead of throwing an error if the instance is missing its
 *   primary keys and therefore no Where object can be built.
 */
export declare function getModelPkWhere<M extends Model>(instance: M, checkVersion?: boolean, nullIfImpossible?: boolean): WhereAttributeHash<Attributes<M>> | null;
export declare function assertHasPrimaryKey(modelDefinition: ModelDefinition<any>): void;
export declare function assertHasWhereOptions(options: Filterable | undefined): void;
export declare function ensureOptionsAreImmutable<T extends object>(options: T): T;
