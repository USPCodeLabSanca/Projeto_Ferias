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
var split_object_exports = {};
__export(split_object_exports, {
  splitObject: () => splitObject
});
module.exports = __toCommonJS(split_object_exports);
var import_pojo = require("./pojo.js");
function splitObject(object, keys) {
  const picked = (0, import_pojo.pojo)();
  const omitted = (0, import_pojo.pojo)();
  for (const key of Object.keys(object)) {
    if (keys.includes(key)) {
      picked[key] = object[key];
    } else {
      omitted[key] = object[key];
    }
  }
  return [picked, omitted];
}
//# sourceMappingURL=split-object.js.map
