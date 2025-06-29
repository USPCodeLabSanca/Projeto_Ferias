"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_expect_type = require("expect-type");
describe("isPlainObject", () => {
  it("returns true for plain object (Object prototype or null prototype)", () => {
    (0, import_chai.expect)((0, import_utils.isPlainObject)({})).to.be.true;
    (0, import_chai.expect)((0, import_utils.isPlainObject)((0, import_utils.pojo)())).to.be.true;
  });
  it("returns false for non-plain object", () => {
    (0, import_chai.expect)((0, import_utils.isPlainObject)(42)).to.be.false;
    (0, import_chai.expect)((0, import_utils.isPlainObject)("42")).to.be.false;
    (0, import_chai.expect)((0, import_utils.isPlainObject)(() => {
    })).to.be.false;
    (0, import_chai.expect)((0, import_utils.isPlainObject)(/* @__PURE__ */ new Date())).to.be.false;
    (0, import_chai.expect)((0, import_utils.isPlainObject)([])).to.be.false;
  });
  it("narrows the TypeScript type", () => {
    const value = (0, import_utils.upcast)(null);
    if ((0, import_utils.isPlainObject)(value)) {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    } else {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    }
  });
});
//# sourceMappingURL=is-plain-object.test.js.map
