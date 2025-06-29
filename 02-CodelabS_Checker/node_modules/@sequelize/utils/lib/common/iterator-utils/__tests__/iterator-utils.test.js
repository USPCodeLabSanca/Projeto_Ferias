"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("combinedIterator", () => {
  it("chains iterables", () => {
    const iter1 = [1, 2, 3];
    const iter2 = /* @__PURE__ */ new Set([4, 5, 6]);
    const combined = (0, import_utils.combinedIterator)(iter1, iter2);
    import_utils.isIterable.assert(combined);
    const result = [...combined];
    (0, import_chai.expect)(result).to.deep.eq([1, 2, 3, 4, 5, 6]);
  });
});
describe("count", () => {
  it("returns the number of elements that match the predicate", () => {
    const iter = [1, 2, 3, 4, 5, 6];
    const result = (0, import_utils.count)(iter, (x) => x % 2 === 0);
    (0, import_chai.expect)(result).to.eq(3);
  });
});
describe("every", () => {
  it("returns true if all elements match the predicate", () => {
    const iter = [1, 2, 3, 4, 5, 6];
    const areAllEven = (0, import_utils.every)(iter, (x) => x % 2 === 0);
    const areAllPositive = (0, import_utils.every)(iter, (x) => x > 0);
    (0, import_chai.expect)(areAllEven).to.be.false;
    (0, import_chai.expect)(areAllPositive).to.be.true;
  });
  it("always returns true if the iterable is empty", () => {
    const result = (0, import_utils.every)([], () => false);
    (0, import_chai.expect)(result).to.be.true;
  });
});
describe("find", () => {
  it("returns the first element that matches the predicate", () => {
    const iter = [1, 2, 3, 4, 5, 6];
    const result = (0, import_utils.find)(iter, (x) => x % 2 === 0);
    (0, import_chai.expect)(result).to.eq(2);
  });
});
describe("join", () => {
  it("joins the strings of an iterable into a string", () => {
    (0, import_chai.expect)((0, import_utils.join)(["a", "b", "c"], "-")).to.eq("a-b-c");
    (0, import_chai.expect)((0, import_utils.join)([], "-")).to.eq("");
  });
});
describe("map", () => {
  it("maps the iterable", () => {
    const iter = [1, 2, 3, 4, 5, 6];
    const result = (0, import_utils.map)(iter, (x) => x * 2);
    import_utils.isIterable.assert(result);
    (0, import_chai.expect)([...result]).to.deep.eq([2, 4, 6, 8, 10, 12]);
  });
});
describe("some", () => {
  it("returns true if at least one element matches the predicate", () => {
    const iter = [1, 2, 3, 4, 5, 6];
    const hasAnEven = (0, import_utils.some)(iter, (x) => x % 2 === 0);
    const hasANegative = (0, import_utils.some)(iter, (x) => x < 0);
    (0, import_chai.expect)(hasAnEven).to.be.true;
    (0, import_chai.expect)(hasANegative).to.be.false;
  });
  it("always returns false if the iterable is empty", () => {
    const result = (0, import_utils.some)([], () => true);
    (0, import_chai.expect)(result).to.be.false;
  });
});
//# sourceMappingURL=iterator-utils.test.js.map
