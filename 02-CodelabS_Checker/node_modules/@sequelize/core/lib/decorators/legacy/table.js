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
var table_exports = {};
__export(table_exports, {
  Table: () => Table
});
module.exports = __toCommonJS(table_exports);
var import_model = require("../shared/model.js");
function Table(arg) {
  if (typeof arg === "function") {
    annotate(arg);
    return void 0;
  }
  const options = { ...arg };
  if (options.abstract) {
    throw new Error(
      "`abstract` is not a valid option for @Table. Did you mean to use @Table.Abstract?"
    );
  }
  return (target) => annotate(target, options);
}
function AbstractTable(arg) {
  if (typeof arg === "function") {
    annotate(arg, { abstract: true });
    return void 0;
  }
  const options = { ...arg, abstract: true };
  if (options.tableName || options.name) {
    throw new Error('Options "tableName" and "name" cannot be set on abstract models.');
  }
  return (target) => annotate(target, options);
}
Table.Abstract = AbstractTable;
function annotate(target, options = {}) {
  (0, import_model.registerModelOptions)(target, options);
}
//# sourceMappingURL=table.js.map
