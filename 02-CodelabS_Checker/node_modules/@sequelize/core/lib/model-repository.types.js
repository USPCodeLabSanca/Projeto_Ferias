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
var model_repository_types_exports = {};
__export(model_repository_types_exports, {
  ManualOnDelete: () => ManualOnDelete
});
module.exports = __toCommonJS(model_repository_types_exports);
var ManualOnDelete = /* @__PURE__ */ ((ManualOnDelete2) => {
  ManualOnDelete2["paranoid"] = "paranoid";
  ManualOnDelete2["none"] = "none";
  ManualOnDelete2["all"] = "all";
  return ManualOnDelete2;
})(ManualOnDelete || {});
//# sourceMappingURL=model-repository.types.js.map
