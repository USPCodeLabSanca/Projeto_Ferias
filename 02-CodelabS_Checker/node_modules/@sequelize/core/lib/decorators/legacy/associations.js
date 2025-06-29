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
var associations_exports = {};
__export(associations_exports, {
  BelongsTo: () => BelongsTo,
  BelongsToMany: () => BelongsToMany,
  HasMany: () => HasMany,
  HasOne: () => HasOne,
  initDecoratedAssociations: () => initDecoratedAssociations
});
module.exports = __toCommonJS(associations_exports);
var import_utils = require("@sequelize/utils");
var import_node_util = require("node:util");
var import_helpers = require("../../associations/helpers.js");
var import_associations = require("../../associations/index.js");
var import_model_utils = require("../../utils/model-utils.js");
var import_decorator_utils = require("./decorator-utils.js");
const registeredAssociations = /* @__PURE__ */ new WeakMap();
function decorateAssociation(type, source, target, associationName, options) {
  if (typeof source === "function") {
    (0, import_decorator_utils.throwMustBeInstanceProperty)(type, source, associationName);
  }
  const sourceClass = source.constructor;
  if (!(0, import_model_utils.isModelStatic)(sourceClass)) {
    (0, import_decorator_utils.throwMustBeModel)(type, source, associationName);
  }
  if (typeof associationName === "symbol") {
    throw new TypeError(
      "Symbol associations are not currently supported. We welcome a PR that implements this feature."
    );
  }
  if (options.as) {
    throw new Error(
      'The "as" option is not allowed when using association decorators. The name of the decorated field is used as the association name.'
    );
  }
  const associations = registeredAssociations.get(sourceClass) ?? [];
  registeredAssociations.set(sourceClass, associations);
  associations.push({ source: sourceClass, target, options, associationName, type });
}
function HasOne(target, optionsOrForeignKey) {
  return (source, associationName) => {
    const options = (0, import_utils.isString)(optionsOrForeignKey) ? { foreignKey: optionsOrForeignKey } : optionsOrForeignKey;
    decorateAssociation("HasOne", source, target, associationName, options);
  };
}
function HasMany(target, optionsOrForeignKey) {
  return (source, associationName) => {
    const options = (0, import_utils.isString)(optionsOrForeignKey) ? { foreignKey: optionsOrForeignKey } : optionsOrForeignKey;
    decorateAssociation("HasMany", source, target, associationName, options);
  };
}
function BelongsTo(target, optionsOrForeignKey) {
  return (source, associationName) => {
    const options = (0, import_utils.isString)(optionsOrForeignKey) ? { foreignKey: optionsOrForeignKey } : optionsOrForeignKey;
    decorateAssociation("BelongsTo", source, target, associationName, options);
  };
}
function BelongsToMany(target, options) {
  return (source, associationName) => {
    decorateAssociation("BelongsToMany", source, target, associationName, options);
  };
}
function initDecoratedAssociations(source, sequelize) {
  const associations = getDeclaredAssociations(source);
  if (!associations.length) {
    return;
  }
  for (const association of associations) {
    const { type, target: targetGetter, associationName } = association;
    const options = { ...association.options, as: associationName };
    const target = (0, import_helpers.getForwardedModel)(targetGetter, sequelize);
    switch (type) {
      case "BelongsTo":
        import_associations.BelongsToAssociation.associate(
          import_helpers.AssociationSecret,
          source,
          target,
          options
        );
        break;
      case "HasOne":
        import_associations.HasOneAssociation.associate(
          import_helpers.AssociationSecret,
          source,
          target,
          options
        );
        break;
      case "HasMany":
        import_associations.HasManyAssociation.associate(
          import_helpers.AssociationSecret,
          source,
          target,
          options
        );
        break;
      case "BelongsToMany":
        import_associations.BelongsToManyAssociation.associate(
          import_helpers.AssociationSecret,
          source,
          target,
          options
        );
        break;
      default:
        throw new Error(`Unknown association type: ${type}`);
    }
  }
}
function getDeclaredAssociations(model) {
  const associations = registeredAssociations.get(model) ?? import_utils.EMPTY_ARRAY;
  const parentModel = Object.getPrototypeOf(model);
  if ((0, import_model_utils.isModelStatic)(parentModel)) {
    const parentAssociations = getDeclaredAssociations(parentModel);
    for (const parentAssociation of parentAssociations) {
      if (parentAssociation.type !== "BelongsTo") {
        throw new Error(
          `Models that use @HasOne, @HasMany, or @BelongsToMany associations cannot be inherited from, as they would add conflicting foreign keys on the target model.
Only @BelongsTo associations can be inherited, as it will add the foreign key on the source model.
Remove the ${parentAssociation.type} association ${(0, import_node_util.inspect)(parentAssociation.associationName)} from model ${(0, import_node_util.inspect)(parentModel.name)} to fix this error.`
        );
      }
      if ("inverse" in parentAssociation.options) {
        throw new Error(
          `Models that use @BelongsTo associations with the "inverse" option cannot be inherited from, as they would add conflicting associations on the target model.
Only @BelongsTo associations without the "inverse" option can be inherited, as they do not declare an association on the target model.
Remove the "inverse" option from association ${(0, import_node_util.inspect)(parentAssociation.associationName)} on model ${(0, import_node_util.inspect)(parentModel.name)} to fix this error.`
        );
      }
    }
    return [...parentAssociations, ...associations];
  }
  return associations;
}
//# sourceMappingURL=associations.js.map
