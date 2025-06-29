"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_expect_type = require("expect-type");
describe("isFunction", () => {
  it("returns true for function", () => {
    (0, import_chai.expect)((0, import_utils.isFunction)(() => {
    })).to.be.true;
  });
  it("returns true for class", () => {
    class Test {
    }
    (0, import_chai.expect)((0, import_utils.isFunction)(Test)).to.be.true;
  });
  it("returns false for non-function", () => {
    (0, import_chai.expect)((0, import_utils.isFunction)({})).to.be.false;
  });
  it("narrows the TypeScript type", () => {
    const value = (0, import_utils.upcast)(null);
    if ((0, import_utils.isFunction)(value)) {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    } else {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    }
  });
});
//# sourceMappingURL=is-function.test.js.map
