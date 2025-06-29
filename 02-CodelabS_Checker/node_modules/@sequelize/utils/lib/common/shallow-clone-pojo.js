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
var shallow_clone_pojo_exports = {};
__export(shallow_clone_pojo_exports, {
  shallowClonePojo: () => shallowClonePojo
});
module.exports = __toCommonJS(shallow_clone_pojo_exports);
var import_pojo = require("./pojo.js");
var import_is_plain_object = require("./predicates/is-plain-object.js");
function shallowClonePojo(obj) {
  import_is_plain_object.isPlainObject.assert(obj);
  return Object.assign((0, import_pojo.pojo)(), obj);
}
//# sourceMappingURL=shallow-clone-pojo.js.map
