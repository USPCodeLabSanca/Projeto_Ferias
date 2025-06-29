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
var localized_string_comparator_exports = {};
__export(localized_string_comparator_exports, {
  localizedStringComparator: () => localizedStringComparator
});
module.exports = __toCommonJS(localized_string_comparator_exports);
var import_comparator = require("./comparator.js");
function localizedStringComparator(locale, direction = import_comparator.SortDirection.ASC, options) {
  return (a, b) => {
    return a.localeCompare(b, locale, { usage: "sort", ...options }) * direction;
  };
}
//# sourceMappingURL=localized-string-comparator.js.map
