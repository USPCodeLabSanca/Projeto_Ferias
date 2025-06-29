"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("isValidNumberSyntax", () => {
  it("returns true for valid base 10 numbers", () => {
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("10")).to.equal(true);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("0.1")).to.equal(true);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("-10")).to.equal(true);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("1e5")).to.equal(true);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("-1e5")).to.equal(true);
  });
  it("returns false for invalid base 10 numbers", () => {
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("abc")).to.equal(false);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("10a")).to.equal(false);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("1.1.1")).to.equal(false);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("1e1e1")).to.equal(false);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("")).to.equal(false);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("-")).to.equal(false);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)(" 12")).to.equal(false);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("1_2")).to.equal(false);
  });
  it("does not support non-finite numbers", () => {
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("Infinity")).to.equal(false);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("-Infinity")).to.equal(false);
    (0, import_chai.expect)((0, import_utils.isValidNumberSyntax)("NaN")).to.equal(false);
  });
});
//# sourceMappingURL=is-valid-number-syntax.test.js.map
