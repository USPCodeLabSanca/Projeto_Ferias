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
var sql_exports = {};
__export(sql_exports, {
  sql: () => sql
});
module.exports = __toCommonJS(sql_exports);
var import_utils = require("@sequelize/utils");
var import_attribute = require("./attribute.js");
var import_base_sql_expression = require("./base-sql-expression.js");
var import_cast = require("./cast.js");
var import_col = require("./col.js");
var import_dialect_aware_fn = require("./dialect-aware-fn.js");
var import_fn = require("./fn.js");
var import_identifier = require("./identifier.js");
var import_json_path = require("./json-path.js");
var import_list = require("./list.js");
var import_literal = require("./literal.js");
var import_uuid = require("./uuid.js");
var import_value = require("./value.js");
var import_where = require("./where.js");
function sql(rawSql, ...values) {
  const arg = [];
  for (const [i, element] of rawSql.entries()) {
    arg.push(element);
    if (i < values.length) {
      const value = values[i];
      arg.push(wrapValue(value));
    }
  }
  return new import_literal.Literal(arg);
}
function wrapValue(value) {
  return value instanceof import_base_sql_expression.BaseSqlExpression ? value : new import_value.Value(value);
}
function joinSql(parts, separator) {
  const escapedParts = parts.map(wrapValue);
  return new import_literal.Literal(separator ? (0, import_utils.intersperse)(escapedParts, separator) : escapedParts);
}
sql.attribute = import_attribute.attribute;
sql.cast = import_cast.cast;
sql.col = import_col.col;
sql.fn = import_fn.fn;
sql.identifier = import_identifier.identifier;
sql.jsonPath = import_json_path.jsonPath;
sql.list = import_list.list;
sql.literal = import_literal.literal;
sql.where = import_where.where;
sql.uuidV4 = import_uuid.SqlUuidV4.build();
sql.uuidV1 = import_uuid.SqlUuidV1.build();
sql.unquote = import_dialect_aware_fn.Unquote.build.bind(import_dialect_aware_fn.Unquote);
sql.join = joinSql;
//# sourceMappingURL=sql.js.map
