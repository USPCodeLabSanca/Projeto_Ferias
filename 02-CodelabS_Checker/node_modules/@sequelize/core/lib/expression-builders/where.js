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
var where_exports = {};
__export(where_exports, {
  Where: () => Where,
  where: () => where
});
module.exports = __toCommonJS(where_exports);
var import_where_sql_builder = require("../abstract-dialect/where-sql-builder.js");
var import_base_sql_expression = require("./base-sql-expression.js");
class Where extends import_base_sql_expression.BaseSqlExpression {
  where;
  constructor(...args) {
    super();
    if (args.length === 1) {
      this.where = args[0];
    } else if (args.length === 2) {
      this.where = import_where_sql_builder.PojoWhere.create(args[0], args[1]);
    } else {
      if (typeof args[1] === "string") {
        throw new TypeError(`where(left, operator, right) does not accept a string as the operator. Use one of the operators available in the Op object.
If you wish to use custom operators not provided by Sequelize, you can use the "sql" template literal tag. Refer to the documentation on custom operators on https://sequelize.org/docs/v7/querying/operators/#custom-operators for more details.`);
      }
      this.where = import_where_sql_builder.PojoWhere.create(args[0], { [args[1]]: args[2] });
    }
  }
}
function where(...args) {
  return new Where(...args);
}
//# sourceMappingURL=where.js.map
