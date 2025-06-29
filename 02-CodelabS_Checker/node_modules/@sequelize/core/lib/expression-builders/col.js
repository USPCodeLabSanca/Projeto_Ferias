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
var col_exports = {};
__export(col_exports, {
  Col: () => Col,
  col: () => col
});
module.exports = __toCommonJS(col_exports);
var import_base_sql_expression = require("./base-sql-expression.js");
class Col extends import_base_sql_expression.BaseSqlExpression {
  identifiers;
  constructor(...identifiers) {
    super();
    this.identifiers = identifiers;
  }
}
function col(...identifiers) {
  return new Col(...identifiers);
}
//# sourceMappingURL=col.js.map
