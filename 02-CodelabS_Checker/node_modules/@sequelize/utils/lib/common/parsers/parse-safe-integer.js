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
var parse_safe_integer_exports = {};
__export(parse_safe_integer_exports, {
  parseSafeInteger: () => parseSafeInteger
});
module.exports = __toCommonJS(parse_safe_integer_exports);
var import_build_parser = require("../_internal/build-parser.js");
var import_inspect = require("../inspect.js");
var import_is_big_int = require("../predicates/is-big-int.js");
var import_is_number = require("../predicates/is-number.js");
var import_is_valid_integer_syntax = require("../predicates/is-valid-integer-syntax.js");
var import_parse_finite_number = require("./parse-finite-number.js");
function parseSafeIntegerInternal(value, radix = 10) {
  let result;
  if ((0, import_is_number.isNumber)(value)) {
    result = value;
  } else if ((0, import_is_big_int.isBigInt)(value) || radix === 10) {
    result = (0, import_parse_finite_number.parseFiniteNumber)(value);
  } else {
    if (!(0, import_is_valid_integer_syntax.isValidIntegerSyntax)(value, radix)) {
      return null;
    }
    result = Number.parseInt(value, radix);
  }
  if (!Number.isSafeInteger(result)) {
    return null;
  }
  return result;
}
const parseSafeInteger = (0, import_build_parser.buildNullBasedParser)(
  parseSafeIntegerInternal,
  (value, radix = 10) => `Value ${(0, import_inspect.inspect)(value)} is not a valid base ${(0, import_inspect.inspect)(radix)} integer`
);
//# sourceMappingURL=parse-safe-integer.js.map
