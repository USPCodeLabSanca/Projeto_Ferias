"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_expect_type = require("expect-type");
describe("isBigInt", () => {
  it("returns true for bigint", () => {
    (0, import_chai.expect)((0, import_utils.isBigInt)(123n)).to.be.true;
  });
  it("returns false for non-bigint", () => {
    (0, import_chai.expect)((0, import_utils.isBigInt)(42)).to.be.false;
    (0, import_chai.expect)((0, import_utils.isBigInt)("42")).to.be.false;
    (0, import_chai.expect)(
      (0, import_utils.isBigInt)({
        [Symbol.toPrimitive]() {
          return 42n;
        }
      })
    ).to.be.false;
  });
  it("narrows the TypeScript type", () => {
    const value = (0, import_utils.upcast)(null);
    if ((0, import_utils.isBigInt)(value)) {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    } else {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    }
  });
});
//# sourceMappingURL=is-big-int.test.js.map
