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
var model_exports = {};
__export(model_exports, {
  initDecoratedModel: () => initDecoratedModel,
  isDecoratedModel: () => isDecoratedModel,
  mergeAttributeOptions: () => mergeAttributeOptions,
  registerModelAttributeOptions: () => registerModelAttributeOptions,
  registerModelOptions: () => registerModelOptions
});
module.exports = __toCommonJS(model_exports);
var import_utils = require("@sequelize/utils");
var import_data_types_utils = require("../../abstract-dialect/data-types-utils.js");
var import_base_error = require("../../errors/base-error.js");
var import_model_definition = require("../../model-definition.js");
var import_model_typescript = require("../../model-typescript.js");
var import_model_utils = require("../../utils/model-utils.js");
var import_object = require("../../utils/object.js");
const registeredOptions = /* @__PURE__ */ new WeakMap();
function registerModelOptions(model, options) {
  if (!registeredOptions.has(model)) {
    registeredOptions.set(model, { model: options, attributes: {} });
    return;
  }
  const existingModelOptions = registeredOptions.get(model).model;
  try {
    (0, import_model_definition.mergeModelOptions)(existingModelOptions, options, false);
  } catch (error) {
    throw new import_base_error.BaseError(
      `Multiple decorators are trying to register conflicting options on model ${model.name}`,
      { cause: error }
    );
  }
}
function registerModelAttributeOptions(model, attributeName, options) {
  if (!registeredOptions.has(model)) {
    registeredOptions.set(model, {
      model: {},
      attributes: {
        [attributeName]: options
      }
    });
    return;
  }
  const existingAttributesOptions = registeredOptions.get(model).attributes;
  if (!(attributeName in existingAttributesOptions)) {
    existingAttributesOptions[attributeName] = options;
    return;
  }
  const existingOptions = existingAttributesOptions[attributeName];
  mergeAttributeOptions(attributeName, model, existingOptions, options, false);
}
function mergeAttributeOptions(attributeName, model, existingOptions, options, overrideOnConflict) {
  for (const [optionName, optionValue] of Object.entries(options)) {
    if (existingOptions[optionName] === void 0) {
      existingOptions[optionName] = optionValue;
      continue;
    }
    if (optionName === "validate") {
      for (const [subOptionName, subOptionValue] of (0, import_object.getAllOwnEntries)(optionValue)) {
        if (subOptionName in existingOptions[optionName] && !overrideOnConflict) {
          throw new Error(
            `Multiple decorators are attempting to register option ${optionName}[${JSON.stringify(subOptionName)}] of attribute ${attributeName} on model ${model.name}.`
          );
        }
        existingOptions[optionName][subOptionName] = subOptionValue;
      }
      continue;
    }
    if (optionName === "index" || optionName === "unique") {
      if (!existingOptions[optionName]) {
        existingOptions[optionName] = [];
      } else if (!Array.isArray(existingOptions[optionName])) {
        existingOptions[optionName] = [existingOptions[optionName]];
      }
      if (Array.isArray(optionValue)) {
        existingOptions[optionName] = [...existingOptions[optionName], ...optionValue];
      } else {
        existingOptions[optionName] = [...existingOptions[optionName], optionValue];
      }
      continue;
    }
    if (optionValue === existingOptions[optionName] || overrideOnConflict) {
      continue;
    }
    throw new Error(
      `Multiple decorators are attempting to set different values for the option ${optionName} of attribute ${attributeName} on model ${model.name}.`
    );
  }
  return existingOptions;
}
function initDecoratedModel(model, sequelize) {
  const isAbstract = registeredOptions.get(model)?.model.abstract;
  if (isAbstract) {
    return false;
  }
  const modelOptions = getRegisteredModelOptions(model);
  const attributeOptions = getRegisteredAttributeOptions(model);
  (0, import_model_typescript.initModel)(model, attributeOptions, {
    ...modelOptions,
    sequelize
  });
  return true;
}
const NON_INHERITABLE_MODEL_OPTIONS = ["modelName", "name", "tableName"];
function getRegisteredModelOptions(model) {
  const modelOptions = registeredOptions.get(model)?.model ?? import_utils.EMPTY_OBJECT;
  const parentModel = Object.getPrototypeOf(model);
  if ((0, import_model_utils.isModelStatic)(parentModel)) {
    const parentModelOptions = { ...getRegisteredModelOptions(parentModel) };
    for (const nonInheritableOption of NON_INHERITABLE_MODEL_OPTIONS) {
      delete parentModelOptions[nonInheritableOption];
    }
    parentModelOptions.indexes = (0, import_object.cloneDeep)(parentModelOptions.indexes);
    parentModelOptions.defaultScope = (0, import_object.cloneDeep)(parentModelOptions.defaultScope);
    parentModelOptions.scopes = (0, import_object.cloneDeep)(parentModelOptions.scopes);
    parentModelOptions.validate = (0, import_object.cloneDeep)(parentModelOptions.validate);
    parentModelOptions.hooks = (0, import_object.cloneDeep)(parentModelOptions.hooks);
    return (0, import_model_definition.mergeModelOptions)(parentModelOptions, modelOptions, true);
  }
  return modelOptions;
}
function getRegisteredAttributeOptions(model) {
  const descendantAttributes = {
    ...registeredOptions.get(model)?.attributes ?? import_utils.EMPTY_OBJECT
  };
  const insertAfterAttributes = {};
  const insertBeforeAttributes = {};
  const parentModel = Object.getPrototypeOf(model);
  if ((0, import_model_utils.isModelStatic)(parentModel)) {
    const parentAttributes = getRegisteredAttributeOptions(parentModel);
    for (const attributeName of Object.keys(parentAttributes)) {
      const parentAttribute = { ...parentAttributes[attributeName] };
      if (parentAttribute.insertBefore && parentAttribute.insertAfter) {
        throw new Error(
          `Attribute ${attributeName} on model ${model.name} cannot have both 'insertBefore' and 'insertAfter' set to true.`
        );
      }
      if (parentAttribute.type) {
        if (typeof parentAttribute.type === "function") {
          parentAttribute.type = new parentAttribute.type();
        } else {
          parentAttribute.type = (0, import_data_types_utils.cloneDataType)(parentAttribute.type);
        }
      }
      parentAttribute.unique = (0, import_object.cloneDeep)(parentAttribute.unique);
      parentAttribute.index = (0, import_object.cloneDeep)(parentAttribute.index);
      parentAttribute.references = (0, import_object.cloneDeep)(parentAttribute.references);
      parentAttribute.validate = (0, import_object.cloneDeep)(parentAttribute.validate);
      const descendantAttribute = descendantAttributes[attributeName];
      if (descendantAttribute) {
        descendantAttributes[attributeName] = mergeAttributeOptions(
          attributeName,
          model,
          parentAttribute,
          descendantAttribute,
          true
        );
      } else if (parentAttribute.insertBefore) {
        insertBeforeAttributes[attributeName] = parentAttribute;
      } else {
        insertAfterAttributes[attributeName] = parentAttribute;
      }
    }
  }
  return {
    ...insertBeforeAttributes,
    ...descendantAttributes,
    ...insertAfterAttributes
  };
}
function isDecoratedModel(model) {
  return registeredOptions.has(model);
}
//# sourceMappingURL=model.js.map
