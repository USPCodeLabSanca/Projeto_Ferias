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
var json_exports = {};
__export(json_exports, {
  buildJsonPath: () => buildJsonPath
});
module.exports = __toCommonJS(json_exports);
function quoteJsonPathIdentifier(identifier) {
  if (/^[a-z_][a-z0-9_]*$/i.test(identifier)) {
    return identifier;
  }
  return `"${identifier.replaceAll(/["\\]/g, (s) => `\\${s}`)}"`;
}
function buildJsonPath(path) {
  let jsonPathStr = "$";
  for (const pathElement of path) {
    if (typeof pathElement === "number") {
      jsonPathStr += `[${pathElement}]`;
    } else {
      jsonPathStr += `.${quoteJsonPathIdentifier(pathElement)}`;
    }
  }
  return jsonPathStr;
}
//# sourceMappingURL=json.js.map
