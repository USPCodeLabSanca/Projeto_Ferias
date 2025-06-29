"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_node_util = __toESM(require("node:util"));
describe("MapView", () => {
  const view = new import_utils.MapView(/* @__PURE__ */ new Map([["key", "value"]]));
  describe("size", () => {
    it("returns the number of elements in the Map", () => {
      (0, import_chai.expect)(view.size).to.eq(1);
    });
  });
  describe("get", () => {
    it("returns the element associated with the specified key", () => {
      (0, import_chai.expect)(view.get("key")).to.eq("value");
    });
    it("returns undefined if no element is associated with the specified key", () => {
      (0, import_chai.expect)(view.get("unknown")).to.be.undefined;
    });
  });
  describe("getOrThrow", () => {
    it("returns the element associated with the specified key", () => {
      (0, import_chai.expect)(view.getOrThrow("key")).to.eq("value");
    });
    it("throws an error if no element is associated with the specified key", () => {
      (0, import_chai.expect)(() => view.getOrThrow("unknown")).to.throw("No value found for key: unknown");
    });
  });
  describe("has", () => {
    it("returns a boolean indicating whether an element with the specified key exists or not", () => {
      (0, import_chai.expect)(view.has("key")).to.be.true;
      (0, import_chai.expect)(view.has("unknown")).to.be.false;
    });
  });
  describe("Symbol.iterator", () => {
    it("returns an iterator", () => {
      (0, import_chai.expect)([...view]).to.eql([["key", "value"]]);
    });
  });
  describe("entries", () => {
    it("returns an iterator", () => {
      (0, import_chai.expect)([...view.entries()]).to.eql([["key", "value"]]);
    });
  });
  describe("keys", () => {
    it("returns an iterator", () => {
      (0, import_chai.expect)([...view.keys()]).to.eql(["key"]);
    });
  });
  describe("values", () => {
    it("returns an iterator", () => {
      (0, import_chai.expect)([...view.values()]).to.eql(["value"]);
    });
  });
  describe("toMutableMap", () => {
    it("returns a new Map", () => {
      const map = view.toMutableMap();
      (0, import_chai.expect)(map).to.be.an.instanceOf(Map);
      (0, import_chai.expect)([...map.entries()]).to.deep.eq([...view.entries()]);
    });
  });
  it("reflects mutations done to the original map", () => {
    const original = /* @__PURE__ */ new Map([["key", "value"]]);
    const newView = new import_utils.MapView(original);
    original.set("newKey", "newValue");
    (0, import_chai.expect)(newView.get("newKey")).to.eq("newValue");
  });
  it("is inspectable", () => {
    (0, import_chai.expect)(import_node_util.default.inspect(view)).to.eq("MapView(1) { 'key' => 'value' }");
  });
});
//# sourceMappingURL=map-view.test.js.map
