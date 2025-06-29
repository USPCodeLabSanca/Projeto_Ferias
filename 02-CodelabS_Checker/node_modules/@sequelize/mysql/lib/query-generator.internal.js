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
var query_generator_internal_exports = {};
__export(query_generator_internal_exports, {
  MySqlQueryGeneratorInternal: () => MySqlQueryGeneratorInternal
});
module.exports = __toCommonJS(query_generator_internal_exports);
var import_query_generator_internal = require("@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/query-generator-internal.js");
var import_sql = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/sql.js");
const TECHNICAL_SCHEMAS = Object.freeze([
  "MYSQL",
  "INFORMATION_SCHEMA",
  "PERFORMANCE_SCHEMA",
  "SYS",
  "mysql",
  "information_schema",
  "performance_schema",
  "sys"
]);
class MySqlQueryGeneratorInternal extends import_query_generator_internal.AbstractQueryGeneratorInternal {
  getTechnicalSchemaNames() {
    return TECHNICAL_SCHEMAS;
  }
  addLimitAndOffset(options) {
    return (0, import_sql.formatMySqlStyleLimitOffset)(options, this.queryGenerator);
  }
}
//# sourceMappingURL=query-generator.internal.js.map
