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
var association_path_exports = {};
__export(association_path_exports, {
  AssociationPath: () => AssociationPath
});
module.exports = __toCommonJS(association_path_exports);
var import_base_sql_expression = require("./base-sql-expression.js");
class AssociationPath extends import_base_sql_expression.BaseSqlExpression {
  constructor(associationPath, attributeName) {
    super();
    this.associationPath = associationPath;
    this.attributeName = attributeName;
  }
}
//# sourceMappingURL=association-path.js.map
