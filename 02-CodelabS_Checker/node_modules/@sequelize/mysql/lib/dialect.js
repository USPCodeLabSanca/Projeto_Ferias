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
  MySqlDialect: () => MySqlDialect
});
module.exports = __toCommonJS(dialect_exports);
var import_core = require("@sequelize/core");
var import_connection_options = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/connection-options.js");
var import_sql = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/sql.js");
var import_utils = require("@sequelize/utils");
var import_connection_options2 = require("./_internal/connection-options.js");
var import_data_types_db = require("./_internal/data-types-db.js");
var DataTypes = __toESM(require("./_internal/data-types-overrides.js"));
var import_connection_manager = require("./connection-manager.js");
var import_query_generator = require("./query-generator.js");
var import_query_interface = require("./query-interface.js");
var import_query = require("./query.js");
const DIALECT_OPTION_NAMES = (0, import_utils.getSynchronizedTypeKeys)({
  mysql2Module: void 0,
  showWarnings: void 0
});
const numericOptions = {
  zerofill: true,
  unsigned: true
};
class MySqlDialect extends import_core.AbstractDialect {
  static supports = import_core.AbstractDialect.extendSupport({
    "VALUES ()": true,
    "LIMIT ON UPDATE": true,
    lock: true,
    forShare: "LOCK IN SHARE MODE",
    settingIsolationLevelDuringTransaction: false,
    schemas: true,
    inserts: {
      ignoreDuplicates: " IGNORE",
      updateOnDuplicate: " ON DUPLICATE KEY UPDATE"
    },
    index: {
      collate: false,
      length: true,
      parser: true,
      type: true,
      using: 1
    },
    constraints: {
      foreignKeyChecksDisableable: true
    },
    indexViaAlter: true,
    indexHints: true,
    dataTypes: {
      COLLATE_BINARY: true,
      GEOMETRY: true,
      INTS: numericOptions,
      FLOAT: { ...numericOptions, scaleAndPrecision: true },
      REAL: { ...numericOptions, scaleAndPrecision: true },
      DOUBLE: { ...numericOptions, scaleAndPrecision: true },
      DECIMAL: numericOptions,
      JSON: true
    },
    jsonOperations: true,
    jsonExtraction: {
      unquoted: true,
      quoted: true
    },
    REGEXP: true,
    uuidV1Generation: true,
    globalTimeZoneConfig: true,
    maxExecutionTimeHint: {
      select: true
    },
    createSchema: {
      charset: true,
      collate: true,
      ifNotExists: true
    },
    dropSchema: {
      ifExists: true
    },
    startTransaction: {
      readOnly: true
    }
  });
  connectionManager;
  queryGenerator;
  queryInterface;
  Query = import_query.MySqlQuery;
  constructor(sequelize, options) {
    super({
      sequelize,
      options,
      dataTypeOverrides: DataTypes,
      minimumDatabaseVersion: "8.0.19",
      identifierDelimiter: "`",
      dataTypesDocumentationUrl: "https://dev.mysql.com/doc/refman/8.0/en/data-types.html",
      name: "mysql"
    });
    this.connectionManager = new import_connection_manager.MySqlConnectionManager(this);
    this.queryGenerator = new import_query_generator.MySqlQueryGenerator(this);
    this.queryInterface = new import_query_interface.MySqlQueryInterface(this);
    (0, import_data_types_db.registerMySqlDbDataTypeParsers)(this);
  }
  createBindCollector() {
    return (0, import_sql.createUnspecifiedOrderedBindCollector)();
  }
  escapeString(value) {
    return (0, import_sql.escapeMysqlMariaDbString)(value);
  }
  escapeJson(value) {
    return `CAST(${super.escapeJson(value)} AS JSON)`;
  }
  canBackslashEscape() {
    return true;
  }
  getDefaultSchema() {
    return this.sequelize.options.replication.write.database ?? "";
  }
  parseConnectionUrl(url) {
    return (0, import_connection_options.parseCommonConnectionUrlOptions)({
      url,
      allowedProtocols: ["mysql"],
      hostname: "host",
      port: "port",
      pathname: "database",
      username: "user",
      password: "password",
      stringSearchParams: import_connection_options2.STRING_CONNECTION_OPTION_NAMES,
      booleanSearchParams: import_connection_options2.BOOLEAN_CONNECTION_OPTION_NAMES,
      numberSearchParams: import_connection_options2.NUMBER_CONNECTION_OPTION_NAMES
    });
  }
  static getSupportedOptions() {
    return DIALECT_OPTION_NAMES;
  }
  static getSupportedConnectionOptions() {
    return import_connection_options2.CONNECTION_OPTION_NAMES;
  }
}
//# sourceMappingURL=dialect.js.map
