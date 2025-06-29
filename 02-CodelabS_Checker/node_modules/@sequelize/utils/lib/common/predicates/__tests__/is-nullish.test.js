"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_expect_type = require("expect-type");
describe("isNullish", () => {
  it("returns true for null and undefined", () => {
    (0, import_chai.expect)((0, import_utils.isNullish)(null)).to.be.true;
    (0, import_chai.expect)((0, import_utils.isNullish)(void 0)).to.be.true;
  });
  it("returns false for non-nullish", () => {
    (0, import_chai.expect)((0, import_utils.isNullish)(0)).to.be.false;
    (0, import_chai.expect)((0, import_utils.isNullish)("")).to.be.false;
    (0, import_chai.expect)((0, import_utils.isNullish)(false)).to.be.false;
    (0, import_chai.expect)((0, import_utils.isNullish)(NaN)).to.be.false;
  });
  it("narrows the TypeScript type", () => {
    const value = (0, import_utils.upcast)(42);
    if ((0, import_utils.isNullish)(value)) {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    } else {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    }
  });
});
//# sourceMappingURL=is-nullish.test.js.map
