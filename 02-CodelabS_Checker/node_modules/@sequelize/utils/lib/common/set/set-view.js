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
var set_view_exports = {};
__export(set_view_exports, {
  SetView: () => SetView
});
module.exports = __toCommonJS(set_view_exports);
var import_find = require("../iterator-utils/find.js");
class SetView {
  #target;
  /**
   * @returns the number of (unique) elements in Set.
   */
  get size() {
    return this.#target.size;
  }
  constructor(target) {
    this.#target = target;
  }
  /**
   * @param value
   * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
   */
  has(value) {
    return this.#target.has(value);
  }
  find(callback) {
    return (0, import_find.find)(this, callback);
  }
  [Symbol.iterator]() {
    return this.#target[Symbol.iterator]();
  }
  values() {
    return this.#target.values();
  }
  toMutableSet() {
    return new Set(this.#target);
  }
  firstValue() {
    return this.#target.values().next().value;
  }
}
//# sourceMappingURL=set-view.js.map
