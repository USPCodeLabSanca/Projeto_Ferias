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
var build_predicate_function_exports = {};
__export(build_predicate_function_exports, {
  buildAssertionFunction: () => buildAssertionFunction,
  buildErrorMessage: () => buildErrorMessage,
  toBe: () => toBe
});
module.exports = __toCommonJS(build_predicate_function_exports);
function buildAssertionFunction(isAssertedType, buildError) {
  const isType = (value) => {
    return isAssertedType(value);
  };
  const isNotType = (value) => {
    return !isAssertedType(value);
  };
  isType.assert = (value, message) => {
    if (!isType(value)) {
      throw new Error(message ?? buildError(value, true));
    }
  };
  const assertIsNotType = (value, message) => {
    if (isType(value)) {
      throw new Error(message ?? buildError(value, false));
    }
  };
  isNotType.assert = assertIsNotType;
  return [isType, isNotType];
}
function toBe(validValueOrType) {
  return function buildToBeErrorMessage(value, shouldEqual) {
    return buildErrorMessage(validValueOrType, value, shouldEqual);
  };
}
function buildErrorMessage(validValueOrType, value, shouldEqual) {
  return `expected value ${shouldEqual ? "" : "not "}to be ${validValueOrType} but got ${JSON.stringify(
    value
  )} instead`;
}
//# sourceMappingURL=build-predicate-function.js.map
