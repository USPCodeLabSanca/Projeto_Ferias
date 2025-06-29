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
var query_interface_exports = {};
__export(query_interface_exports, {
  MySqlQueryInterface: () => MySqlQueryInterface
});
module.exports = __toCommonJS(query_interface_exports);
var import_core = require("@sequelize/core");
var import_object = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/object.js");
var import_sql = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/sql.js");
class MySqlQueryInterface extends import_core.AbstractQueryInterface {
  /**
   * A wrapper that fixes MySQL's inability to cleanly remove columns from existing tables if they have a foreign key constraint.
   *
   * @override
   */
  async removeColumn(tableName, columnName, options) {
    const foreignKeys = await this.showConstraints(tableName, {
      ...options,
      columnName,
      constraintType: "FOREIGN KEY"
    });
    await Promise.all(
      foreignKeys.map(
        (constraint) => this.removeConstraint(tableName, constraint.constraintName, options)
      )
    );
    await super.removeColumn(tableName, columnName, options);
  }
  /**
   * @override
   */
  async upsert(tableName, insertValues, updateValues, where, options) {
    if (options.bind) {
      (0, import_sql.assertNoReservedBind)(options.bind);
    }
    const modelDefinition = options.model.modelDefinition;
    options = { ...options };
    options.type = import_core.QueryTypes.UPSERT;
    options.updateOnDuplicate = Object.keys(updateValues);
    options.upsertKeys = Array.from(
      modelDefinition.primaryKeysAttributeNames,
      (pkAttrName) => modelDefinition.getColumnName(pkAttrName)
    );
    const { bind, query } = this.queryGenerator.insertQuery(
      tableName,
      insertValues,
      (0, import_object.getObjectFromMap)(modelDefinition.attributes),
      options
    );
    delete options.replacements;
    options.bind = (0, import_sql.combineBinds)(options.bind, bind);
    return await this.sequelize.queryRaw(query, options);
  }
}
//# sourceMappingURL=query-interface.js.map
