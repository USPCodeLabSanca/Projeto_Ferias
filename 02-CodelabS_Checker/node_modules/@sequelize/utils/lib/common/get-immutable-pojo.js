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
var get_immutable_pojo_exports = {};
__export(get_immutable_pojo_exports, {
  getImmutablePojo: () => getImmutablePojo
});
module.exports = __toCommonJS(get_immutable_pojo_exports);
var import_shallow_clone_pojo = require("./shallow-clone-pojo.js");
function getImmutablePojo(obj) {
  if (Object.isFrozen(obj) && Object.getPrototypeOf(obj) === null) {
    return obj;
  }
  return Object.freeze((0, import_shallow_clone_pojo.shallowClonePojo)(obj));
}
//# sourceMappingURL=get-immutable-pojo.js.map
