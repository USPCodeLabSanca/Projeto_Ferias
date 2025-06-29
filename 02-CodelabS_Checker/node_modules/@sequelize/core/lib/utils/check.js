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
var check_exports = {};
__export(check_exports, {
  buildInvalidOptionReceivedError: () => buildInvalidOptionReceivedError,
  isDevEnv: () => isDevEnv,
  isErrorWithStringCode: () => isErrorWithStringCode,
  rejectInvalidOptions: () => rejectInvalidOptions
});
module.exports = __toCommonJS(check_exports);
var import_utils = require("@sequelize/utils");
var import_pickBy = __toESM(require("lodash/pickBy"));
function isErrorWithStringCode(val) {
  return val instanceof Error && // @ts-expect-error -- 'code' doesn't exist on Error, but it's dynamically added by Node
  typeof val.code === "string";
}
function isDevEnv() {
  return true;
}
function rejectInvalidOptions(methodName, dialect, allSupportableOptions, supportedOptions, receivedOptions) {
  const receivedOptionNames = Object.keys(
    // This removes any undefined or false values from the object
    // It is therefore _essential_ that boolean options are false by default!
    (0, import_pickBy.default)(receivedOptions, (value) => value !== void 0 && value !== false)
  );
  const parsedSupportedOptions = parseSupportedOptions(dialect, methodName, supportedOptions);
  const unsupportedOptions = receivedOptionNames.filter((optionName) => {
    return allSupportableOptions.has(optionName) && !parsedSupportedOptions.has(optionName);
  });
  if (unsupportedOptions.length > 0) {
    throw buildInvalidOptionReceivedError(methodName, dialect.name, unsupportedOptions);
  }
}
const SUPPORTED_OPTIONS_CACHE = /* @__PURE__ */ new WeakMap();
function parseSupportedOptions(dialect, methodName, rawSupportedOptions) {
  let dialectCache = SUPPORTED_OPTIONS_CACHE.get(dialect);
  if (!dialectCache) {
    dialectCache = /* @__PURE__ */ new Map();
    SUPPORTED_OPTIONS_CACHE.set(dialect, dialectCache);
  }
  let supportedOptions = dialectCache.get(methodName);
  if (!supportedOptions) {
    if ((0, import_utils.isIterable)(rawSupportedOptions)) {
      supportedOptions = new Set(rawSupportedOptions);
    } else {
      supportedOptions = /* @__PURE__ */ new Set();
      for (const optionName of Object.keys(rawSupportedOptions)) {
        if (rawSupportedOptions[optionName]) {
          supportedOptions.add(optionName);
        }
      }
    }
    dialectCache.set(methodName, supportedOptions);
  }
  return supportedOptions;
}
function buildInvalidOptionReceivedError(methodName, dialectName, invalidOptions) {
  return new Error(
    `The following options are not supported by ${methodName} in ${dialectName}: ${invalidOptions.join(", ")}`
  );
}
//# sourceMappingURL=check.js.map
