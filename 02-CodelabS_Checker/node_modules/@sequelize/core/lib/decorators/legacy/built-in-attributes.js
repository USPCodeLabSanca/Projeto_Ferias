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
var built_in_attributes_exports = {};
__export(built_in_attributes_exports, {
  CreatedAt: () => CreatedAt,
  DeletedAt: () => DeletedAt,
  UpdatedAt: () => UpdatedAt,
  Version: () => Version
});
module.exports = __toCommonJS(built_in_attributes_exports);
var import_model_utils = require("../../utils/model-utils.js");
var import_model = require("../shared/model.js");
var import_decorator_utils = require("./decorator-utils.js");
function createBuiltInAttributeDecorator(decoratorName, callback) {
  return (0, import_decorator_utils.createOptionallyParameterizedPropertyDecorator)(
    decoratorName,
    void 0,
    (decoratorOption, target, propertyName) => {
      if (typeof target === "function") {
        (0, import_decorator_utils.throwMustBeInstanceProperty)(decoratorName, target, propertyName);
      }
      if (!(0, import_model_utils.isModelStatic)(target.constructor)) {
        (0, import_decorator_utils.throwMustBeModel)(decoratorName, target, propertyName);
      }
      if (typeof propertyName === "symbol") {
        (0, import_decorator_utils.throwMustBeAttribute)(decoratorName, target, propertyName);
      }
      callback(target.constructor, propertyName);
    }
  );
}
const CreatedAt = createBuiltInAttributeDecorator(
  "CreatedAt",
  (target, propertyName) => {
    (0, import_model.registerModelOptions)(target, {
      createdAt: propertyName,
      timestamps: true
    });
  }
);
const UpdatedAt = createBuiltInAttributeDecorator(
  "UpdatedAt",
  (target, propertyName) => {
    (0, import_model.registerModelOptions)(target, {
      updatedAt: propertyName,
      timestamps: true
    });
  }
);
const DeletedAt = createBuiltInAttributeDecorator(
  "DeletedAt",
  (target, propertyName) => {
    (0, import_model.registerModelOptions)(target, {
      deletedAt: propertyName,
      timestamps: true,
      paranoid: true
    });
  }
);
const Version = createBuiltInAttributeDecorator(
  "Version",
  (target, propertyName) => {
    (0, import_model.registerModelOptions)(target, {
      version: propertyName
    });
  }
);
//# sourceMappingURL=built-in-attributes.js.map
