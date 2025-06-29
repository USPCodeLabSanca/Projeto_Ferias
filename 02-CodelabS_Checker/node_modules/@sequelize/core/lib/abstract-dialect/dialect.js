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
var dialect_exports = {};
__export(dialect_exports, {
  AbstractDialect: () => AbstractDialect
});
module.exports = __toCommonJS(dialect_exports);
var import_utils = require("@sequelize/utils");
var import_cloneDeep = __toESM(require("lodash/cloneDeep"));
var import_merge = __toESM(require("lodash/merge"));
var import_logger = require("../utils/logger.js");
var BaseDataTypes = __toESM(require("./data-types.js"));
class AbstractDialect {
  /**
   * List of features this dialect supports.
   *
   * Important: Dialect implementations inherit these values.
   * When changing a default, ensure the implementations still properly declare which feature they support.
   */
  static supports = (0, import_utils.freezeDeep)({
    DEFAULT: true,
    "DEFAULT VALUES": false,
    "VALUES ()": false,
    "LIMIT ON UPDATE": false,
    "ON DUPLICATE KEY": true,
    "ORDER NULLS": false,
    UNION: true,
    "UNION ALL": true,
    "RIGHT JOIN": true,
    EXCEPTION: false,
    lock: false,
    lockOf: false,
    lockKey: false,
    lockOuterJoinFailure: false,
    skipLocked: false,
    finalTable: false,
    returnValues: false,
    autoIncrement: {
      identityInsert: false,
      defaultValue: true,
      update: true
    },
    bulkDefault: false,
    schemas: false,
    multiDatabases: false,
    transactions: true,
    savepoints: true,
    isolationLevels: true,
    connectionTransactionMethods: false,
    settingIsolationLevelDuringTransaction: true,
    startTransaction: {
      useBegin: false,
      readOnly: false,
      transactionType: false
    },
    migrations: true,
    upserts: true,
    inserts: {
      ignoreDuplicates: "",
      updateOnDuplicate: false,
      onConflictDoNothing: "",
      onConflictWhere: false,
      conflictFields: false
    },
    constraints: {
      restrict: true,
      deferrable: false,
      unique: true,
      default: false,
      check: true,
      foreignKey: true,
      foreignKeyChecksDisableable: false,
      primaryKey: true,
      onUpdate: true,
      add: true,
      remove: true,
      removeOptions: {
        cascade: false,
        ifExists: false
      }
    },
    index: {
      collate: true,
      length: false,
      parser: false,
      concurrently: false,
      type: false,
      using: true,
      functionBased: false,
      operator: false,
      where: false,
      include: false
    },
    groupedLimit: true,
    indexViaAlter: false,
    alterColumn: {
      unique: true
    },
    dataTypes: {
      CHAR: true,
      COLLATE_BINARY: false,
      CITEXT: false,
      INTS: { zerofill: false, unsigned: false },
      FLOAT: {
        NaN: false,
        infinity: false,
        zerofill: false,
        unsigned: false,
        scaleAndPrecision: false
      },
      REAL: {
        NaN: false,
        infinity: false,
        zerofill: false,
        unsigned: false,
        scaleAndPrecision: false
      },
      DOUBLE: {
        NaN: false,
        infinity: false,
        zerofill: false,
        unsigned: false,
        scaleAndPrecision: false
      },
      DECIMAL: {
        constrained: true,
        unconstrained: false,
        NaN: false,
        infinity: false,
        zerofill: false,
        unsigned: false
      },
      BIGINT: true,
      CIDR: false,
      MACADDR: false,
      MACADDR8: false,
      INET: false,
      JSON: false,
      JSONB: false,
      ARRAY: false,
      RANGE: false,
      GEOMETRY: false,
      GEOGRAPHY: false,
      HSTORE: false,
      TSVECTOR: false,
      DATETIME: {
        infinity: false
      },
      DATEONLY: {
        infinity: false
      },
      TIME: {
        precision: true
      }
    },
    jsonOperations: false,
    jsonExtraction: {
      unquoted: false,
      quoted: false
    },
    REGEXP: false,
    IREGEXP: false,
    tmpTableTrigger: false,
    indexHints: false,
    tableHints: false,
    searchPath: false,
    escapeStringConstants: false,
    globalTimeZoneConfig: false,
    uuidV1Generation: false,
    uuidV4Generation: false,
    dropTable: {
      cascade: false
    },
    maxExecutionTimeHint: {
      select: false
    },
    truncate: {
      cascade: false,
      restartIdentity: false
    },
    removeColumn: {
      cascade: false,
      ifExists: false
    },
    renameTable: {
      changeSchema: true,
      changeSchemaAndTable: true
    },
    createSchema: {
      authorization: false,
      charset: false,
      collate: false,
      comment: false,
      ifNotExists: false,
      replace: false
    },
    dropSchema: {
      cascade: false,
      ifExists: false
    },
    delete: {
      limit: true
    }
  });
  static extendSupport(supportsOverwrite) {
    return (0, import_merge.default)((0, import_cloneDeep.default)(this.supports) ?? {}, supportsOverwrite);
  }
  sequelize;
  /**
   * @deprecated use {@link minimumDatabaseVersion}
   */
  get defaultVersion() {
    return this.minimumDatabaseVersion;
  }
  /**
   * @deprecated use {@link identifierDelimiter}.start
   */
  get TICK_CHAR_LEFT() {
    return this.identifierDelimiter.start;
  }
  /**
   * @deprecated use {@link identifierDelimiter}.end
   */
  get TICK_CHAR_RIGHT() {
    return this.identifierDelimiter.end;
  }
  identifierDelimiter;
  minimumDatabaseVersion;
  dataTypesDocumentationUrl;
  options;
  name;
  /** dialect-specific implementation of shared data types */
  #dataTypeOverrides;
  /** base implementations of shared data types */
  #baseDataTypes;
  #dataTypeParsers = /* @__PURE__ */ new Map();
  get supports() {
    const Dialect = this.constructor;
    return Dialect.supports;
  }
  constructor(params) {
    this.sequelize = params.sequelize;
    this.name = params.name;
    this.dataTypesDocumentationUrl = params.dataTypesDocumentationUrl;
    this.options = params.options ? (0, import_utils.getImmutablePojo)(params.options) : import_utils.EMPTY_OBJECT;
    this.identifierDelimiter = (0, import_utils.isString)(params.identifierDelimiter) ? Object.freeze({
      start: params.identifierDelimiter,
      end: params.identifierDelimiter
    }) : (0, import_utils.getImmutablePojo)(params.identifierDelimiter);
    this.minimumDatabaseVersion = params.minimumDatabaseVersion;
    const baseDataTypes = /* @__PURE__ */ new Map();
    for (const dataType of Object.values(BaseDataTypes)) {
      if (!(0, import_utils.isFunction)(dataType)) {
        continue;
      }
      const dataTypeId = dataType.getDataTypeId();
      if (!dataTypeId) {
        continue;
      }
      if (baseDataTypes.has(dataTypeId)) {
        throw new Error(
          `Internal Error: Sequelize declares more than one base implementation for DataType ID ${dataTypeId}.`
        );
      }
      baseDataTypes.set(dataTypeId, dataType);
    }
    const dataTypeOverrides = /* @__PURE__ */ new Map();
    for (const dataType of Object.values(params.dataTypeOverrides)) {
      const replacedDataTypeId = dataType.getDataTypeId();
      if (dataTypeOverrides.has(replacedDataTypeId)) {
        throw new Error(
          `Dialect ${this.name} declares more than one implementation for DataType ID ${replacedDataTypeId}.`
        );
      }
      dataTypeOverrides.set(replacedDataTypeId, dataType);
    }
    this.#dataTypeOverrides = dataTypeOverrides;
    this.#baseDataTypes = baseDataTypes;
  }
  /**
   * Returns the dialect-specific implementation of a shared data type, or null if no such implementation exists
   * (in which case you need to use the base implementation).
   *
   * @param dataType The shared data type.
   */
  getDataTypeForDialect(dataType) {
    const typeId = dataType.getDataTypeId();
    const baseType = this.#baseDataTypes.get(typeId);
    if (baseType != null && baseType !== dataType) {
      return null;
    }
    return this.#dataTypeOverrides.get(typeId) ?? null;
  }
  #printedWarnings = /* @__PURE__ */ new Set();
  warnDataTypeIssue(text) {
    if (this.#printedWarnings.has(text)) {
      return;
    }
    this.#printedWarnings.add(text);
    import_logger.logger.warn(`${text} 
>> Check: ${this.dataTypesDocumentationUrl}`);
  }
  /**
   * Produces a safe representation of a Buffer for this dialect, that can be inlined in a SQL string.
   * Used mainly by DataTypes.
   *
   * @param buffer The buffer to escape
   * @returns The string, escaped for SQL.
   */
  escapeBuffer(buffer) {
    const hex = buffer.toString("hex");
    return `X'${hex}'`;
  }
  /**
   * Produces a safe representation of a string for this dialect, that can be inlined in a SQL string.
   * Used mainly by DataTypes.
   *
   * @param value The string to escape
   * @returns The string, escaped for SQL.
   */
  escapeString(value) {
    value = value.replaceAll("'", "''");
    return `'${value}'`;
  }
  // Keep the logic of this class synchronized with the logic in the JSON DataType.
  escapeJson(value) {
    return this.escapeString(JSON.stringify(value));
  }
  /**
   * Whether this dialect can use \ in strings to escape string delimiters.
   *
   * @returns
   */
  canBackslashEscape() {
    return false;
  }
  /**
   * Used to register a base parser for a Database type.
   * Parsers are based on the Database Type, not the JS type.
   * Only one parser can be assigned as the parser for a Database Type.
   * For this reason, prefer neutral implementations.
   *
   * For instance, when implementing "parse" for a Date type,
   * prefer returning a String rather than a Date object.
   *
   * The {@link DataTypes.ABSTRACT#parseDatabaseValue} method will then be called on the DataType instance defined by the user,
   * which can decide on a more specific JS type (e.g. parse the date string & return a Date instance or a Temporal instance).
   *
   * You typically do not need to implement this method. This is used to provide default parsers when no DataType
   * is provided (e.g. raw queries that don't specify a model). Sequelize already provides a default parser for most types.
   * For a custom Data Type, implementing {@link DataTypes.ABSTRACT#parseDatabaseValue} is typically what you want.
   *
   * @param databaseDataTypes Dialect-specific DB data type identifiers that will use this parser.
   * @param parser The parser function to call when parsing the data type. Parameters are dialect-specific.
   */
  registerDataTypeParser(databaseDataTypes, parser) {
    for (const databaseDataType of databaseDataTypes) {
      if (this.#dataTypeParsers.has(databaseDataType)) {
        throw new Error(
          `Sequelize DataType for DB DataType ${databaseDataType} already registered for dialect ${this.name}`
        );
      }
      this.#dataTypeParsers.set(databaseDataType, parser);
    }
  }
  getParserForDatabaseDataType(databaseDataType) {
    return this.#dataTypeParsers.get(databaseDataType);
  }
  static getSupportedOptions() {
    throw new Error(
      `Dialect ${this.name} does not implement the static method getSupportedOptions.
It must return the list of option names that can be passed to the dialect constructor.`
    );
  }
  static getSupportedConnectionOptions() {
    throw new Error(
      `Dialect ${this.name} does not implement the static method getSupportedConnectionOptions.
It must return the list of connection option names that will be passed to its ConnectionManager's getConnection.`
    );
  }
  getSupportedOptions() {
    return this.constructor.getSupportedOptions();
  }
  getSupportedConnectionOptions() {
    return this.constructor.getSupportedConnectionOptions();
  }
}
//# sourceMappingURL=dialect.js.map
