"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_expect_type = require("expect-type");
describe("isNumber", () => {
  it("returns true for number", () => {
    (0, import_chai.expect)((0, import_utils.isNumber)(42)).to.be.true;
  });
  it("returns false for non-number", () => {
    (0, import_chai.expect)((0, import_utils.isNumber)("42")).to.be.false;
    (0, import_chai.expect)((0, import_utils.isNumber)(42n)).to.be.false;
  });
  it("narrows the TypeScript type", () => {
    const value = (0, import_utils.upcast)(null);
    if ((0, import_utils.isNumber)(value)) {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    } else {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    }
  });
});
//# sourceMappingURL=is-number.test.js.map
