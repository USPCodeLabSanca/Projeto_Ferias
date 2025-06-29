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
var freeze_deep_exports = {};
__export(freeze_deep_exports, {
  freezeDeep: () => freezeDeep,
  freezeDescendants: () => freezeDescendants
});
module.exports = __toCommonJS(freeze_deep_exports);
var import_is_plain_object = require("./predicates/is-plain-object.js");
function freezeDeep(obj) {
  Object.freeze(obj);
  freezeDescendants(obj);
  return obj;
}
function freezeDescendants(obj) {
  for (const descendant of Object.values(obj)) {
    if ((0, import_is_plain_object.isPlainObject)(descendant) || Array.isArray(descendant)) {
      freezeDeep(descendant);
    }
  }
  return obj;
}
//# sourceMappingURL=freeze-deep.js.map
