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
var attribute_exports = {};
__export(attribute_exports, {
  Attribute: () => Attribute,
  attribute: () => attribute
});
module.exports = __toCommonJS(attribute_exports);
var import_attribute_syntax = require("../utils/attribute-syntax.js");
var import_base_sql_expression = require("./base-sql-expression.js");
class Attribute extends import_base_sql_expression.BaseSqlExpression {
  constructor(attributeName) {
    super();
    this.attributeName = attributeName;
  }
}
function attribute(attributeName) {
  return (0, import_attribute_syntax.parseAttributeSyntax)(attributeName);
}
//# sourceMappingURL=attribute.js.map
