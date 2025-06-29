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
var sequelize_exports = {};
__export(sequelize_exports, {
  Sequelize: () => Sequelize,
  and: () => and,
  or: () => or
});
module.exports = __toCommonJS(sequelize_exports);
var import_utils = require("@sequelize/utils");
var import_defaults = __toESM(require("lodash/defaults"));
var import_isPlainObject = __toESM(require("lodash/isPlainObject"));
var import_map = __toESM(require("lodash/map"));
var import_retry_as_promised = __toESM(require("retry-as-promised"));
var import_connection_manager = require("./abstract-dialect/connection-manager.js");
var import_dialect = require("./abstract-dialect/dialect.js");
var import_query_generator = require("./abstract-dialect/query-generator.js");
var import_query_interface = require("./abstract-dialect/query-interface");
var import_query = require("./abstract-dialect/query.js");
var import_base = require("./associations/base.js");
var import_belongs_to = require("./associations/belongs-to");
var import_belongs_to_many = require("./associations/belongs-to-many");
var import_has_many = require("./associations/has-many");
var import_has_one = require("./associations/has-one");
var DataTypes = __toESM(require("./data-types"));
var import_deferrable = require("./deferrable");
var SequelizeErrors = __toESM(require("./errors"));
var import_association_path = require("./expression-builders/association-path");
var import_attribute = require("./expression-builders/attribute");
var import_base_sql_expression = require("./expression-builders/base-sql-expression.js");
var import_cast = require("./expression-builders/cast.js");
var import_col = require("./expression-builders/col.js");
var import_fn = require("./expression-builders/fn.js");
var import_identifier = require("./expression-builders/identifier");
var import_json_path = require("./expression-builders/json-path");
var import_json_sql_null = require("./expression-builders/json-sql-null.js");
var import_json = require("./expression-builders/json.js");
var import_list = require("./expression-builders/list");
var import_literal = require("./expression-builders/literal.js");
var import_sql = require("./expression-builders/sql");
var import_value = require("./expression-builders/value");
var import_where = require("./expression-builders/where.js");
var import_import_models = require("./import-models.js");
var import_index_hints = require("./index-hints");
var import_model = require("./model");
var import_model_internals = require("./model-internals.js");
var import_model_repository_types = require("./model-repository.types.js");
var import_operators = require("./operators");
var import_query_types = require("./query-types");
var import_sequelize_typescript = require("./sequelize-typescript");
var import_table_hints = require("./table-hints");
var import_transaction = require("./transaction.js");
var Deprecations = __toESM(require("./utils/deprecations"));
var import_deprecations = require("./utils/deprecations");
var import_model_utils = require("./utils/model-utils");
var import_sql2 = require("./utils/sql");
var import_sql3 = require("./utils/sql.js");
var import_string = require("./utils/string");
var import_validator_extras = require("./utils/validator-extras");
class Sequelize extends import_sequelize_typescript.SequelizeTypeScript {
  /**
   * Returns the specified dialect.
   *
   * @returns {string} The specified dialect.
   */
  getDialect() {
    (0, import_deprecations.noGetDialect)();
    return this.dialect.name;
  }
  /**
   * Returns the database name.
   *
   * @returns {string} The database name.
   */
  getDatabaseName() {
    throw new Error(
      "getDatabaseName has been removed as it does not make sense in every dialect. Please use the values available in sequelize.options.replication.write for an equivalent option."
    );
  }
  /**
   * Returns an instance of AbstractQueryInterface.
   *
   * @returns {AbstractQueryInterface} An instance (singleton) of AbstractQueryInterface.
   */
  getQueryInterface() {
    (0, import_deprecations.noGetQueryInterface)();
    return this.queryInterface;
  }
  /**
   * Define a new model, representing a table in the database.
   *
   * The table columns are defined by the object that is given as the second argument. Each key of the object represents a column
   *
   * @param {string} modelName The name of the model. The model will be stored in `sequelize.models` under this name
   * @param {object} attributes An object, where each attribute is a column of the table. See {@link Model.init}
   * @param {object} [options] These options are merged with the default define options provided to the Sequelize constructor and passed to Model.init()
   *
   * @see
   * {@link Model.init} for a more comprehensive specification of the `options` and `attributes` objects.
   * @see
   * <a href="/master/manual/model-basics.html">Model Basics</a> guide
   *
   * @returns {Model} Newly defined model
   *
   * @example
   * sequelize.define('modelName', {
   *   columnA: {
   *       type: DataTypes.BOOLEAN,
   *       validate: {
   *         is: ["[a-z]",'i'],        // will only allow letters
   *         max: 23,                  // only allow values <= 23
   *         isIn: {
   *           args: [['en', 'zh']],
   *           msg: "Must be English or Chinese"
   *         }
   *       },
   *       field: 'column_a'
   *   },
   *   columnB: DataTypes.STRING,
   *   columnC: 'MY VERY OWN COLUMN TYPE'
   * });
   *
   * sequelize.models.modelName // The model will now be available in models under the name given to define
   */
  define(modelName, attributes = import_utils.EMPTY_OBJECT, options = import_utils.EMPTY_OBJECT) {
    options = (0, import_utils.shallowClonePojo)(options);
    options.modelName = modelName;
    options.sequelize = this;
    const model = class extends import_model.Model {
    };
    model.init(attributes, options);
    return model;
  }
  /**
   * Fetch a Model which is already defined
   *
   * @param {string} modelName The name of a model defined with Sequelize.define
   *
   * @throws Will throw an error if the model is not defined (that is, if sequelize#isDefined returns false)
   * @returns {Model} Specified model
   */
  model(modelName) {
    (0, import_deprecations.noSequelizeModel)();
    return this.models.getOrThrow(modelName);
  }
  /**
   * Checks whether a model with the given name is defined
   *
   * @param {string} modelName The name of a model defined with Sequelize.define
   *
   * @returns {boolean} Returns true if model is already defined, otherwise false
   */
  isDefined(modelName) {
    (0, import_deprecations.noSequelizeIsDefined)();
    return this.models.hasByName(modelName);
  }
  /**
   * Execute a query on the DB, optionally bypassing all the Sequelize goodness.
   *
   * By default, the function will return two arguments: an array of results, and a metadata object, containing number of affected rows etc.
   *
   * If you are running a type of query where you don't need the metadata, for example a `SELECT` query, you can pass in a query type to make sequelize format the results:
   *
   * ```js
   * const [results, metadata] = await sequelize.query('SELECT...'); // Raw query - use array destructuring
   *
   * const results = await sequelize.query('SELECT...', { type: sequelize.QueryTypes.SELECT }); // SELECT query - no destructuring
   * ```
   *
   * @param {string}          sql
   * @param {object}          [options={}] Query options.
   * @param {boolean}         [options.raw] If true, sequelize will not try to format the results of the query, or build an instance of a model from the result
   * @param {Transaction}     [options.transaction=null] The transaction that the query should be executed under
   * @param {QueryTypes}      [options.type='RAW'] The type of query you are executing. The query type affects how results are formatted before they are passed back. The type is a string, but `Sequelize.QueryTypes` is provided as convenience shortcuts.
   * @param {boolean}         [options.nest=false] If true, transforms objects with `.` separated property names into nested objects using [dottie.js](https://github.com/mickhansen/dottie.js). For example { 'user.username': 'john' } becomes { user: { username: 'john' }}. When `nest` is true, the query type is assumed to be `'SELECT'`, unless otherwise specified
   * @param {boolean}         [options.plain=false] Sets the query type to `SELECT` and return a single row
   * @param {object|Array}    [options.replacements] Either an object of named parameter replacements in the format `:param` or an array of unnamed replacements to replace `?` in your SQL.
   * @param {object|Array}    [options.bind] Either an object of named bind parameter in the format `_param` or an array of unnamed bind parameter to replace `$1, $2, ...` in your SQL.
   * @param {boolean}         [options.useMaster=false] Force the query to use the write pool, regardless of the query type.
   * @param {Function}        [options.logging=false] A function that gets executed while running the query to log the sql.
   * @param {Model}           [options.instance] A sequelize model instance whose Model is to be used to build the query result
   * @param {ModelStatic<Model>}    [options.model] A sequelize model used to build the returned model instances
   * @param {object}          [options.retry] Set of flags that control when a query is automatically retried. Accepts all options for [`retry-as-promised`](https://github.com/mickhansen/retry-as-promised).
   * @param {Array}           [options.retry.match] Only retry a query if the error matches one of these strings.
   * @param {Integer}         [options.retry.max] How many times a failing query is automatically retried.
   * @param {number}          [options.retry.timeout] Maximum duration, in milliseconds, to retry until an error is thrown.
   * @param {number}          [options.retry.backoffBase=100] Initial backoff duration, in milliseconds.
   * @param {number}          [options.retry.backoffExponent=1.1] Exponent to increase backoff duration after each retry.
   * @param {Function}        [options.retry.report] Function that is executed after each retry, called with a message and the current retry options.
   * @param {string}          [options.retry.name='unknown'] Name used when composing error/reporting messages.
   * @param {string}          [options.searchPath=DEFAULT] An optional parameter to specify the schema search_path (Postgres only)
   * @param {boolean}         [options.supportsSearchPath] If false do not prepend the query with the search_path (Postgres only)
   * @param {boolean}         [options.mapToModel=false] Map returned fields to model's fields if `options.model` or `options.instance` is present. Mapping will occur before building the model instance.
   * @param {object}          [options.fieldMap] Map returned fields to arbitrary names for `SELECT` query type.
   * @param {boolean}         [options.rawErrors=false] Set to `true` to cause errors coming from the underlying connection/database library to be propagated unmodified and unformatted. Else, the default behavior (=false) is to reinterpret errors as sequelize.errors.BaseError objects.
   *
   * @returns {Promise}
   *
   * @see {@link Model.build} for more information about instance option.
   */
  async query(sql2, options) {
    options = { ...this.options.query, ...options };
    if (sql2 instanceof import_base_sql_expression.BaseSqlExpression) {
      sql2 = this.queryGenerator.formatSqlExpression(sql2, options);
    }
    if (typeof sql2 === "object") {
      throw new TypeError(
        '"sql" cannot be an object. Pass a string instead, and pass bind and replacement parameters through the "options" parameter'
      );
    }
    sql2 = sql2.trim();
    if (options.replacements) {
      sql2 = (0, import_sql2.injectReplacements)(sql2, this.dialect, options.replacements);
    }
    delete options.replacements;
    return this.queryRaw(sql2, options);
  }
  async queryRaw(sql2, options) {
    if (typeof sql2 !== "string") {
      throw new TypeError("Sequelize#rawQuery requires a string as the first parameter.");
    }
    if (options != null && "replacements" in options) {
      throw new TypeError(`Sequelize#rawQuery does not accept the "replacements" options.
Only bind parameters can be provided, in the dialect-specific syntax.
Use Sequelize#query if you wish to use replacements.`);
    }
    options = { ...this.options.query, ...options, bindParameterOrder: null };
    let bindParameters;
    if (options.bind != null) {
      const isBindArray = Array.isArray(options.bind);
      if (!(0, import_isPlainObject.default)(options.bind) && !isBindArray) {
        throw new TypeError(
          "options.bind must be either a plain object (for named parameters) or an array (for numeric parameters)"
        );
      }
      const mappedResult = (0, import_sql2.mapBindParameters)(sql2, this.dialect);
      for (const parameterName of mappedResult.parameterSet) {
        if (isBindArray) {
          if (!/[1-9][0-9]*/.test(parameterName) || options.bind.length < Number(parameterName)) {
            throw new Error(
              `Query includes bind parameter "$${parameterName}", but no value has been provided for that bind parameter.`
            );
          }
        } else if (!(parameterName in options.bind)) {
          throw new Error(
            `Query includes bind parameter "$${parameterName}", but no value has been provided for that bind parameter.`
          );
        }
      }
      sql2 = mappedResult.sql;
      options.bindParameterOrder = mappedResult.bindOrder;
      if (mappedResult.bindOrder == null) {
        bindParameters = options.bind;
      } else {
        bindParameters = mappedResult.bindOrder.map((key) => {
          if (isBindArray) {
            return options.bind[key - 1];
          }
          return options.bind[key];
        });
      }
    }
    if (options.instance && !options.model) {
      options.model = options.instance.constructor;
    }
    if (!options.instance && !options.model) {
      options.raw = true;
    }
    if (options.mapToModel) {
      options.fieldMap = options.model?.fieldAttributeMap;
    }
    options = (0, import_defaults.default)(options, {
      logging: Object.hasOwn(this.options, "logging") ? this.options.logging : console.debug,
      searchPath: Object.hasOwn(this.options, "searchPath") ? this.options.searchPath : "DEFAULT"
    });
    if (!options.type) {
      if (options.model || options.nest || options.plain) {
        options.type = import_query_types.QueryTypes.SELECT;
      } else {
        options.type = import_query_types.QueryTypes.RAW;
      }
    }
    if (!this.dialect.supports.searchPath || !this.options.prependSearchPath || options.supportsSearchPath === false) {
      delete options.searchPath;
    } else if (!options.searchPath) {
      options.searchPath = "DEFAULT";
    }
    const checkTransaction = () => {
      if (options.transaction && options.transaction.finished && !options[import_transaction.COMPLETES_TRANSACTION]) {
        const error = new Error(
          `${options.transaction.finished} has been called on this transaction(${options.transaction.id}), you can no longer use it. (The rejected query is attached as the 'sql' property of this error)`
        );
        error.sql = sql2;
        throw error;
      }
    };
    (0, import_model_internals.setTransactionFromCls)(options, this);
    const retryOptions = { ...this.options.retry, ...options.retry };
    return await (0, import_retry_as_promised.default)(async () => {
      checkTransaction();
      const connection = options.transaction ? options.transaction.getConnection() : options.connection ? options.connection : await this.pool.acquire({
        useMaster: options.useMaster,
        type: options.type === "SELECT" ? "read" : "write"
      });
      if (this.dialect.name === "db2" && options.alter && options.alter.drop === false) {
        connection.dropTable = false;
      }
      const query = new this.dialect.Query(connection, this, options);
      try {
        await this.hooks.runAsync("beforeQuery", options, query);
        checkTransaction();
        return await query.run(sql2, bindParameters, { minifyAliases: options.minifyAliases });
      } finally {
        await this.hooks.runAsync("afterQuery", options, query);
        if (!options.transaction && !options.connection) {
          this.pool.release(connection);
        }
      }
    }, retryOptions);
  }
  /**
   * Execute a query which would set an environment or user variable. The variables are set per connection, so this function needs a transaction.
   * Only works for MySQL or MariaDB.
   *
   * @param {object} variables Object with multiple variables.
   * @param {object} [options] query options.
   *
   * @returns {Promise}
   */
  async setSessionVariables(variables, options) {
    options = { ...this.options.setSessionVariables, ...options };
    if (!["mysql", "mariadb"].includes(this.dialect.name)) {
      throw new Error("sequelize.setSessionVariables is only supported for mysql or mariadb");
    }
    (0, import_model_internals.setTransactionFromCls)(options, this);
    if ((!options.transaction || !(options.transaction instanceof import_transaction.Transaction)) && !options.connection) {
      throw new Error(
        "You must specify either options.transaction or options.connection, as sequelize.setSessionVariables is used to set the session options of a connection"
      );
    }
    options.raw = true;
    options.plain = true;
    options.type = "SET";
    const query = `SET ${(0, import_map.default)(
      variables,
      (v, k) => `@${k} := ${typeof v === "string" ? `"${v}"` : v}`
    ).join(", ")}`;
    return await this.query(query, options);
  }
  /**
   * Sync all defined models to the DB.
   *
   * @param {object} [options={}] sync options
   * @param {boolean} [options.force=false] If force is true, each Model will run `DROP TABLE IF EXISTS`, before it tries to create its own table
   * @param {boolean|Function} [options.logging=console.log] A function that logs sql queries, or false for no logging
   * @param {string} [options.schema='public'] The schema that the tables should be created in. This can be overridden for each table in sequelize.define
   * @param {string} [options.searchPath=DEFAULT] An optional parameter to specify the schema search_path (Postgres only)
   * @param {boolean} [options.hooks=true] If hooks is true then beforeSync, afterSync, beforeBulkSync, afterBulkSync hooks will be called
   * @param {boolean|object} [options.alter=false] Alters tables to fit models. Provide an object for additional configuration. Not recommended for production use. If not further configured deletes data in columns that were removed or had their type changed in the model.
   * @param {boolean} [options.alter.drop=true] Prevents any drop statements while altering a table when set to `false`
   *
   * @returns {Promise}
   */
  async sync(options) {
    options = {
      ...this.options.sync,
      ...options,
      hooks: options ? options.hooks !== false : true
    };
    if ("match" in options) {
      throw new Error(
        'The "match" option has been removed as matching against a database name does not make sense in every dialects.'
      );
    }
    if (options.hooks) {
      await this.hooks.runAsync("beforeBulkSync", options);
    }
    if (options.force) {
      await this.drop({
        ...options,
        cascade: this.dialect.supports.dropTable.cascade || void 0
      });
    }
    if (this.models.size === 0) {
      await this.authenticate(options);
    } else {
      const models = this.models.getModelsTopoSortedByForeignKey();
      if (models == null) {
        return this._syncModelsWithCyclicReferences(options);
      }
      models.reverse();
      for (const model of models) {
        await model.sync(options);
      }
    }
    if (options.hooks) {
      await this.hooks.runAsync("afterBulkSync", options);
    }
    return this;
  }
  /**
   * Used instead of sync() when two models reference each-other, so their foreign keys cannot be created immediately.
   *
   * @param {object} options - sync options
   * @private
   */
  async _syncModelsWithCyclicReferences(options) {
    if (this.dialect.name === "sqlite3") {
      await (0, import_sql3.withSqliteForeignKeysOff)(this, options, async () => {
        for (const model of this.models) {
          await model.sync(options);
        }
      });
      return;
    }
    for (const model of this.models) {
      await model.sync({ ...options, withoutForeignKeyConstraints: true });
    }
    for (const model of this.models) {
      await model.sync({ ...options, force: false, alter: true });
    }
  }
  /**
   * Drop all tables defined through this sequelize instance.
   * This is done by calling {@link Model.drop} on each model.
   *
   * @param {object} [options] The options passed to each call to Model.drop
   * @param {boolean|Function} [options.logging] A function that logs sql queries, or false for no logging
   *
   * @returns {Promise}
   */
  async drop(options) {
    if (options && options.cascade) {
      for (const model of this.models) {
        await model.drop(options);
      }
    }
    const sortedModels = this.models.getModelsTopoSortedByForeignKey();
    if (sortedModels) {
      for (const model of sortedModels) {
        await model.drop(options);
      }
    }
    if (this.dialect.name === "sqlite3") {
      await (0, import_sql3.withSqliteForeignKeysOff)(this, options, async () => {
        for (const model of this.models) {
          await model.drop(options);
        }
      });
      return;
    }
    for (const model of this.models) {
      const foreignKeys = await this.queryInterface.showConstraints(model, {
        ...options,
        constraintType: "FOREIGN KEY"
      });
      await Promise.all(
        foreignKeys.map((foreignKey) => {
          return this.queryInterface.removeConstraint(model, foreignKey.constraintName, options);
        })
      );
    }
    for (const model of this.models) {
      await model.drop(options);
    }
  }
  /**
   * Test the connection by trying to authenticate. It runs `SELECT 1+1 AS result` query.
   *
   * @param {object} [options={}] query options
   *
   * @returns {Promise}
   */
  async authenticate(options) {
    options = {
      raw: true,
      plain: true,
      type: import_query_types.QueryTypes.SELECT,
      ...options
    };
    await this.query(
      `SELECT 1+1 AS result${this.dialect.name === "ibmi" ? " FROM SYSIBM.SYSDUMMY1" : ""}`,
      options
    );
  }
  /**
   * Get the fn for random based on the dialect
   *
   * @returns {Fn}
   */
  // TODO: replace with sql.random
  random() {
    if (["postgres", "sqlite3", "snowflake"].includes(this.dialect.name)) {
      return (0, import_fn.fn)("RANDOM");
    }
    return (0, import_fn.fn)("RAND");
  }
  // Global exports
  static Fn = import_fn.Fn;
  static Col = import_col.Col;
  static Cast = import_cast.Cast;
  static Literal = import_literal.Literal;
  static Where = import_where.Where;
  static List = import_list.List;
  static Identifier = import_identifier.Identifier;
  static Attribute = import_attribute.Attribute;
  static Value = import_value.Value;
  static AssociationPath = import_association_path.AssociationPath;
  static JsonPath = import_json_path.JsonPath;
  static sql = import_sql.sql;
  // these are all available on the "sql" object, but are exposed for backwards compatibility
  static fn = import_fn.fn;
  static col = import_col.col;
  static cast = import_cast.cast;
  static literal = import_literal.literal;
  static json = import_json.json;
  static where = import_where.where;
  static and = and;
  static or = or;
  static isModelStatic = import_model_utils.isModelStatic;
  static isSameInitialModel = import_model_utils.isSameInitialModel;
  static importModels = import_import_models.importModels;
  static TransactionNestMode = import_transaction.TransactionNestMode;
  static TransactionType = import_transaction.TransactionType;
  static Lock = import_transaction.Lock;
  static IsolationLevel = import_transaction.IsolationLevel;
  log(...args) {
    let options;
    const last = args.at(-1);
    if (last && (0, import_isPlainObject.default)(last) && Object.hasOwn(last, "logging")) {
      options = last;
      if (options.logging === console.log || options.logging === console.debug) {
        args.splice(-1, 1);
      }
    } else {
      options = this.options;
    }
    if (options.logging) {
      if (options.logging === true) {
        Deprecations.noTrueLogging();
        options.logging = console.debug;
      }
      if ((this.options.benchmark || options.benchmark) && options.logging === console.debug) {
        args = [`${args[0]} Elapsed time: ${args[1]}ms`];
      }
      options.logging(...args);
    }
  }
  normalizeAttribute(attribute) {
    if (!(0, import_isPlainObject.default)(attribute)) {
      attribute = { type: attribute };
    } else {
      attribute = { ...attribute };
    }
    if (attribute.values) {
      throw new TypeError(
        `
The "values" property has been removed from column definitions. The following is no longer supported:

sequelize.define('MyModel', {
  roles: {
    type: DataTypes.ENUM,
    values: ['admin', 'user'],
  },
});

Instead, define enum values like this:

sequelize.define('MyModel', {
  roles: {
    type: DataTypes.ENUM(['admin', 'user']),
  },
});

Remove the "values" property to resolve this issue.
        `.trim()
      );
    }
    if (!attribute.type) {
      return attribute;
    }
    attribute.type = this.normalizeDataType(attribute.type);
    return attribute;
  }
}
Sequelize.prototype.fn = Sequelize.fn;
Sequelize.prototype.col = Sequelize.col;
Sequelize.prototype.cast = Sequelize.cast;
Sequelize.prototype.literal = Sequelize.literal;
Sequelize.prototype.and = Sequelize.and;
Sequelize.prototype.or = Sequelize.or;
Sequelize.prototype.json = Sequelize.json;
Sequelize.prototype.where = Sequelize.where;
Sequelize.prototype.validate = Sequelize.prototype.authenticate;
Object.defineProperty(Sequelize, "version", {
  enumerable: true,
  get() {
    return require("../package.json").version;
  }
});
Sequelize.Op = import_operators.Op;
Sequelize.TableHints = import_table_hints.TableHints;
Sequelize.IndexHints = import_index_hints.IndexHints;
Sequelize.Transaction = import_transaction.Transaction;
Sequelize.GeoJsonType = require("./geo-json").GeoJsonType;
Sequelize.prototype.Sequelize = Sequelize;
Sequelize.prototype.QueryTypes = Sequelize.QueryTypes = import_query_types.QueryTypes;
Sequelize.prototype.Validator = Sequelize.Validator = import_validator_extras.validator;
Sequelize.Model = import_model.Model;
Sequelize.AbstractQueryInterface = import_query_interface.AbstractQueryInterface;
Sequelize.BelongsToAssociation = import_belongs_to.BelongsToAssociation;
Sequelize.HasOneAssociation = import_has_one.HasOneAssociation;
Sequelize.HasManyAssociation = import_has_many.HasManyAssociation;
Sequelize.BelongsToManyAssociation = import_belongs_to_many.BelongsToManyAssociation;
Sequelize.DataTypes = DataTypes;
for (const dataTypeName in DataTypes) {
  Object.defineProperty(Sequelize, dataTypeName, {
    get() {
      (0, import_deprecations.noSequelizeDataType)();
      return DataTypes[dataTypeName];
    }
  });
}
Sequelize.Deferrable = import_deferrable.Deferrable;
Sequelize.ConstraintChecking = import_deferrable.ConstraintChecking;
Sequelize.prototype.Association = Sequelize.Association = import_base.Association;
Sequelize.useInflection = import_string.useInflection;
Sequelize.SQL_NULL = import_json_sql_null.SQL_NULL;
Sequelize.JSON_NULL = import_json_sql_null.JSON_NULL;
Sequelize.ManualOnDelete = import_model_repository_types.ManualOnDelete;
Sequelize.AbstractConnectionManager = import_connection_manager.AbstractConnectionManager;
Sequelize.AbstractQueryGenerator = import_query_generator.AbstractQueryGenerator;
Sequelize.AbstractQuery = import_query.AbstractQuery;
Sequelize.AbstractDialect = import_dialect.AbstractDialect;
for (const error of Object.keys(SequelizeErrors)) {
  Sequelize[error] = SequelizeErrors[error];
}
function and(...args) {
  return { [import_operators.Op.and]: args };
}
function or(...args) {
  if (args.length === 1) {
    return { [import_operators.Op.or]: args[0] };
  }
  return { [import_operators.Op.or]: args };
}
//# sourceMappingURL=sequelize.js.map
