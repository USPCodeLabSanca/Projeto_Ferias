"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("parseBigInt", () => {
  it("should return null when input is not a valid number syntax", () => {
    (0, import_chai.expect)((0, import_utils.parseBigInt)("not a number")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseBigInt)("")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseBigInt)("-")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseBigInt)(" -1")).to.be.null;
  });
  it("should return null when input is an unsafe integer", () => {
    (0, import_chai.expect)((0, import_utils.parseBigInt)(Number.MAX_SAFE_INTEGER + 1)).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseBigInt)(Number.MIN_SAFE_INTEGER - 1)).to.be.null;
  });
  it("should return bigint when input is a safe integer", () => {
    (0, import_chai.expect)((0, import_utils.parseBigInt)(10)).to.deep.equal(10n);
    (0, import_chai.expect)((0, import_utils.parseBigInt)(-10)).to.deep.equal(-10n);
    (0, import_chai.expect)((0, import_utils.parseBigInt)("9007199254740992")).to.deep.equal(9007199254740992n);
    (0, import_chai.expect)((0, import_utils.parseBigInt)("-9007199254740992")).to.deep.equal(-9007199254740992n);
  });
  it("should return null when input is a non-integer number", () => {
    (0, import_chai.expect)((0, import_utils.parseBigInt)(10.5)).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseBigInt)(Infinity)).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseBigInt)(-Infinity)).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseBigInt)(NaN)).to.be.null;
  });
  it("should return null when input is a non-integer string", () => {
    (0, import_chai.expect)((0, import_utils.parseBigInt)("10.5")).to.be.null;
  });
  it("should return bigint when input is a string representation of an integer", () => {
    (0, import_chai.expect)((0, import_utils.parseBigInt)("10")).to.deep.equal(BigInt(10));
  });
  it("should return bigint when input is a string representation of a negative integer", () => {
    (0, import_chai.expect)((0, import_utils.parseBigInt)("-10")).to.deep.equal(BigInt(-10));
  });
});
describe("parseBigInt.orThrow", () => {
  it("should throw an error if the input cannot be a bigint", () => {
    (0, import_chai.expect)(() => import_utils.parseBigInt.orThrow(Number.MAX_SAFE_INTEGER + 1)).to.throw();
  });
  it("should return bigint if the input can be a bigint", () => {
    (0, import_chai.expect)(import_utils.parseBigInt.orThrow(10)).to.deep.equal(10n);
  });
});
//# sourceMappingURL=parse-bigint.test.js.map
