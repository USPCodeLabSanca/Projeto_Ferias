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
var multi_map_exports = {};
__export(multi_map_exports, {
  MultiMap: () => MultiMap
});
module.exports = __toCommonJS(multi_map_exports);
var import_uniq = __toESM(require("lodash/uniq.js"));
var import_consts = require("../consts.js");
class MultiMap {
  #internalMap = /* @__PURE__ */ new Map();
  constructor(entries) {
    if (entries) {
      for (const [key, values] of entries) {
        this.set(key, values);
      }
    }
  }
  get size() {
    return this.#internalMap.size;
  }
  clear() {
    this.#internalMap.clear();
  }
  append(key, value) {
    const valueSet = this.#internalMap.get(key);
    if (valueSet?.includes(value)) {
      return this;
    }
    const newValue = valueSet ? [...valueSet, value] : [value];
    Object.freeze(newValue);
    this.#internalMap.set(key, newValue);
    return this;
  }
  deleteValue(key, value) {
    const valueSet = this.#internalMap.get(key);
    if (valueSet == null) {
      return false;
    }
    const newValueSet = valueSet.filter((val) => val !== value);
    if (newValueSet.length === valueSet.length) {
      return false;
    }
    if (newValueSet.length === 0) {
      this.#internalMap.delete(key);
      return true;
    }
    Object.freeze(newValueSet);
    this.#internalMap.set(key, newValueSet);
    return true;
  }
  delete(key) {
    return this.#internalMap.delete(key);
  }
  keys() {
    return this.#internalMap.keys();
  }
  count(key) {
    const values = this.#internalMap.get(key);
    return values?.length ?? 0;
  }
  [Symbol.iterator]() {
    return this.#internalMap[Symbol.iterator]();
  }
  entries() {
    return this.#internalMap.entries();
  }
  get(key) {
    return this.#internalMap.get(key) ?? import_consts.EMPTY_ARRAY;
  }
  has(key) {
    return this.#internalMap.has(key);
  }
  set(key, values) {
    if (values.length === 0) {
      this.#internalMap.delete(key);
      return this;
    }
    const uniqueValues = Object.freeze((0, import_uniq.default)(values));
    this.#internalMap.set(key, uniqueValues);
    return this;
  }
  values() {
    return this.#internalMap.values();
  }
}
//# sourceMappingURL=multi-map.js.map
