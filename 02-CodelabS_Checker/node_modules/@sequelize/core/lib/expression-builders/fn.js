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
var fn_exports = {};
__export(fn_exports, {
  Fn: () => Fn,
  fn: () => fn
});
module.exports = __toCommonJS(fn_exports);
var import_utils = require("@sequelize/utils");
var import_operators = require("../operators.js");
var import_base_sql_expression = require("./base-sql-expression.js");
var import_where = require("./where.js");
class Fn extends import_base_sql_expression.BaseSqlExpression {
  fn;
  args;
  constructor(fnName, args) {
    super();
    this.fn = fnName;
    this.args = args;
  }
}
function fn(fnName, ...args) {
  for (let i = 0; i < args.length; i++) {
    if ((0, import_utils.isPlainObject)(args[i]) && !(import_operators.Op.col in args[i])) {
      args[i] = (0, import_where.where)(args[i]);
    }
  }
  return new Fn(fnName, args);
}
//# sourceMappingURL=fn.js.map
