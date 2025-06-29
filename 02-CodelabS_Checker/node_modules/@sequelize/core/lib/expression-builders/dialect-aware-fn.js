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
var dialect_aware_fn_exports = {};
__export(dialect_aware_fn_exports, {
  DialectAwareFn: () => DialectAwareFn,
  Unquote: () => Unquote
});
module.exports = __toCommonJS(dialect_aware_fn_exports);
var import_base_sql_expression = require("./base-sql-expression.js");
var import_json_path = require("./json-path.js");
class DialectAwareFn extends import_base_sql_expression.BaseSqlExpression {
  args;
  constructor(...args) {
    super();
    this.args = args;
    if (this.args.length > this.maxArgCount) {
      throw new Error(
        `Too many arguments provided to ${this.constructor.name} function. Expected ${this.maxArgCount} or less, but got ${this.args.length}.`
      );
    }
    if (this.args.length < this.minArgCount) {
      throw new Error(
        `Too few arguments provided to ${this.constructor.name} function. Expected ${this.minArgCount} or more, but got ${this.args.length}.`
      );
    }
  }
  get maxArgCount() {
    return Number.POSITIVE_INFINITY;
  }
  get minArgCount() {
    return 0;
  }
  supportsJavaScript() {
    return false;
  }
  applyForJavaScript() {
    throw new Error(`JavaScript is not supported by the ${this.constructor.name} function.`);
  }
  /**
   * This getter is designed to be used as an attribute's default value.
   * This is useful when the SQL version must be bypassed due to a limitation of the dialect that Sequelize cannot detect,
   * such as a missing extension.
   *
   * ```ts
   * const User = sequelize.define('User', {
   *   uuid: {
   *     type: DataTypes.UUID,
   *     defaultValue: sql.uuidV4.asJavaScript,
   *   },
   * });
   * ```
   */
  get asJavaScript() {
    if (!this.supportsJavaScript()) {
      throw new Error(`JavaScript is not supported by the ${this.constructor.name} function.`);
    }
    return () => this.applyForJavaScript();
  }
  static build(...args) {
    return new this(...args);
  }
}
class Unquote extends DialectAwareFn {
  get maxArgCount() {
    return 1;
  }
  get minArgCount() {
    return 1;
  }
  supportsDialect(dialect) {
    return dialect.supports.jsonOperations;
  }
  applyForDialect(dialect, options) {
    const arg = this.args[0];
    if (arg instanceof import_json_path.JsonPath) {
      return dialect.queryGenerator.jsonPathExtractionQuery(
        dialect.queryGenerator.escape(arg.expression),
        arg.path,
        true
      );
    }
    return dialect.queryGenerator.formatUnquoteJson(arg, options);
  }
}
//# sourceMappingURL=dialect-aware-fn.js.map
