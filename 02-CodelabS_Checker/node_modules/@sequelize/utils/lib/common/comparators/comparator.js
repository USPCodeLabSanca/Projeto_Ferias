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
var comparator_exports = {};
__export(comparator_exports, {
  SortDirection: () => SortDirection
});
module.exports = __toCommonJS(comparator_exports);
var SortDirection = /* @__PURE__ */ ((SortDirection2) => {
  SortDirection2[SortDirection2["ASC"] = 1] = "ASC";
  SortDirection2[SortDirection2["DESC"] = -1] = "DESC";
  return SortDirection2;
})(SortDirection || {});
//# sourceMappingURL=comparator.js.map
