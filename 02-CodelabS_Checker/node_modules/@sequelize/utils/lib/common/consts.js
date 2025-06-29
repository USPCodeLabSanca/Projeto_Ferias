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
var consts_exports = {};
__export(consts_exports, {
  EMPTY_ARRAY: () => EMPTY_ARRAY,
  EMPTY_OBJECT: () => EMPTY_OBJECT
});
module.exports = __toCommonJS(consts_exports);
var import_pojo = require("./pojo.js");
const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = (
  // eslint-disable-next-line -- false positive
  Object.freeze((0, import_pojo.pojo)())
);
//# sourceMappingURL=consts.js.map
