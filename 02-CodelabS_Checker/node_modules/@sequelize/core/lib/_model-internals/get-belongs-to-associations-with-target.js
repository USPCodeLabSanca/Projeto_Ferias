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
var get_belongs_to_associations_with_target_exports = {};
__export(get_belongs_to_associations_with_target_exports, {
  getBelongsToAssociationsWithTarget: () => getBelongsToAssociationsWithTarget
});
module.exports = __toCommonJS(get_belongs_to_associations_with_target_exports);
var import_associations = require("../associations/index.js");
function getBelongsToAssociationsWithTarget(target) {
  const sequelize = target.sequelize;
  const associations = [];
  for (const model of sequelize.models) {
    for (const association of Object.values(model.associations)) {
      if (association instanceof import_associations.BelongsToAssociation && association.target === target) {
        associations.push(association);
      }
    }
  }
  return associations;
}
//# sourceMappingURL=get-belongs-to-associations-with-target.js.map
