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
var map_view_exports = {};
__export(map_view_exports, {
  MapView: () => MapView
});
module.exports = __toCommonJS(map_view_exports);
class MapView {
  #target;
  /**
   * @returns the number of elements in the Map.
   */
  get size() {
    return this.#target.size;
  }
  constructor(target) {
    this.#target = target;
  }
  /**
   * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
   *
   * @param key
   * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
   */
  get(key) {
    return this.#target.get(key);
  }
  getOrThrow(key) {
    if (!this.#target.has(key)) {
      throw new Error(`No value found for key: ${key}`);
    }
    return this.#target.get(key);
  }
  /**
   * @param key
   * @returns boolean indicating whether an element with the specified key exists or not.
   */
  has(key) {
    return this.#target.has(key);
  }
  [Symbol.iterator]() {
    return this.#target[Symbol.iterator]();
  }
  entries() {
    return this.#target.entries();
  }
  keys() {
    return this.#target.keys();
  }
  values() {
    return this.#target.values();
  }
  toMutableMap() {
    return new Map(this.#target);
  }
}
//# sourceMappingURL=map-view.js.map
