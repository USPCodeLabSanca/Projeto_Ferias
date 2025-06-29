"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var query_interface_internal_exports = {};
__export(query_interface_internal_exports, {
  AbstractQueryInterfaceInternal: () => AbstractQueryInterfaceInternal
});
module.exports = __toCommonJS(query_interface_internal_exports);
var import_node_assert = __toESM(require("node:assert"));
var import_query_types = require("../query-types.js");
class AbstractQueryInterfaceInternal {
  #dialect;
  get #sequelize() {
    return this.#dialect.sequelize;
  }
  get #queryGenerator() {
    return this.#dialect.queryGenerator;
  }
  constructor(dialect) {
    this.#dialect = dialect;
  }
  async fetchDatabaseVersionRaw(options) {
    const out = await this.#sequelize.queryRaw(this.#queryGenerator.versionQuery(), {
      ...options,
      type: import_query_types.QueryTypes.SELECT,
      plain: true
    });
    (0, import_node_assert.default)(out != null);
    return out;
  }
  async executeQueriesSequentially(queries, options) {
    const results = [];
    for (const query of queries) {
      const result = await this.#sequelize.queryRaw(query, { ...options });
      results.push(result);
    }
    return results;
  }
}
//# sourceMappingURL=query-interface-internal.js.map
