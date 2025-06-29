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
var json_sql_null_exports = {};
__export(json_sql_null_exports, {
  JSON_NULL: () => JSON_NULL,
  SQL_NULL: () => SQL_NULL
});
module.exports = __toCommonJS(json_sql_null_exports);
var import_dialect_aware_fn = require("./dialect-aware-fn.js");
var import_literal = require("./literal.js");
class JsonNullClass extends import_dialect_aware_fn.DialectAwareFn {
  get maxArgCount() {
    return 0;
  }
  get minArgCount() {
    return 0;
  }
  supportsDialect() {
    return true;
  }
  applyForDialect(dialect) {
    return dialect.escapeJson(null);
  }
}
const JSON_NULL = JsonNullClass.build();
const SQL_NULL = (0, import_literal.literal)("NULL");
//# sourceMappingURL=json-sql-null.js.map
