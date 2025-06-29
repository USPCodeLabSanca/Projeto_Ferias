import type { ConstraintChecking } from '../deferrable';
import type { QueryRawOptions, Sequelize } from '../sequelize';
import { Transaction } from '../transaction';
import type { AbstractConnection } from './connection-manager.js';
import type { AbstractDialect } from './dialect.js';
import type { TableOrModel } from './query-generator.types.js';
import { AbstractQueryInterfaceInternal } from './query-interface-internal.js';
import type { TableNameWithSchema } from './query-interface.js';
import type { AddConstraintOptions, ColumnsDescription, CommitTransactionOptions, ConstraintDescription, CreateDatabaseOptions, CreateSavepointOptions, CreateSchemaOptions, DatabaseDescription, DeferConstraintsOptions, DescribeTableOptions, DropSchemaOptions, FetchDatabaseVersionOptions, ListDatabasesOptions, QiBulkDeleteOptions, QiDropAllSchemasOptions, QiDropAllTablesOptions, QiDropTableOptions, QiListSchemasOptions, QiListTablesOptions, QiTruncateTableOptions, RemoveColumnOptions, RemoveConstraintOptions, RenameTableOptions, RollbackSavepointOptions, RollbackTransactionOptions, SetIsolationLevelOptions, ShowConstraintsOptions, StartTransactionOptions } from './query-interface.types';
export type WithoutForeignKeyChecksCallback<T> = (connection: AbstractConnection) => Promise<T>;
/**
 * This is a temporary class used to progressively migrate the AbstractQueryInterface class to TypeScript by slowly moving its functions here.
 * Always use {@link AbstractQueryInterface} instead.
 */
