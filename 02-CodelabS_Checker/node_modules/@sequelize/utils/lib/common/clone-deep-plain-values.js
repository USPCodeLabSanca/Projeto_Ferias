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
var clone_deep_plain_values_exports = {};
__export(clone_deep_plain_values_exports, {
  cloneDeepPlainValues: () => cloneDeepPlainValues
});
module.exports = __toCommonJS(clone_deep_plain_values_exports);
var import_pojo = require("./pojo.js");
var import_is_any_object = require("./predicates/is-any-object.js");
function cloneDeepPlainValues(value, transferUnclonables) {
  if (Array.isArray(value)) {
    return value.map((val) => cloneDeepPlainValues(val, transferUnclonables));
  }
  if ((0, import_is_any_object.isAnyObject)(value)) {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== null && prototype !== Object.prototype) {
      if (transferUnclonables) {
        return value;
      }
      throw new Error("This function can only clone plain objects, arrays and primitives");
    }
    const out = (0, import_pojo.pojo)();
    for (const key of Object.keys(value)) {
      out[key] = cloneDeepPlainValues(value[key], transferUnclonables);
    }
    return out;
  }
  return value;
}
//# sourceMappingURL=clone-deep-plain-values.js.map
