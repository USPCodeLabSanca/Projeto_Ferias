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
var where_exports = {};
__export(where_exports, {
  getComplexKeys: () => getComplexKeys,
  getComplexSize: () => getComplexSize,
  getOperators: () => getOperators
});
module.exports = __toCommonJS(where_exports);
var import_operators = require("../operators.js");
function getComplexKeys(obj) {
  return [...getOperators(obj), ...Object.keys(obj)];
}
function getComplexSize(obj) {
  return Array.isArray(obj) ? obj.length : getComplexKeys(obj).length;
}
const operatorsSet = new Set(Object.values(import_operators.Op));
function getOperators(obj) {
  return Object.getOwnPropertySymbols(obj).filter((s) => operatorsSet.has(s));
}
//# sourceMappingURL=where.js.map
