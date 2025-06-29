"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("isValidIntegerSyntax", () => {
  it("returns true when input is a valid integer syntax", () => {
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("123")).to.be.true;
  });
  it("returns false when input is not a valid integer syntax", () => {
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("not an integer")).to.be.false;
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("")).to.be.false;
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("-")).to.be.false;
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)(" 1")).to.be.false;
  });
  it("returns false when input is a valid integer syntax with scientific notation", () => {
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("1e2")).to.be.false;
  });
  it("returns false when input is a valid integer syntax with numeric separators", () => {
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("1_000")).to.be.false;
  });
  it("supports radixes", () => {
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("1010", 2)).to.be.true;
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("10102", 2)).to.be.false;
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("z", 36)).to.be.true;
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("z(", 36)).to.be.false;
  });
  it("is case insensitive", () => {
    (0, import_chai.expect)((0, import_utils.isValidIntegerSyntax)("Ff", 16)).to.be.true;
  });
  it("throws if the radix is below 2 or above 36", () => {
    (0, import_chai.expect)(() => (0, import_utils.isValidIntegerSyntax)("123", 1)).to.throw();
    (0, import_chai.expect)(() => (0, import_utils.isValidIntegerSyntax)("123", 37)).to.throw();
  });
});
//# sourceMappingURL=is-valid-integer-syntax.test.js.map
