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
var connection_manager_exports = {};
__export(connection_manager_exports, {
  AbstractConnectionManager: () => AbstractConnectionManager
});
module.exports = __toCommonJS(connection_manager_exports);
class AbstractConnectionManager {
  dialect;
  constructor(dialect) {
    this.dialect = dialect;
  }
  get sequelize() {
    return this.dialect.sequelize;
  }
  get pool() {
    throw new Error('The "pool" property has been moved to the Sequelize instance.');
  }
  /**
   * Determine if a connection is still valid or not
   *
   * @param _connection
   */
  validate(_connection) {
    throw new Error(`validate not implemented in ${this.constructor.name}`);
  }
  async connect(_config) {
    throw new Error(`connect not implemented in ${this.constructor.name}`);
  }
  async disconnect(_connection) {
    throw new Error(`disconnect not implemented in ${this.constructor.name}`);
  }
}
//# sourceMappingURL=connection-manager.js.map
