"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_expect_type = require("expect-type");
describe("isAnyObject", () => {
  it("returns true for plain objects", () => {
    (0, import_chai.expect)((0, import_utils.isAnyObject)({})).to.be.true;
  });
  it("returns true for functions", () => {
    (0, import_chai.expect)((0, import_utils.isAnyObject)(() => {
    })).to.be.true;
  });
  it("returns true for non-plain objects", () => {
    (0, import_chai.expect)((0, import_utils.isAnyObject)(/* @__PURE__ */ new Date())).to.be.true;
    (0, import_chai.expect)((0, import_utils.isAnyObject)([1, 2, 3])).to.be.true;
  });
  it("returns false for primitives", () => {
    (0, import_chai.expect)((0, import_utils.isAnyObject)(null)).to.be.false;
    (0, import_chai.expect)((0, import_utils.isAnyObject)(42)).to.be.false;
    (0, import_chai.expect)((0, import_utils.isAnyObject)("string")).to.be.false;
    (0, import_chai.expect)((0, import_utils.isAnyObject)(true)).to.be.false;
    (0, import_chai.expect)((0, import_utils.isAnyObject)(void 0)).to.be.false;
    (0, import_chai.expect)((0, import_utils.isAnyObject)(Symbol("symbol"))).to.be.false;
    (0, import_chai.expect)((0, import_utils.isAnyObject)(123n)).to.be.false;
  });
  it("narrows the TypeScript type", () => {
    const value = (0, import_utils.upcast)(null);
    if ((0, import_utils.isAnyObject)(value)) {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    } else {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    }
  });
});
//# sourceMappingURL=is-any-object.test.js.map
