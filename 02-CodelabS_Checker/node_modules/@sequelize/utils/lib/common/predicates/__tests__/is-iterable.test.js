"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_expect_type = require("expect-type");
describe("isIterable", () => {
  it("returns true for iterables", () => {
    (0, import_chai.expect)((0, import_utils.isIterable)([])).to.be.true;
    (0, import_chai.expect)((0, import_utils.isIterable)("string")).to.be.true;
    (0, import_chai.expect)((0, import_utils.isIterable)(/* @__PURE__ */ new Map())).to.be.true;
    (0, import_chai.expect)((0, import_utils.isIterable)(/* @__PURE__ */ new Set())).to.be.true;
  });
  it("returns false for non-iterables", () => {
    (0, import_chai.expect)((0, import_utils.isIterable)(42)).to.be.false;
  });
  it("narrows the TypeScript type", () => {
    const value = (0, import_utils.upcast)(null);
    if ((0, import_utils.isIterable)(value)) {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    } else {
      (0, import_expect_type.expectTypeOf)(value).toEqualTypeOf();
    }
  });
});
//# sourceMappingURL=is-iterable.test.js.map
