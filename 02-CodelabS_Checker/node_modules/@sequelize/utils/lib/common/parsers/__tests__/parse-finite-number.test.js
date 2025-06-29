"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("parseFiniteNumber", () => {
  it("should return null when input is not a valid number syntax", () => {
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("not a number")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("-")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)(" -1")).to.be.null;
  });
  it("should return null when input is an infinite number", () => {
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("Infinity")).to.be.null;
  });
  it("should return a number when input is a valid number string", () => {
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("123")).to.equal(123);
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("-123")).to.equal(-123);
  });
  it("should return a number when input is a valid number in scientific notation", () => {
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("5e1")).to.equal(50);
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("-5e1")).to.equal(-50);
  });
  it("should return a number when input is a valid decimal number", () => {
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("123.456")).to.equal(123.456);
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)("-123.456")).to.equal(-123.456);
  });
  it("should return null when input is a BigInt outside of the Safe Integer range", () => {
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)(BigInt(Number.MAX_SAFE_INTEGER) + 1n)).to.be.null;
  });
  it("should return a number when input is a valid BigInt within the Safe Integer range", () => {
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)(123n)).to.equal(123);
    (0, import_chai.expect)((0, import_utils.parseFiniteNumber)(-123n)).to.equal(-123);
  });
});
describe("parseFiniteNumber.orThrow", () => {
  it("throws an error when the input is not parseable as a finite number", () => {
    (0, import_chai.expect)(() => import_utils.parseFiniteNumber.orThrow("not a number")).to.throw();
  });
  it("returns the parsed number when the input is parseable as a finite number", () => {
    (0, import_chai.expect)(import_utils.parseFiniteNumber.orThrow("123")).to.equal(123);
  });
});
//# sourceMappingURL=parse-finite-number.test.js.map
