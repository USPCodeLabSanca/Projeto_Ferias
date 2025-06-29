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
var inspect_exports = {};
__export(inspect_exports, {
  inspect: () => inspect
});
module.exports = __toCommonJS(inspect_exports);
var import_is_any_object = require("./predicates/is-any-object.js");
var import_is_big_int = require("./predicates/is-big-int.js");
var import_is_function = require("./predicates/is-function.js");
var import_is_string = require("./predicates/is-string.js");
function inspect(value) {
  if ((0, import_is_string.isString)(value)) {
    return JSON.stringify(value);
  }
  if ((0, import_is_big_int.isBigInt)(value)) {
    return `${String(value)}n`;
  }
  if ((0, import_is_function.isFunction)(value)) {
    return `[function ${value.name || "(anonymous)"}]`;
  }
  if ((0, import_is_any_object.isAnyObject)(value)) {
    return Object.prototype.toString.call(value);
  }
  return String(value);
}
//# sourceMappingURL=inspect.js.map
