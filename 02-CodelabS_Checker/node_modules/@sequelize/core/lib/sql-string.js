"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sql_string_exports = {};
__export(sql_string_exports, {
  bestGuessDataTypeOfVal: () => bestGuessDataTypeOfVal,
  getTextDataTypeForDialect: () => getTextDataTypeForDialect
});
module.exports = __toCommonJS(sql_string_exports);
var DataTypes = __toESM(require("./data-types"));
var import_logger = require("./utils/logger");
const textDataTypeMap = /* @__PURE__ */ new Map();
function getTextDataTypeForDialect(dialect) {
  let type = textDataTypeMap.get(dialect.name);
  if (type == null) {
    type = new DataTypes.STRING().toDialectDataType(dialect);
    textDataTypeMap.set(dialect.name, type);
  }
  return type;
}
function bestGuessDataTypeOfVal(val, dialect) {
  switch (typeof val) {
    case "bigint":
      return new DataTypes.BIGINT().toDialectDataType(dialect);
    case "number": {
      if (Number.isSafeInteger(val)) {
        return new DataTypes.INTEGER().toDialectDataType(dialect);
      }
      return new DataTypes.FLOAT().toDialectDataType(dialect);
    }
    case "boolean":
      return new DataTypes.BOOLEAN().toDialectDataType(dialect);
    case "object":
      if (Array.isArray(val)) {
        if (val.length === 0) {
          throw new Error(
            `Could not guess type of value ${import_logger.logger.inspect(val)} because it is an empty array`
          );
        }
        return new DataTypes.ARRAY(bestGuessDataTypeOfVal(val[0], dialect)).toDialectDataType(
          dialect
        );
      }
      if (val instanceof Date) {
        return new DataTypes.DATE(3).toDialectDataType(dialect);
      }
      if (Buffer.isBuffer(val)) {
        if (dialect.name === "ibmi") {
          return new DataTypes.STRING().toDialectDataType(dialect);
        }
        return new DataTypes.BLOB().toDialectDataType(dialect);
      }
      break;
    case "string":
      return getTextDataTypeForDialect(dialect);
    default:
  }
  throw new TypeError(`Could not guess type of value ${import_logger.logger.inspect(val)}`);
}
//# sourceMappingURL=sql-string.js.map
