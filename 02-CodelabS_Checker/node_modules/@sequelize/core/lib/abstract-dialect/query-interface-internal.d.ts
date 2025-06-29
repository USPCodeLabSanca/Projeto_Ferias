import type { QueryRawOptions } from '../sequelize.js';
import type { AbstractDialect } from './dialect.js';
import type { FetchDatabaseVersionOptions } from './query-interface.types.js';
/**
 * The methods in this class are not part of the public API.
 */
export declare class AbstractQueryInterfaceInternal {
    #private;
    constructor(dialect: AbstractDialect);
    fetchDatabaseVersionRaw<T extends object>(options?: FetchDatabaseVersionOptions): Promise<T>;
    executeQueriesSequentially(queries: string[], options?: QueryRawOptions): Promise<unknown>;
}
