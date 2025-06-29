"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_expect_type = require("expect-type");
describe("isError", () => {
  it("returns true for Error", () => {
    (0, import_chai.expect)((0, import_utils.isError)(new Error("test"))).to.be.true;
  });
  it("returns true for Error subclasses", () => {
    (0, import_chai.expect)((0, import_utils.isError)(new TypeError("test"))).to.be.true;
  });
  it("returns false for non-Error", () => {
    (0, import_chai.expect)((0, import_utils.isError)({})).to.be.false;
  });
  it("narrows the TypeScript type", () => {
    const value = (0, import_utils.upcast)(null);
    if ((0, import_utils.isError)(value)) {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    } else {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    }
  });
});
//# sourceMappingURL=is-error.test.js.map
