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
var parse_boolean_exports = {};
__export(parse_boolean_exports, {
  parseBoolean: () => parseBoolean
});
module.exports = __toCommonJS(parse_boolean_exports);
var import_build_parser = require("../_internal/build-parser.js");
var import_inspect = require("../inspect.js");
const parseBoolean = (0, import_build_parser.buildNullBasedParser)(
  (value) => {
    value = value.toLowerCase();
    switch (value) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return null;
    }
  },
  (value) => `Cannot convert ${(0, import_inspect.inspect)(value)} to a boolean. It must be either "true" or "false".`
);
//# sourceMappingURL=parse-boolean.js.map
