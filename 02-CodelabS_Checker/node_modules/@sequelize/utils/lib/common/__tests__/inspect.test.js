"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("inspect function", () => {
  it("supports primitives", () => {
    (0, import_chai.expect)((0, import_utils.inspect)(123)).to.equal("123");
    (0, import_chai.expect)((0, import_utils.inspect)(123n)).to.equal("123n");
    (0, import_chai.expect)((0, import_utils.inspect)(null)).to.equal("null");
    (0, import_chai.expect)((0, import_utils.inspect)(void 0)).to.equal("undefined");
    (0, import_chai.expect)((0, import_utils.inspect)(true)).to.equal("true");
    (0, import_chai.expect)((0, import_utils.inspect)(false)).to.equal("false");
    (0, import_chai.expect)((0, import_utils.inspect)(Symbol("test"))).to.equal("Symbol(test)");
    (0, import_chai.expect)((0, import_utils.inspect)("test")).to.equal('"test"');
  });
  it("returns a function representation when the input is a function", () => {
    const input = function test() {
    };
    const result = (0, import_utils.inspect)(input);
    (0, import_chai.expect)(result).to.equal("[function test]");
  });
  it("supports anonymous functions", () => {
    const result = (0, import_utils.inspect)(() => {
    });
    (0, import_chai.expect)(result).to.equal("[function (anonymous)]");
  });
  it("returns an object representation when the input is an object", () => {
    (0, import_chai.expect)((0, import_utils.inspect)({ key: "value" })).to.equal("[object Object]");
    (0, import_chai.expect)((0, import_utils.inspect)(/* @__PURE__ */ new Date())).to.equal("[object Date]");
  });
});
//# sourceMappingURL=inspect.test.js.map
