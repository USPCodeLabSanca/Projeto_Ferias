"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("cloneDeepPlainValues", () => {
  it("should clone plain values", () => {
    const value = { a: 1, b: 2 };
    const clonedValue = (0, import_utils.cloneDeepPlainValues)(value);
    (0, import_chai.expect)(clonedValue).to.deep.equal(value);
    (0, import_chai.expect)(clonedValue).not.to.equal(value);
  });
  it("should clone arrays", () => {
    const value = [1, 2, 3];
    const clonedValue = (0, import_utils.cloneDeepPlainValues)(value);
    (0, import_chai.expect)(clonedValue).to.deep.equal(value);
    (0, import_chai.expect)(clonedValue).not.to.equal(value);
  });
  it("should clone nested structures", () => {
    const value = { a: { b: { c: 1 } } };
    const clonedValue = (0, import_utils.cloneDeepPlainValues)(value);
    (0, import_chai.expect)(clonedValue).to.deep.equal(value);
    (0, import_chai.expect)(clonedValue).not.to.equal(value);
  });
  it("should transfer unclonable values when flag is set", () => {
    const value = { a: /* @__PURE__ */ new Map() };
    const clonedValue = (0, import_utils.cloneDeepPlainValues)(value, true);
    (0, import_chai.expect)(clonedValue).to.deep.equal(value);
    (0, import_chai.expect)(clonedValue).not.to.equal(value);
    (0, import_chai.expect)(clonedValue.a).to.equal(value.a);
  });
  it("should throw an error when encountering unclonable values and the transfer flag is not set", () => {
    const value = { a: /* @__PURE__ */ new Map() };
    (0, import_chai.expect)(() => (0, import_utils.cloneDeepPlainValues)(value)).to.throw();
  });
});
//# sourceMappingURL=clone-deep-plain-values.test.js.map
