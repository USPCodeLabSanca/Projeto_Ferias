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
var literal_exports = {};
__export(literal_exports, {
  Literal: () => Literal,
  literal: () => literal
});
module.exports = __toCommonJS(literal_exports);
var import_base_sql_expression = require("./base-sql-expression.js");
class Literal extends import_base_sql_expression.BaseSqlExpression {
  val;
  constructor(val) {
    super();
    this.val = Array.isArray(val) ? val : [val];
  }
}
function literal(val) {
  return new Literal(val);
}
//# sourceMappingURL=literal.js.map
