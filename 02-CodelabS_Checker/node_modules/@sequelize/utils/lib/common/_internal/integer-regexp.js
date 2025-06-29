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
var integer_regexp_exports = {};
__export(integer_regexp_exports, {
  MAX_RADIX_INCLUSIVE: () => MAX_RADIX_INCLUSIVE,
  MIN_RADIX_INCLUSIVE: () => MIN_RADIX_INCLUSIVE,
  getIsIntegerRegExp: () => getIsIntegerRegExp
});
module.exports = __toCommonJS(integer_regexp_exports);
const numericSymbols = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
const MAX_RADIX_INCLUSIVE = 36;
const MIN_RADIX_INCLUSIVE = 2;
const integerRegExps = Array.from({ length: numericSymbols.length });
function getIsIntegerRegExp(radix) {
  if (radix < MIN_RADIX_INCLUSIVE || radix > MAX_RADIX_INCLUSIVE) {
    throw new RangeError(
      `parseSafeInteger() radix argument must be between ${MIN_RADIX_INCLUSIVE} and ${MAX_RADIX_INCLUSIVE}`
    );
  }
  const existingRegExp = integerRegExps[radix];
  if (existingRegExp) {
    return existingRegExp;
  }
  const characterSet = numericSymbols.slice(0, radix);
  const newRegExp = new RegExp(`^-?[${characterSet.join("")}]+$`, "i");
  integerRegExps[radix] = newRegExp;
  return newRegExp;
}
//# sourceMappingURL=integer-regexp.js.map