export declare class AbstractQueryInterfaceTypeScript<Dialect extends AbstractDialect = AbstractDialect> {
    #private;
    readonly dialect: Dialect;
    /**
     * @param dialect The dialect instance.
     * @param internalQueryInterface The internal query interface to use.
     *                               Defaults to a new instance of {@link AbstractQueryInterfaceInternal}.
     *                               Your dialect may replace this with a custom implementation.
     */
    constructor(dialect: Dialect, internalQueryInterface?: AbstractQueryInterfaceInternal);
    get sequelize(): Sequelize<Dialect>;
    get queryGenerator(): Dialect['queryGenerator'];
    /**
     * Create a database
     *
     * @param database
     * @param options
     */
    createDatabase(database: string, options?: CreateDatabaseOptions): Promise<void>;
    /**
     * Drop a database
     *
     * @param database
     * @param options
     */
    dropDatabase(database: string, options?: QueryRawOptions): Promise<void>;
    /**
     * Lists all available databases
     *
     * @param options
     */
    listDatabases(options?: ListDatabasesOptions): Promise<DatabaseDescription[]>;
    /**
     * Returns the database version.
     *
     * @param options Query Options
     */
    fetchDatabaseVersion(options?: FetchDatabaseVersionOptions): Promise<string>;
    /**
     * Create a new database schema.
     *
     * **Note:** We define schemas as a namespace that can contain tables.
     * In mysql and mariadb, this command will create what they call a database.
     *
     * @param schema Name of the schema
     * @param options
     */
    createSchema(schema: string, options?: CreateSchemaOptions): Promise<void>;
    /**
     * Drop a single schema
     *
     * **Note:** We define schemas as a namespace that can contain tables.
     * In mysql and mariadb, this command will create what they call a database.
     *
     * @param schema Name of the schema
     * @param options
     */
    dropSchema(schema: string, options?: DropSchemaOptions): Promise<void>;
    /**
     * Drops all schemas
     *
     * @param options
     */
    dropAllSchemas(options?: QiDropAllSchemasOptions): Promise<void>;
    /**
     * List defined schemas
     *
     * **Note:** this is a schema in the [postgres sense of the word](http://www.postgresql.org/docs/9.1/static/ddl-schemas.html),
     * not a database table. In mysql and mariadb, this will show all databases.
     *
     * @param options
     *
     * @returns list of schemas
     */
    listSchemas(options?: QiListSchemasOptions): Promise<string[]>;
    /**
     * Show all defined schemas
     *
     * @deprecated Use {@link listSchemas} instead.
     * @param options
     */
    showAllSchemas(options?: QiListSchemasOptions): Promise<string[]>;
    /**
     * Drop a table from database
     *
     * @param tableName Table name to drop
     * @param options   Query options
     */
    dropTable(tableName: TableOrModel, options?: QiDropTableOptions): Promise<void>;
    /**
     * Drop all tables
     *
     * @param options
     */
    dropAllTables(options?: QiDropAllTablesOptions): Promise<void>;
    /**
     * List tables
     *
     * @param options
     */
    listTables(options?: QiListTablesOptions): Promise<TableNameWithSchema[]>;
    /**
     * Show all tables
     *
     * @deprecated Use {@link listTables} instead.
     * @param options
     */
    showAllTables(options?: QiListTablesOptions): Promise<TableNameWithSchema[]>;
    /**
     * Rename a table
     *
     * @param beforeTableName
     * @param afterTableName
     * @param options
     */
    renameTable(beforeTableName: TableOrModel, afterTableName: TableOrModel, options?: RenameTableOptions): Promise<void>;
    /**
     * Returns a promise that will resolve to true if the table or model exists in the database, false otherwise.
     *
     * @param tableName - The name of the table or model
     * @param options - Query options
     */
    tableExists(tableName: TableOrModel, options?: QueryRawOptions): Promise<boolean>;
    /**
     * Describe a table structure
     *
     * This method returns an array of hashes containing information about all attributes in the table.
     *
     * ```js
     * {
     *    name: {
     *      type:         'VARCHAR(255)', // this will be 'CHARACTER VARYING' for pg!
     *      allowNull:    true,
     *      defaultValue: null
     *    },
     *    isBetaMember: {
     *      type:         'TINYINT(1)', // this will be 'BOOLEAN' for pg!
     *      allowNull:    false,
     *      defaultValue: false
     *    }
     * }
     * ```
     *
     * @param tableName
     * @param options Query options
     */
    describeTable(tableName: TableOrModel, options?: DescribeTableOptions): Promise<ColumnsDescription>;
    /**
     * Truncates a table
     *
     * @param tableName
     * @param options
     */
    truncate(tableName: TableOrModel, options?: QiTruncateTableOptions): Promise<void>;
    /**
     * Removes a column from a table
     *
     * @param tableName
     * @param columnName
     * @param options
     */
    removeColumn(tableName: TableOrModel, columnName: string, options?: RemoveColumnOptions): Promise<void>;
    /**
     * Add a constraint to a table
     *
     * Available constraints:
     * - UNIQUE
     * - DEFAULT (MSSQL only)
     * - CHECK (Not supported by MySQL)
     * - FOREIGN KEY
     * - PRIMARY KEY
     *
     * @example UNIQUE
     * ```ts
     * queryInterface.addConstraint('Users', {
     *   fields: ['email'],
     *   type: 'UNIQUE',
     *   name: 'custom_unique_constraint_name'
     * });
     * ```
     *
     * @example CHECK
     * ```ts
     * queryInterface.addConstraint('Users', {
     *   fields: ['roles'],
     *   type: 'CHECK',
     *   where: {
     *      roles: ['user', 'admin', 'moderator', 'guest']
     *   }
     * });
     * ```
     *
     * @example Default - MSSQL only
     * ```ts
     * queryInterface.addConstraint('Users', {
     *    fields: ['roles'],
     *    type: 'DEFAULT',
     *    defaultValue: 'guest'
     * });
     * ```
     *
     * @example Primary Key
     * ```ts
     * queryInterface.addConstraint('Users', {
     *    fields: ['username'],
     *    type: 'PRIMARY KEY',
     *    name: 'custom_primary_constraint_name'
     * });
     * ```
     *
     * @example Composite Primary Key
     * ```ts
     * queryInterface.addConstraint('Users', {
     *    fields: ['first_name', 'last_name'],
     *    type: 'PRIMARY KEY',
     *    name: 'custom_primary_constraint_name'
     * });
     * ```
     *
     * @example Foreign Key
     * ```ts
     * queryInterface.addConstraint('Posts', {
     *   fields: ['username'],
     *   type: 'FOREIGN KEY',
     *   name: 'custom_fkey_constraint_name',
     *   references: { //Required field
     *     table: 'target_table_name',
     *     field: 'target_column_name'
     *   },
     *   onDelete: 'cascade',
     *   onUpdate: 'cascade'
     * });
     * ```
     *
     * @example Composite Foreign Key
     * ```ts
     * queryInterface.addConstraint('TableName', {
     *   fields: ['source_column_name', 'other_source_column_name'],
     *   type: 'FOREIGN KEY',
     *   name: 'custom_fkey_constraint_name',
     *   references: { //Required field
     *     table: 'target_table_name',
     *     fields: ['target_column_name', 'other_target_column_name']
     *   },
     *   onDelete: 'cascade',
     *   onUpdate: 'cascade'
     * });
     * ```
     *
     * @param tableName - Table name where you want to add a constraint
     * @param options - An object to define the constraint name, type etc
     */
    addConstraint(tableName: TableOrModel, options: AddConstraintOptions): Promise<void>;
    deferConstraints(constraintChecking: ConstraintChecking, options?: DeferConstraintsOptions): Promise<void>;
    /**
     * Remove a constraint from a table
     *
     * @param tableName -Table name to drop constraint from
     * @param constraintName -Constraint name
     * @param options -Query options
     */
    removeConstraint(tableName: TableOrModel, constraintName: string, options?: RemoveConstraintOptions): Promise<void>;
    showConstraints(tableName: TableOrModel, options?: ShowConstraintsOptions): Promise<ConstraintDescription[]>;
    /**
     * Returns all foreign key constraints of requested tables
     *
     * @deprecated Use {@link showConstraints} instead.
     * @param _tableNames
     * @param _options
     */
    getForeignKeysForTables(_tableNames: TableOrModel[], _options?: QueryRawOptions): Error;
    /**
     * Get foreign key references details for the table
     *
     * @deprecated Use {@link showConstraints} instead.
     * @param _tableName
     * @param _options
     */
    getForeignKeyReferencesForTable(_tableName: TableOrModel, _options?: QueryRawOptions): Error;
    /**
     * Disables foreign key checks for the duration of the callback.
     * The foreign key checks are only disabled for the current connection.
     * To specify the connection, you can either use the "connection" or the "transaction" option.
     * If you do not specify a connection, this method will reserve a connection for the duration of the callback,
     * and release it afterwards. You will receive the connection or transaction as the first argument of the callback.
     * You must use this connection to execute queries
     *
     * @example
     * ```ts
     * await this.queryInterface.withoutForeignKeyChecks(options, async connection => {
     *   const truncateOptions = { ...options, connection };
     *
     *   for (const model of models) {
     *     await model.truncate(truncateOptions);
     *   }
     * });
     * ```
     *
     * @param cb
     */
    withoutForeignKeyChecks<T>(cb: WithoutForeignKeyChecksCallback<T>): Promise<T>;
    withoutForeignKeyChecks<T>(options: QueryRawOptions, cb: WithoutForeignKeyChecksCallback<T>): Promise<T>;
    /**
     * Toggles foreign key checks.
     * Don't forget to turn them back on, use {@link withoutForeignKeyChecks} to do this automatically.
     *
     * @param enable
     * @param options
     */
    unsafeToggleForeignKeyChecks(enable: boolean, options?: QueryRawOptions): Promise<void>;
    /**
     * Commit an already started transaction.
     *
     * This is an internal method used by `sequelize.transaction()` use at your own risk.
     *
     * @param transaction
     * @param options
     */
    _commitTransaction(transaction: Transaction, options: CommitTransactionOptions): Promise<void>;
    /**
     * Create a new savepoint.
     *
     * This is an internal method used by `sequelize.transaction()` use at your own risk.
     *
     * @param transaction
     * @param options
     */
    _createSavepoint(transaction: Transaction, options: CreateSavepointOptions): Promise<void>;
    /**
     * Rollback to a savepoint.
     *
     * This is an internal method used by `sequelize.transaction()` use at your own risk.
     *
     * @param transaction
     * @param options
     */
    _rollbackSavepoint(transaction: Transaction, options: RollbackSavepointOptions): Promise<void>;
    /**
     * Rollback (revert) a transaction that hasn't been committed.
     *
     * This is an internal method used by `sequelize.transaction()` use at your own risk.
     *
     * @param transaction
     * @param options
     */
    _rollbackTransaction(transaction: Transaction, options: RollbackTransactionOptions): Promise<void>;
    /**
     * Set the isolation level of a transaction.
     *
     * This is an internal method used by `sequelize.transaction()` use at your own risk.
     *
     * @param transaction
     * @param options
     */
    _setIsolationLevel(transaction: Transaction, options: SetIsolationLevelOptions): Promise<void>;
    /**
     * Begin a new transaction.
     *
     * This is an internal method used by `sequelize.transaction()` use at your own risk.
     *
     * @param transaction
     * @param options
     */
    _startTransaction(transaction: Transaction, options: StartTransactionOptions): Promise<void>;
    /**
     * Deletes records from a table
     *
     * @param tableOrModel
     * @param options
     */
    bulkDelete(tableOrModel: TableOrModel, options?: QiBulkDeleteOptions): Promise<number>;
}
