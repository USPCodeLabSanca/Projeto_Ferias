"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var query_interface_typescript_exports = {};
__export(query_interface_typescript_exports, {
  AbstractQueryInterfaceTypeScript: () => AbstractQueryInterfaceTypeScript
});
module.exports = __toCommonJS(query_interface_typescript_exports);
var import_utils = require("@sequelize/utils");
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_node_assert = __toESM(require("node:assert"));
var import_deferrable = require("../deferrable");
var import_errors = require("../errors");
var import_model_internals = require("../model-internals.js");
var import_query_types = require("../query-types");
var import_transaction = require("../transaction");
var import_check = require("../utils/check.js");
var import_deprecations = require("../utils/deprecations");
var import_query_interface_internal = require("./query-interface-internal.js");
class AbstractQueryInterfaceTypeScript {
  dialect;
  #internalQueryInterface;
  /**
   * @param dialect The dialect instance.
   * @param internalQueryInterface The internal query interface to use.
   *                               Defaults to a new instance of {@link AbstractQueryInterfaceInternal}.
   *                               Your dialect may replace this with a custom implementation.
   */
  constructor(dialect, internalQueryInterface) {
    this.dialect = dialect;
    this.#internalQueryInterface = internalQueryInterface ?? new import_query_interface_internal.AbstractQueryInterfaceInternal(dialect);
  }
  get sequelize() {
    return this.dialect.sequelize;
  }
  get queryGenerator() {
    return this.dialect.queryGenerator;
  }
  /**
   * Create a database
   *
   * @param database
   * @param options
   */
  async createDatabase(database, options) {
    const sql = this.queryGenerator.createDatabaseQuery(database, options);
    await this.sequelize.queryRaw(sql, options);
  }
  /**
   * Drop a database
   *
   * @param database
   * @param options
   */
  async dropDatabase(database, options) {
    const sql = this.queryGenerator.dropDatabaseQuery(database);
    await this.sequelize.queryRaw(sql, options);
  }
  /**
   * Lists all available databases
   *
   * @param options
   */
  async listDatabases(options) {
    const sql = this.queryGenerator.listDatabasesQuery(options);
    return this.sequelize.queryRaw(sql, {
      ...options,
      type: import_query_types.QueryTypes.SELECT
    });
  }
  /**
   * Returns the database version.
   *
   * @param options Query Options
   */
  async fetchDatabaseVersion(options) {
    const payload = await this.#internalQueryInterface.fetchDatabaseVersionRaw(
      options
    );
    (0, import_node_assert.default)(
      payload.version != null,
      "Expected the version query to produce an object that includes a `version` property."
    );
    return payload.version;
  }
  /**
   * Create a new database schema.
   *
   * **Note:** We define schemas as a namespace that can contain tables.
   * In mysql and mariadb, this command will create what they call a database.
   *
   * @param schema Name of the schema
   * @param options
   */
  async createSchema(schema, options) {
    const sql = this.queryGenerator.createSchemaQuery(schema, options);
    await this.sequelize.queryRaw(sql, options);
  }
  /**
   * Drop a single schema
   *
   * **Note:** We define schemas as a namespace that can contain tables.
   * In mysql and mariadb, this command will create what they call a database.
   *
   * @param schema Name of the schema
   * @param options
   */
  async dropSchema(schema, options) {
    const sql = this.queryGenerator.dropSchemaQuery(schema, options);
    await this.sequelize.queryRaw(sql, options);
  }
  /**
   * Drops all schemas
   *
   * @param options
   */
  async dropAllSchemas(options) {
    const skip = options?.skip || [];
    const allSchemas = await this.listSchemas(options);
    const schemaNames = allSchemas.filter((schemaName) => !skip.includes(schemaName));
    const dropOptions = { ...options };
    if (dropOptions.cascade === void 0) {
      if (this.sequelize.dialect.supports.dropSchema.cascade) {
        dropOptions.cascade = true;
      } else {
        for (const schema of schemaNames) {
          await this.dropAllTables({ ...dropOptions, schema });
        }
      }
    }
    for (const schema of schemaNames) {
      await this.dropSchema(schema, dropOptions);
    }
  }
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
  async listSchemas(options) {
    const showSchemasSql = this.queryGenerator.listSchemasQuery(options);
    const schemaNames = await this.sequelize.queryRaw(showSchemasSql, {
      ...options,
      raw: true,
      type: import_query_types.QueryTypes.SELECT
    });
    return schemaNames.map((schemaName) => schemaName.schema);
  }
  /**
   * Show all defined schemas
   *
   * @deprecated Use {@link listSchemas} instead.
   * @param options
   */
  async showAllSchemas(options) {
    (0, import_deprecations.showAllToListSchemas)();
    return this.listSchemas(options);
  }
  /**
   * Drop a table from database
   *
   * @param tableName Table name to drop
   * @param options   Query options
   */
  async dropTable(tableName, options) {
    const sql = this.queryGenerator.dropTableQuery(tableName, options);
    await this.sequelize.queryRaw(sql, options);
  }
  /**
   * Drop all tables
   *
   * @param options
   */
  async dropAllTables(options) {
    const skip = options?.skip || [];
    const allTables = await this.listTables(options);
    const tableNames = allTables.filter((tableName) => !skip.includes(tableName.tableName));
    const dropOptions = { ...options };
    if (this.sequelize.dialect.supports.dropTable.cascade && dropOptions.cascade === void 0) {
      dropOptions.cascade = true;
    }
    for (const tableName of tableNames) {
      const foreignKeys = await this.showConstraints(tableName, {
        ...options,
        constraintType: "FOREIGN KEY"
      });
      await Promise.all(
        foreignKeys.map(async (fk) => this.removeConstraint(tableName, fk.constraintName, options))
      );
    }
    for (const tableName of tableNames) {
      await this.dropTable(tableName, dropOptions);
    }
  }
  /**
   * List tables
   *
   * @param options
   */
  async listTables(options) {
    const sql = this.queryGenerator.listTablesQuery(options);
    return this.sequelize.queryRaw(sql, {
      ...options,
      raw: true,
      type: import_query_types.QueryTypes.SELECT
    });
  }
  /**
   * Show all tables
   *
   * @deprecated Use {@link listTables} instead.
   * @param options
   */
  async showAllTables(options) {
    (0, import_deprecations.showAllToListTables)();
    return this.listTables(options);
  }
  /**
   * Rename a table
   *
   * @param beforeTableName
   * @param afterTableName
   * @param options
   */
  async renameTable(beforeTableName, afterTableName, options) {
    const sql = this.queryGenerator.renameTableQuery(beforeTableName, afterTableName, options);
    await this.sequelize.queryRaw(sql, options);
  }
  /**
   * Returns a promise that will resolve to true if the table or model exists in the database, false otherwise.
   *
   * @param tableName - The name of the table or model
   * @param options - Query options
   */
  async tableExists(tableName, options) {
    const sql = this.queryGenerator.tableExistsQuery(tableName);
    const out = await this.sequelize.query(sql, { ...options, type: import_query_types.QueryTypes.SELECT });
    return out.length === 1;
  }
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
  async describeTable(tableName, options) {
    const table = this.queryGenerator.extractTableDetails(tableName);
    if (typeof options === "string") {
      (0, import_deprecations.noSchemaParameter)();
      table.schema = options;
    }
    if (typeof options === "object" && options !== null) {
      if (options.schema) {
        (0, import_deprecations.noSchemaParameter)();
        table.schema = options.schema;
      }
      if (options.schemaDelimiter) {
        (0, import_deprecations.noSchemaDelimiterParameter)();
        table.delimiter = options.schemaDelimiter;
      }
    }
    const sql = this.queryGenerator.describeTableQuery(table);
    const queryOptions = {
      ...options,
      type: import_query_types.QueryTypes.DESCRIBE
    };
    try {
      const data = await this.sequelize.queryRaw(sql, queryOptions);
      if ((0, import_isEmpty.default)(data)) {
        throw new Error(
          `No description found for table ${table.tableName}${table.schema ? ` in schema ${table.schema}` : ""}. Check the table name and schema; remember, they _are_ case sensitive.`
        );
      }
      return data;
    } catch (error) {
      if (error instanceof import_errors.BaseError && (0, import_check.isErrorWithStringCode)(error.cause) && error.cause.code === "ER_NO_SUCH_TABLE") {
        throw new Error(
          `No description found for table ${table.tableName}${table.schema ? ` in schema ${table.schema}` : ""}. Check the table name and schema; remember, they _are_ case sensitive.`
        );
      }
      throw error;
    }
  }
  /**
   * Truncates a table
   *
   * @param tableName
   * @param options
   */
  async truncate(tableName, options) {
    const sql = this.queryGenerator.truncateTableQuery(tableName, options);
    const queryOptions = { ...options, raw: true, type: import_query_types.QueryTypes.RAW };
    if (Array.isArray(sql)) {
      await this.#internalQueryInterface.executeQueriesSequentially(sql, queryOptions);
    } else {
      await this.sequelize.queryRaw(sql, queryOptions);
    }
  }
  /**
   * Removes a column from a table
   *
   * @param tableName
   * @param columnName
   * @param options
   */
  async removeColumn(tableName, columnName, options) {
    const queryOptions = { ...options, raw: true };
    const sql = this.queryGenerator.removeColumnQuery(tableName, columnName, queryOptions);
    await this.sequelize.queryRaw(sql, queryOptions);
  }
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
  async addConstraint(tableName, options) {
    if (!options.fields) {
      throw new Error("Fields must be specified through options.fields");
    }
    if (!options.type) {
      throw new Error("Constraint type must be specified through options.type");
    }
    const sql = this.queryGenerator.addConstraintQuery(tableName, options);
    await this.sequelize.queryRaw(sql, { ...options, raw: true, type: import_query_types.QueryTypes.RAW });
  }
  async deferConstraints(constraintChecking, options) {
    (0, import_model_internals.setTransactionFromCls)(options ?? {}, this.sequelize);
    if (!options?.transaction) {
      throw new Error("Missing transaction in deferConstraints option.");
    }
    const sql = this.queryGenerator.setConstraintCheckingQuery(constraintChecking);
    await this.sequelize.queryRaw(sql, { ...options, raw: true, type: import_query_types.QueryTypes.RAW });
  }
  /**
   * Remove a constraint from a table
   *
   * @param tableName -Table name to drop constraint from
   * @param constraintName -Constraint name
   * @param options -Query options
   */
  async removeConstraint(tableName, constraintName, options) {
    const sql = this.queryGenerator.removeConstraintQuery(tableName, constraintName, options);
    await this.sequelize.queryRaw(sql, { ...options, raw: true, type: import_query_types.QueryTypes.RAW });
  }
  async showConstraints(tableName, options) {
    const sql = this.queryGenerator.showConstraintsQuery(tableName, options);
    const rawConstraints = await this.sequelize.queryRaw(sql, {
      ...options,
      raw: true,
      type: import_query_types.QueryTypes.SHOWCONSTRAINTS
    });
    const constraintMap = /* @__PURE__ */ new Map();
    for (const {
      columnNames,
      definition,
      deleteAction,
      initiallyDeferred,
      isDeferrable,
      referencedColumnNames,
      referencedTableName,
      referencedTableSchema,
      updateAction,
      ...rawConstraint
    } of rawConstraints) {
      const constraint = constraintMap.get(rawConstraint.constraintName);
      if (constraint) {
        if (columnNames) {
          constraint.columnNames = constraint.columnNames ? [.../* @__PURE__ */ new Set([...constraint.columnNames, columnNames])] : [columnNames];
        }
        if (referencedColumnNames) {
          constraint.referencedColumnNames = constraint.referencedColumnNames ? [.../* @__PURE__ */ new Set([...constraint.referencedColumnNames, referencedColumnNames])] : [referencedColumnNames];
        }
      } else {
        const constraintData = { ...rawConstraint };
        if (columnNames) {
          constraintData.columnNames = [columnNames];
        }
        if (referencedTableSchema) {
          constraintData.referencedTableSchema = referencedTableSchema;
        }
        if (referencedTableName) {
          constraintData.referencedTableName = referencedTableName;
        }
        if (referencedColumnNames) {
          constraintData.referencedColumnNames = [referencedColumnNames];
        }
        if (deleteAction) {
          constraintData.deleteAction = deleteAction.replaceAll("_", " ");
        }
        if (updateAction) {
          constraintData.updateAction = updateAction.replaceAll("_", " ");
        }
        if (definition) {
          constraintData.definition = definition;
        }
        if (this.sequelize.dialect.supports.constraints.deferrable) {
          constraintData.deferrable = isDeferrable ? initiallyDeferred === "YES" ? import_deferrable.Deferrable.INITIALLY_DEFERRED : import_deferrable.Deferrable.INITIALLY_IMMEDIATE : import_deferrable.Deferrable.NOT;
        }
        constraintMap.set(rawConstraint.constraintName, constraintData);
      }
    }
    return [...constraintMap.values()];
  }
  /**
   * Returns all foreign key constraints of requested tables
   *
   * @deprecated Use {@link showConstraints} instead.
   * @param _tableNames
   * @param _options
   */
  getForeignKeysForTables(_tableNames, _options) {
    throw new Error(`getForeignKeysForTables has been deprecated. Use showConstraints instead.`);
  }
  /**
   * Get foreign key references details for the table
   *
   * @deprecated Use {@link showConstraints} instead.
   * @param _tableName
   * @param _options
   */
  getForeignKeyReferencesForTable(_tableName, _options) {
    throw new Error(
      `getForeignKeyReferencesForTable has been deprecated. Use showConstraints instead.`
    );
  }
  async withoutForeignKeyChecks(optionsOrCallback, maybeCallback) {
    let options;
    let callback;
    if (typeof optionsOrCallback === "function") {
      options = {};
      callback = optionsOrCallback;
    } else {
      options = { ...optionsOrCallback };
      callback = maybeCallback;
    }
    (0, import_model_internals.setTransactionFromCls)(options, this.sequelize);
    if (options.connection) {
      return this.#withoutForeignKeyChecks(options, callback);
    }
    return this.sequelize.withConnection(async (connection) => {
      return this.#withoutForeignKeyChecks({ ...options, connection }, callback);
    });
  }
  async #withoutForeignKeyChecks(options, cb) {
    try {
      await this.unsafeToggleForeignKeyChecks(false, options);
      import_utils.isNotNullish.assert(options.connection, "options.connection must be provided");
      return await cb(options.connection);
    } finally {
      await this.unsafeToggleForeignKeyChecks(true, options);
    }
  }
  /**
   * Toggles foreign key checks.
   * Don't forget to turn them back on, use {@link withoutForeignKeyChecks} to do this automatically.
   *
   * @param enable
   * @param options
   */
  async unsafeToggleForeignKeyChecks(enable, options) {
    await this.sequelize.queryRaw(
      this.queryGenerator.getToggleForeignKeyChecksQuery(enable),
      options
    );
  }
  /**
   * Commit an already started transaction.
   *
   * This is an internal method used by `sequelize.transaction()` use at your own risk.
   *
   * @param transaction
   * @param options
   */
  async _commitTransaction(transaction, options) {
    if (!transaction || !(transaction instanceof import_transaction.Transaction)) {
      throw new Error("Unable to commit a transaction without the transaction object.");
    }
    const sql = this.queryGenerator.commitTransactionQuery();
    await this.sequelize.queryRaw(sql, {
      ...options,
      transaction,
      supportsSearchPath: false,
      [import_transaction.COMPLETES_TRANSACTION]: true
    });
  }
  /**
   * Create a new savepoint.
   *
   * This is an internal method used by `sequelize.transaction()` use at your own risk.
   *
   * @param transaction
   * @param options
   */
  async _createSavepoint(transaction, options) {
    if (!this.queryGenerator.dialect.supports.savepoints) {
      throw new Error(`Savepoints are not supported by ${this.sequelize.dialect.name}.`);
    }
    if (!transaction || !(transaction instanceof import_transaction.Transaction)) {
      throw new Error("Unable to create a savepoint without the transaction object.");
    }
    const sql = this.queryGenerator.createSavepointQuery(options.savepointName);
    await this.sequelize.queryRaw(sql, { ...options, transaction, supportsSearchPath: false });
  }
  /**
   * Rollback to a savepoint.
   *
   * This is an internal method used by `sequelize.transaction()` use at your own risk.
   *
   * @param transaction
   * @param options
   */
  async _rollbackSavepoint(transaction, options) {
    if (!this.queryGenerator.dialect.supports.savepoints) {
      throw new Error(`Savepoints are not supported by ${this.sequelize.dialect.name}.`);
    }
    if (!transaction || !(transaction instanceof import_transaction.Transaction)) {
      throw new Error("Unable to rollback a savepoint without the transaction object.");
    }
    const sql = this.queryGenerator.rollbackSavepointQuery(options.savepointName);
    await this.sequelize.queryRaw(sql, {
      ...options,
      transaction,
      supportsSearchPath: false,
      [import_transaction.COMPLETES_TRANSACTION]: true
    });
  }
  /**
   * Rollback (revert) a transaction that hasn't been committed.
   *
   * This is an internal method used by `sequelize.transaction()` use at your own risk.
   *
   * @param transaction
   * @param options
   */
  async _rollbackTransaction(transaction, options) {
    if (!transaction || !(transaction instanceof import_transaction.Transaction)) {
      throw new Error("Unable to rollback a transaction without the transaction object.");
    }
    const sql = this.queryGenerator.rollbackTransactionQuery();
    await this.sequelize.queryRaw(sql, {
      ...options,
      transaction,
      supportsSearchPath: false,
      [import_transaction.COMPLETES_TRANSACTION]: true
    });
  }
  /**
   * Set the isolation level of a transaction.
   *
   * This is an internal method used by `sequelize.transaction()` use at your own risk.
   *
   * @param transaction
   * @param options
   */
  async _setIsolationLevel(transaction, options) {
    if (!this.queryGenerator.dialect.supports.settingIsolationLevelDuringTransaction) {
      throw new Error(
        `Changing the isolation level during the transaction is not supported by ${this.sequelize.dialect.name}.`
      );
    }
    if (!transaction || !(transaction instanceof import_transaction.Transaction)) {
      throw new Error(
        "Unable to set the isolation level for a transaction without the transaction object."
      );
    }
    const sql = this.queryGenerator.setIsolationLevelQuery(options.isolationLevel);
    await this.sequelize.queryRaw(sql, { ...options, transaction, supportsSearchPath: false });
  }
  /**
   * Begin a new transaction.
   *
   * This is an internal method used by `sequelize.transaction()` use at your own risk.
   *
   * @param transaction
   * @param options
   */
  async _startTransaction(transaction, options) {
    if (!transaction || !(transaction instanceof import_transaction.Transaction)) {
      throw new Error("Unable to start a transaction without the transaction object.");
    }
    const queryOptions = { ...options, transaction, supportsSearchPath: false };
    if (queryOptions.isolationLevel && !this.queryGenerator.dialect.supports.settingIsolationLevelDuringTransaction) {
      const sql2 = this.queryGenerator.setIsolationLevelQuery(queryOptions.isolationLevel);
      await this.sequelize.queryRaw(sql2, queryOptions);
    }
    const sql = this.queryGenerator.startTransactionQuery(options);
    await this.sequelize.queryRaw(sql, queryOptions);
    if (queryOptions.isolationLevel && this.sequelize.dialect.supports.settingIsolationLevelDuringTransaction) {
      await transaction.setIsolationLevel(queryOptions.isolationLevel);
    }
  }
  /**
   * Deletes records from a table
   *
   * @param tableOrModel
   * @param options
   */
  async bulkDelete(tableOrModel, options) {
    const bulkDeleteOptions = { ...options };
    const sql = this.queryGenerator.bulkDeleteQuery(tableOrModel, bulkDeleteOptions);
    delete bulkDeleteOptions.replacements;
    return this.sequelize.queryRaw(sql, {
      ...bulkDeleteOptions,
      raw: true,
      type: import_query_types.QueryTypes.DELETE
    });
  }
}
//# sourceMappingURL=query-interface-typescript.js.map
