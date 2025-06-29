"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("MultiMap", () => {
  describe("constructor", () => {
    it("ignores duplicate values", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value", "value"]]]);
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq(["value"]);
    });
    it("does not store empty values", () => {
      const multiMap = new import_utils.MultiMap([["key", []]]);
      (0, import_chai.expect)(multiMap.has("key")).to.eq(false);
      (0, import_chai.expect)(multiMap.size).to.eq(0);
    });
  });
  describe("size", () => {
    it("returns the number of keys in the Map", () => {
      const multiMap = new import_utils.MultiMap();
      (0, import_chai.expect)(multiMap.size).to.eq(0);
      multiMap.append("key", "value1");
      (0, import_chai.expect)(multiMap.size).to.eq(1);
      multiMap.append("key", "value2");
      (0, import_chai.expect)(multiMap.size).to.eq(1);
      multiMap.append("key2", "value");
      (0, import_chai.expect)(multiMap.size).to.eq(2);
    });
  });
  describe("clear", () => {
    it("clears all the keys in the Map", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value"]]]);
      multiMap.clear();
      (0, import_chai.expect)(multiMap.size).to.eq(0);
    });
  });
  describe("append", () => {
    it("appends a value to the key", () => {
      const multiMap = new import_utils.MultiMap();
      multiMap.append("key", "value1");
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq(["value1"]);
      multiMap.append("key", "value2");
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq(["value1", "value2"]);
      multiMap.append("key", "value1");
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq(["value1", "value2"]);
    });
  });
  describe("deleteValue", () => {
    it("deletes a value from the key", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value"]]]);
      multiMap.deleteValue("key", "value");
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq([]);
      (0, import_chai.expect)(multiMap.has("key")).to.eq(false);
      (0, import_chai.expect)(multiMap.size).to.eq(0);
    });
  });
  describe("delete", () => {
    it("deletes a key from the Map", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value"]]]);
      multiMap.delete("key");
      (0, import_chai.expect)(multiMap.size).to.eq(0);
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq([]);
    });
  });
  describe("keys", () => {
    it("returns the keys of the Map", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value"]]]);
      (0, import_chai.expect)([...multiMap.keys()]).to.deep.eq(["key"]);
    });
  });
  describe("count", () => {
    it("returns the number of values for the key", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value1", "value2"]]]);
      (0, import_chai.expect)(multiMap.count("key")).to.eq(2);
    });
    it("returns 0 if the key does not exist", () => {
      const multiMap = new import_utils.MultiMap();
      (0, import_chai.expect)(multiMap.count("key")).to.eq(0);
    });
  });
  describe("values", () => {
    it("returns the values of the Map", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value1", "value2"]]]);
      (0, import_chai.expect)([...multiMap.values()]).to.deep.eq([["value1", "value2"]]);
    });
  });
  describe("entries", () => {
    it("returns the entries of the Map", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value1", "value2"]]]);
      (0, import_chai.expect)([...multiMap.entries()]).to.deep.eq([["key", ["value1", "value2"]]]);
    });
  });
  describe("has", () => {
    it("returns true if the key exists", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value"]]]);
      (0, import_chai.expect)(multiMap.has("key")).to.eq(true);
    });
    it("returns false if the key does not exist", () => {
      const multiMap = new import_utils.MultiMap();
      (0, import_chai.expect)(multiMap.has("key")).to.eq(false);
    });
  });
  describe("Symbol.iterator", () => {
    it("returns the iterator of the Map", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value1", "value2"]]]);
      (0, import_chai.expect)([...multiMap[Symbol.iterator]()]).to.deep.eq([["key", ["value1", "value2"]]]);
    });
  });
  describe("get", () => {
    it("returns the values of the key", () => {
      const multiMap = new import_utils.MultiMap([["key", ["value1", "value2"]]]);
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq(["value1", "value2"]);
    });
    it("returns an empty array if the key does not exist", () => {
      const multiMap = new import_utils.MultiMap();
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq([]);
    });
  });
  describe("set", () => {
    it("sets the values of the key", () => {
      const multiMap = new import_utils.MultiMap();
      multiMap.set("key", ["value1", "value2"]);
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq(["value1", "value2"]);
    });
    it("ignores duplicate values", () => {
      const multiMap = new import_utils.MultiMap();
      multiMap.set("key", ["value", "value"]);
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq(["value"]);
    });
    it("deletes empty values", () => {
      const multiMap = new import_utils.MultiMap();
      multiMap.set("key", ["value"]);
      multiMap.set("key", []);
      (0, import_chai.expect)(multiMap.has("key")).to.eq(false);
      (0, import_chai.expect)(multiMap.size).to.eq(0);
    });
    it("ignores mutations done after setting the value", () => {
      const multiMap = new import_utils.MultiMap();
      const values = ["value1", "value2"];
      multiMap.set("key", values);
      values.push("value3");
      (0, import_chai.expect)(multiMap.get("key")).to.deep.eq(["value1", "value2"]);
    });
  });
});
//# sourceMappingURL=multi-map.test.js.map
