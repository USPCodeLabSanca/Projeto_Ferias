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
var json_path_exports = {};
__export(json_path_exports, {
  JsonPath: () => JsonPath,
  jsonPath: () => jsonPath
});
module.exports = __toCommonJS(json_path_exports);
var import_base_sql_expression = require("./base-sql-expression.js");
class JsonPath extends import_base_sql_expression.BaseSqlExpression {
  constructor(expression, path) {
    super();
    this.expression = expression;
    this.path = path;
  }
}
function jsonPath(expression, path) {
  return new JsonPath(expression, path);
}
//# sourceMappingURL=json-path.js.map
