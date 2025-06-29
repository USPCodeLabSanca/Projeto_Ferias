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
var uuid_exports = {};
__export(uuid_exports, {
  SqlUuidV1: () => SqlUuidV1,
  SqlUuidV4: () => SqlUuidV4
});
module.exports = __toCommonJS(uuid_exports);
var import_node_crypto = __toESM(require("node:crypto"));
var import_uuid = require("uuid");
var import_dialect_aware_fn = require("./dialect-aware-fn.js");
class SqlUuidV4 extends import_dialect_aware_fn.DialectAwareFn {
  get maxArgCount() {
    return 0;
  }
  get minArgCount() {
    return 0;
  }
  supportsJavaScript() {
    return true;
  }
  applyForJavaScript() {
    return import_node_crypto.default.randomUUID();
  }
  supportsDialect(dialect) {
    return dialect.supports.uuidV4Generation;
  }
  applyForDialect(dialect) {
    return dialect.queryGenerator.getUuidV4FunctionCall();
  }
}
class SqlUuidV1 extends import_dialect_aware_fn.DialectAwareFn {
  get maxArgCount() {
    return 0;
  }
  get minArgCount() {
    return 0;
  }
  supportsJavaScript() {
    return true;
  }
  applyForJavaScript() {
    return (0, import_uuid.v1)();
  }
  supportsDialect(dialect) {
    return dialect.supports.uuidV1Generation;
  }
  applyForDialect(dialect) {
    return dialect.queryGenerator.getUuidV1FunctionCall();
  }
}
//# sourceMappingURL=uuid.js.map
