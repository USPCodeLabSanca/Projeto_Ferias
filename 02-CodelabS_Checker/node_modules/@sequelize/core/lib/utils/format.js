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
var format_exports = {};
__export(format_exports, {
  getAttributeName: () => getAttributeName,
  getColumnName: () => getColumnName,
  mapFinderOptions: () => mapFinderOptions,
  mapOptionFieldNames: () => mapOptionFieldNames,
  mapValueFieldNames: () => mapValueFieldNames,
  removeNullishValuesFromHash: () => removeNullishValuesFromHash
});
module.exports = __toCommonJS(format_exports);
var import_forIn = __toESM(require("lodash/forIn"));
var import_node_assert = __toESM(require("node:assert"));
function mapFinderOptions(options, Model) {
  if (Array.isArray(options.attributes)) {
    options.attributes = Model._injectDependentVirtualAttributes(options.attributes);
    const modelDefinition = Model.modelDefinition;
    options.attributes = options.attributes.filter(
      (attributeName) => !modelDefinition.virtualAttributeNames.has(attributeName)
    );
  }
  mapOptionFieldNames(options, Model);
  return options;
}
function mapOptionFieldNames(options, Model) {
  const out = options;
  if (Array.isArray(options.attributes)) {
    out.attributes = options.attributes.map((attributeName) => {
      if (typeof attributeName !== "string") {
        return attributeName;
      }
      const columnName = Model.modelDefinition.getColumnNameLoose(attributeName);
      if (columnName !== attributeName) {
        return [columnName, attributeName];
      }
      return attributeName;
    });
  }
  return out;
}
function mapValueFieldNames(dataValues, attributeNames, ModelClass) {
  const values = /* @__PURE__ */ Object.create(null);
  const modelDefinition = ModelClass.modelDefinition;
  for (const attributeName of attributeNames) {
    if (dataValues[attributeName] !== void 0 && !modelDefinition.virtualAttributeNames.has(attributeName)) {
      const columnName = modelDefinition.getColumnNameLoose(attributeName);
      values[columnName] = dataValues[attributeName];
    }
  }
  return values;
}
function removeNullishValuesFromHash(hash, omitNull, options) {
  let result = hash;
  const allowNull = options?.allowNull ?? [];
  if (!omitNull) {
    return result;
  }
  const _hash = /* @__PURE__ */ Object.create(null);
  (0, import_forIn.default)(hash, (val, key) => {
    if (allowNull.includes(key) || key.endsWith("Id") || val !== null && val !== void 0) {
      _hash[key] = val;
    }
  });
  result = _hash;
  return result;
}
function getColumnName(attribute) {
  (0, import_node_assert.default)(attribute.fieldName != null, "getColumnName expects a normalized attribute meta");
  return attribute.field || attribute.fieldName;
}
function getAttributeName(model, columnName) {
  return Object.values(model.getAttributes()).find((attribute) => attribute.field === columnName)?.fieldName ?? null;
}
//# sourceMappingURL=format.js.map
