"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sequelize_internals_exports = {};
__export(sequelize_internals_exports, {
  EPHEMERAL_SEQUELIZE_OPTIONS: () => EPHEMERAL_SEQUELIZE_OPTIONS,
  PERSISTED_SEQUELIZE_OPTIONS: () => PERSISTED_SEQUELIZE_OPTIONS,
  importDialect: () => importDialect
});
module.exports = __toCommonJS(sequelize_internals_exports);
var import_utils = require("@sequelize/utils");
function importDialect(dialect) {
  switch (dialect) {
    case "mariadb":
      return require("@sequelize/mariadb").MariaDbDialect;
    case "mssql":
      return require("@sequelize/mssql").MsSqlDialect;
    case "mysql":
      return require("@sequelize/mysql").MySqlDialect;
    case "postgres":
      return require("@sequelize/postgres").PostgresDialect;
    case "sqlite":
    case "sqlite3":
      return require("@sequelize/sqlite3").SqliteDialect;
    case "ibmi":
      return require("@sequelize/db2-ibmi").IBMiDialect;
    case "db2":
      return require("@sequelize/db2").Db2Dialect;
    case "snowflake":
      return require("@sequelize/snowflake").SnowflakeDialect;
    default:
      throw new Error(
        `The dialect ${dialect} is not natively supported. Native dialects: mariadb, mssql, mysql, postgres, sqlite3, ibmi, db2 and snowflake.`
      );
  }
}
const PERSISTED_SEQUELIZE_OPTIONS = (0, import_utils.getSynchronizedTypeKeys)({
  benchmark: void 0,
  defaultTimestampPrecision: void 0,
  defaultTransactionNestMode: void 0,
  define: void 0,
  disableClsTransactions: void 0,
  isolationLevel: void 0,
  keepDefaultTimezone: void 0,
  logQueryParameters: void 0,
  logging: void 0,
  minifyAliases: void 0,
  noTypeValidation: void 0,
  nullJsonStringification: void 0,
  omitNull: void 0,
  prependSearchPath: void 0,
  query: void 0,
  quoteIdentifiers: void 0,
  replication: void 0,
  retry: void 0,
  schema: void 0,
  set: void 0,
  sync: void 0,
  timezone: void 0,
  transactionType: void 0
});
const EPHEMERAL_SEQUELIZE_OPTIONS = (0, import_utils.getSynchronizedTypeKeys)({
  databaseVersion: void 0,
  dialect: void 0,
  hooks: void 0,
  models: void 0,
  pool: void 0,
  url: void 0
});
//# sourceMappingURL=sequelize.internals.js.map
