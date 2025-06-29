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
var is_number_exports = {};
__export(is_number_exports, {
  isNotNumber: () => isNotNumber,
  isNumber: () => isNumber
});
module.exports = __toCommonJS(is_number_exports);
var import_build_predicate_function = require("../_internal/build-predicate-function.js");
const tuple = (0, import_build_predicate_function.buildAssertionFunction)((value) => {
  return typeof value === "number";
}, (0, import_build_predicate_function.toBe)("an IEEE 754 number"));
const isNumber = tuple[0];
const isNotNumber = tuple[1];
//# sourceMappingURL=is-number.js.map
