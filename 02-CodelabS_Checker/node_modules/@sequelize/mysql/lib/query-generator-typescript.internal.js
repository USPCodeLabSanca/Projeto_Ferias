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
var query_generator_typescript_internal_exports = {};
__export(query_generator_typescript_internal_exports, {
  MySqlQueryGeneratorTypeScript: () => MySqlQueryGeneratorTypeScript
});
module.exports = __toCommonJS(query_generator_typescript_internal_exports);
var import_core = require("@sequelize/core");
var import_query_generator_typescript = require("@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/query-generator-typescript.js");
var import_check = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/check.js");
var import_join_sql_fragments = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/join-sql-fragments.js");
var import_json = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/json.js");
var import_object = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/object.js");
var import_string = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/string.js");
var import_query_generator_internal = require("./query-generator.internal.js");
class MySqlQueryGeneratorTypeScript extends import_core.AbstractQueryGenerator {
  #internals;
  constructor(dialect, internals = new import_query_generator_internal.MySqlQueryGeneratorInternal(dialect)) {
    super(dialect, internals);
    internals.whereSqlBuilder.setOperatorKeyword(import_core.Op.regexp, "REGEXP");
    internals.whereSqlBuilder.setOperatorKeyword(import_core.Op.notRegexp, "NOT REGEXP");
    this.#internals = internals;
  }
  listSchemasQuery(options) {
    let schemasToSkip = this.#internals.getTechnicalSchemaNames();
    if (options && Array.isArray(options?.skip)) {
      schemasToSkip = [...schemasToSkip, ...options.skip];
    }
    return (0, import_join_sql_fragments.joinSQLFragments)([
      "SELECT SCHEMA_NAME AS `schema`",
      "FROM INFORMATION_SCHEMA.SCHEMATA",
      `WHERE SCHEMA_NAME NOT IN (${schemasToSkip.map((schema) => this.escape(schema)).join(", ")})`
    ]);
  }
  describeTableQuery(tableName) {
    return `SHOW FULL COLUMNS FROM ${this.quoteTable(tableName)};`;
  }
  listTablesQuery(options) {
    return (0, import_join_sql_fragments.joinSQLFragments)([
      "SELECT TABLE_NAME AS `tableName`,",
      "TABLE_SCHEMA AS `schema`",
      `FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`,
      options?.schema ? `AND TABLE_SCHEMA = ${this.escape(options.schema)}` : `AND TABLE_SCHEMA NOT IN (${this.#internals.getTechnicalSchemaNames().map((schema) => this.escape(schema)).join(", ")})`,
      "ORDER BY TABLE_SCHEMA, TABLE_NAME"
    ]);
  }
  truncateTableQuery(tableName, options) {
    if (options) {
      (0, import_check.rejectInvalidOptions)(
        "truncateTableQuery",
        this.dialect,
        import_query_generator_typescript.TRUNCATE_TABLE_QUERY_SUPPORTABLE_OPTIONS,
        import_object.EMPTY_SET,
        options
      );
    }
    return `TRUNCATE ${this.quoteTable(tableName)}`;
  }
  showConstraintsQuery(tableName, options) {
    const table = this.extractTableDetails(tableName);
    return (0, import_join_sql_fragments.joinSQLFragments)([
      "SELECT c.CONSTRAINT_SCHEMA AS constraintSchema,",
      "c.CONSTRAINT_NAME AS constraintName,",
      "c.CONSTRAINT_TYPE AS constraintType,",
      "c.TABLE_SCHEMA AS tableSchema,",
      "c.TABLE_NAME AS tableName,",
      "kcu.COLUMN_NAME AS columnNames,",
      "kcu.REFERENCED_TABLE_SCHEMA AS referencedTableSchema,",
      "kcu.REFERENCED_TABLE_NAME AS referencedTableName,",
      "kcu.REFERENCED_COLUMN_NAME AS referencedColumnNames,",
      "r.DELETE_RULE AS deleteAction,",
      "r.UPDATE_RULE AS updateAction,",
      "ch.CHECK_CLAUSE AS definition",
      "FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS c",
      "LEFT JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS r ON c.CONSTRAINT_CATALOG = r.CONSTRAINT_CATALOG",
      "AND c.CONSTRAINT_SCHEMA = r.CONSTRAINT_SCHEMA AND c.CONSTRAINT_NAME = r.CONSTRAINT_NAME AND c.TABLE_NAME = r.TABLE_NAME",
      "LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu ON c.CONSTRAINT_CATALOG = kcu.CONSTRAINT_CATALOG",
      "AND c.CONSTRAINT_SCHEMA = kcu.CONSTRAINT_SCHEMA AND c.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME AND c.TABLE_NAME = kcu.TABLE_NAME",
      "LEFT JOIN INFORMATION_SCHEMA.CHECK_CONSTRAINTS ch ON c.CONSTRAINT_CATALOG = ch.CONSTRAINT_CATALOG",
      "AND c.CONSTRAINT_SCHEMA = ch.CONSTRAINT_SCHEMA AND c.CONSTRAINT_NAME = ch.CONSTRAINT_NAME",
      `WHERE c.TABLE_NAME = ${this.escape(table.tableName)}`,
      `AND c.TABLE_SCHEMA = ${this.escape(table.schema)}`,
      options?.columnName ? `AND kcu.COLUMN_NAME = ${this.escape(options.columnName)}` : "",
      options?.constraintName ? `AND c.CONSTRAINT_NAME = ${this.escape(options.constraintName)}` : "",
      options?.constraintType ? `AND c.CONSTRAINT_TYPE = ${this.escape(options.constraintType)}` : "",
      "ORDER BY c.CONSTRAINT_NAME, kcu.ORDINAL_POSITION"
    ]);
  }
  showIndexesQuery(tableName) {
    return `SHOW INDEX FROM ${this.quoteTable(tableName)}`;
  }
  getToggleForeignKeyChecksQuery(enable) {
    return `SET FOREIGN_KEY_CHECKS=${enable ? "1" : "0"}`;
  }
  removeIndexQuery(tableName, indexNameOrAttributes, options) {
    if (options) {
      (0, import_check.rejectInvalidOptions)(
        "removeIndexQuery",
        this.dialect,
        import_query_generator_typescript.REMOVE_INDEX_QUERY_SUPPORTABLE_OPTIONS,
        import_object.EMPTY_SET,
        options
      );
    }
    let indexName;
    if (Array.isArray(indexNameOrAttributes)) {
      const table = this.extractTableDetails(tableName);
      indexName = (0, import_string.generateIndexName)(table, { fields: indexNameOrAttributes });
    } else {
      indexName = indexNameOrAttributes;
    }
    return `DROP INDEX ${this.quoteIdentifier(indexName)} ON ${this.quoteTable(tableName)}`;
  }
  jsonPathExtractionQuery(sqlExpression, path, unquote) {
    const extractQuery = `json_extract(${sqlExpression},${this.escape((0, import_json.buildJsonPath)(path))})`;
    if (unquote) {
      return `json_unquote(${extractQuery})`;
    }
    return extractQuery;
  }
  formatUnquoteJson(arg, options) {
    return `json_unquote(${this.escape(arg, options)})`;
  }
  versionQuery() {
    return "SELECT VERSION() as `version`";
  }
  getUuidV1FunctionCall() {
    return "UUID()";
  }
}
//# sourceMappingURL=query-generator-typescript.internal.js.map
