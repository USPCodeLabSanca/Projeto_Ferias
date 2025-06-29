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
  json: () => json
});
module.exports = __toCommonJS(json_exports);
var import_deprecations = require("../utils/deprecations.js");
var import_attribute = require("./attribute.js");
var import_where = require("./where.js");
function json(conditionsOrPath, value) {
  (0, import_deprecations.noSqlJson)();
  if (typeof conditionsOrPath === "string") {
    const attr = (0, import_attribute.attribute)(conditionsOrPath);
    if (value === void 0) {
      return attr;
    }
    return (0, import_where.where)(attr, value);
  }
  if (value === void 0 && typeof conditionsOrPath === "string") {
    return (0, import_attribute.attribute)(conditionsOrPath);
  }
  return (0, import_where.where)(conditionsOrPath);
}
//# sourceMappingURL=json.js.map
