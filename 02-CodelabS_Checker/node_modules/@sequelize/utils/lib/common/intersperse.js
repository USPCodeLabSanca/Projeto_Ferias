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
var intersperse_exports = {};
__export(intersperse_exports, {
  intersperse: () => intersperse
});
module.exports = __toCommonJS(intersperse_exports);
var import_is_function = require("./predicates/is-function.js");
function intersperse(list, separator) {
  const res = [];
  if (list.length === 0) {
    return res;
  }
  const separatorIsFunction = (0, import_is_function.isFunction)(separator);
  let i = 0;
  res.push(list[i++]);
  while (i < list.length) {
    res.push(separatorIsFunction ? separator(i) : separator, list[i++]);
  }
  return res;
}
//# sourceMappingURL=intersperse.js.map
