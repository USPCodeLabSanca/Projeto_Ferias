"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("SetView", () => {
  const view = new import_utils.SetView(/* @__PURE__ */ new Set(["value"]));
  describe("size", () => {
    it("returns the number of unique elements in the Set", () => {
      (0, import_chai.expect)(view.size).to.eq(1);
    });
  });
  describe("has", () => {
    it("returns a boolean indicating whether an element with the specified value exists in the Set or not", () => {
      (0, import_chai.expect)(view.has("value")).to.be.true;
      (0, import_chai.expect)(view.has("unknown")).to.be.false;
    });
  });
  describe("find", () => {
    it("returns the element if the callback function returns true", () => {
      (0, import_chai.expect)(view.find((value) => value === "value")).to.eq("value");
    });
    it("returns undefined if the callback function does not return true for any element", () => {
      (0, import_chai.expect)(view.find((value) => value === "unknown")).to.be.undefined;
    });
  });
  describe("Symbol.iterator", () => {
    it("returns an iterator", () => {
      (0, import_chai.expect)([...view]).to.eql(["value"]);
    });
  });
  describe("values", () => {
    it("returns an iterator", () => {
      (0, import_chai.expect)([...view.values()]).to.eql(["value"]);
    });
  });
  describe("toMutableSet", () => {
    it("returns a new Set", () => {
      const set = view.toMutableSet();
      (0, import_chai.expect)(set).to.be.an.instanceOf(Set);
      (0, import_chai.expect)([...set.values()]).to.deep.eq([...view.values()]);
    });
  });
});
//# sourceMappingURL=set-view.test.js.map
