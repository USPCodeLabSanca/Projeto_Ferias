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
var parse_bigint_exports = {};
__export(parse_bigint_exports, {
  parseBigInt: () => parseBigInt
});
module.exports = __toCommonJS(parse_bigint_exports);
var import_build_parser = require("../_internal/build-parser.js");
var import_inspect = require("../inspect.js");
var import_is_number = require("../predicates/is-number.js");
const BASE10_INTEGER_REGEX = /^(?<integerStr>-?[0-9]*)(\.(?<decimalStr>[0-9]+))?([eE](?<exponentStr>[-+]?[0-9]+))?$/;
function parseBigIntInternal(value) {
  if ((0, import_is_number.isNumber)(value)) {
    if (!Number.isSafeInteger(value)) {
      return null;
    }
    return BigInt(value);
  }
  if (value === "") {
    return null;
  }
  if (!BASE10_INTEGER_REGEX.test(value)) {
    return null;
  }
  try {
    return BigInt(value);
  } catch {
    return null;
  }
}
const parseBigInt = (0, import_build_parser.buildNullBasedParser)(
  parseBigIntInternal,
  (value) => `Cannot convert ${(0, import_inspect.inspect)(value)} to a BigInt.`
);
//# sourceMappingURL=parse-bigint.js.map
