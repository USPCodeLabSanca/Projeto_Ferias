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
var parse_finite_number_exports = {};
__export(parse_finite_number_exports, {
  parseFiniteNumber: () => parseFiniteNumber
});
module.exports = __toCommonJS(parse_finite_number_exports);
var import_build_parser = require("../_internal/build-parser.js");
var import_inspect = require("../inspect.js");
var import_is_big_int = require("../predicates/is-big-int.js");
var import_is_valid_number_syntax = require("../predicates/is-valid-number-syntax.js");
function parseFiniteNumberInternal(value) {
  if ((0, import_is_big_int.isBigInt)(value)) {
    if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
      return null;
    }
    return Number(value);
  }
  if (!(0, import_is_valid_number_syntax.isValidNumberSyntax)(value)) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return parsed;
}
const parseFiniteNumber = (0, import_build_parser.buildNullBasedParser)(
  parseFiniteNumberInternal,
  (value) => `Cannot convert ${(0, import_inspect.inspect)(value)} to a finite number.`
);
//# sourceMappingURL=parse-finite-number.js.map
