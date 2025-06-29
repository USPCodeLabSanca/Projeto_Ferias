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
var is_valid_number_syntax_exports = {};
__export(is_valid_number_syntax_exports, {
  isValidNumberSyntax: () => isValidNumberSyntax
});
module.exports = __toCommonJS(is_valid_number_syntax_exports);
const BASE10_NUMBER_REGEX = /^-?[0-9]*(\.[0-9]+)?([eE][-+]?[0-9]+)?$/;
function isValidNumberSyntax(value) {
  return value !== "" && value !== "-" && BASE10_NUMBER_REGEX.test(value);
}
//# sourceMappingURL=is-valid-number-syntax.js.map
