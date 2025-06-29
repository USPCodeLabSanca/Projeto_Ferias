"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("parseSafeInteger", () => {
  it("returns null when input is not a valid integer syntax", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("not an integer")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("-")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)(" -1")).to.be.null;
  });
  it("returns null when input is an unsafe integer", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("9007199254740992")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("-9007199254740992")).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)(9007199254740992n)).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)(-9007199254740992n)).to.be.null;
  });
  it("returns a number when input is a valid integer string", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("123")).to.equal(123);
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("-123")).to.equal(-123);
  });
  it("returns a number when input is a safe bigint", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)(123n)).to.equal(123);
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)(-123n)).to.equal(-123);
  });
  it("returns null when input is a non-integer number", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("123.456")).to.be.null;
  });
  it("returns a number if the input contains the scientific notation in base 10", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("1e3")).to.equal(1e3);
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("1e3", 10)).to.equal(1e3);
  });
  it("returns null if the input contains the scientific notation in base other than 10", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("1e3", 8)).to.equal(null);
  });
  it("returns null if the input contains a numeric separator", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("1_000")).to.be.null;
  });
  it("returns a number when input is a valid base 2 integer", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("1010", 2)).to.equal(10);
  });
  it("returns null when input is a valid base 2 integer with invalid characters", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("10102", 2)).to.be.null;
  });
  it("returns a number when input is a valid base 8 integer", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("0755", 8)).to.equal(493);
  });
  it("returns null when input is a valid base 8 integer with invalid characters", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("0758", 8)).to.be.null;
  });
  it("returns a number when input is a valid base 16 integer", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("ffffff", 16)).to.equal(16777215);
  });
  it("returns null if the number includes a prefix", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("0xffffff", 16)).to.be.null;
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("0xffffff")).to.be.null;
  });
  it("returns null when input is a valid base 16 integer with invalid characters", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("fffg", 16)).to.be.null;
  });
  it("is case insensitive", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("Ff", 16)).to.equal(255);
  });
  it("returns a number when input is a valid base 36 integer", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("z", 36)).to.equal(35);
  });
  it("returns null when input is a valid base 36 integer with invalid characters", () => {
    (0, import_chai.expect)((0, import_utils.parseSafeInteger)("z(", 36)).to.be.null;
  });
  it("throws when radix is less than 2 or more than 36", () => {
    (0, import_chai.expect)(() => (0, import_utils.parseSafeInteger)("123", 1)).to.throw();
    (0, import_chai.expect)(() => (0, import_utils.parseSafeInteger)("123", 37)).to.throw();
  });
});
describe("parseSafeInteger.orThrow", () => {
  it("throws an error when the input is not parseable as a safe integer", () => {
    (0, import_chai.expect)(() => import_utils.parseSafeInteger.orThrow("not an integer")).to.throw();
  });
  it("returns the parsed number when the input is parseable as a safe integer", () => {
    (0, import_chai.expect)(import_utils.parseSafeInteger.orThrow("123")).to.equal(123);
  });
});
//# sourceMappingURL=parse-safe-integer.test.js.map
