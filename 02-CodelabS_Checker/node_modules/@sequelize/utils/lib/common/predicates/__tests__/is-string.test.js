"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_expect_type = require("expect-type");
describe("isString", () => {
  it("returns true for string", () => {
    (0, import_chai.expect)((0, import_utils.isString)("string")).to.be.true;
  });
  it("returns false for non-string", () => {
    (0, import_chai.expect)((0, import_utils.isString)(42)).to.be.false;
    (0, import_chai.expect)(
      (0, import_utils.isString)({
        [Symbol.toPrimitive]() {
          return "test";
        }
      })
    ).to.be.false;
  });
  it("narrows the TypeScript type", () => {
    const value = (0, import_utils.upcast)(null);
    if ((0, import_utils.isString)(value)) {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    } else {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    }
  });
});
//# sourceMappingURL=is-string.test.js.map
