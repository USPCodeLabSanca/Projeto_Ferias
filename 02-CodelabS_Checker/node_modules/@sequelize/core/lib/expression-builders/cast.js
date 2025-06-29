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
var cast_exports = {};
__export(cast_exports, {
  Cast: () => Cast,
  cast: () => cast
});
module.exports = __toCommonJS(cast_exports);
var import_utils = require("@sequelize/utils");
var import_operators = require("../operators.js");
var import_base_sql_expression = require("./base-sql-expression.js");
var import_where = require("./where.js");
class Cast extends import_base_sql_expression.BaseSqlExpression {
  constructor(expression, type) {
    super();
    this.expression = expression;
    this.type = type;
  }
}
function cast(val, type) {
  if ((0, import_utils.isPlainObject)(val) && !(import_operators.Op.col in val)) {
    val = (0, import_where.where)(val);
  }
  return new Cast(val, type);
}
//# sourceMappingURL=cast.js.map
