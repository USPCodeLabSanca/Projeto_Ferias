"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("freezeDeep", () => {
  it("should freeze a plain object", () => {
    const obj = { a: 1, b: 2 };
    const result = (0, import_utils.freezeDeep)(obj);
    (0, import_chai.expect)(Object.isFrozen(result)).to.equal(true);
  });
  it("should freeze nested objects", () => {
    const obj = { a: 1, b: { c: 3 } };
    const result = (0, import_utils.freezeDeep)(obj);
    (0, import_chai.expect)(Object.isFrozen(result.b)).to.equal(true);
  });
  it("should not freeze non-plain objects", () => {
    const obj = { a: 1, b: /* @__PURE__ */ new Date() };
    const result = (0, import_utils.freezeDeep)(obj);
    (0, import_chai.expect)(Object.isFrozen(result.b)).to.equal(false);
  });
});
describe("freezeDescendants", () => {
  it("should freeze descendants of an object", () => {
    const obj = { a: 1, b: { c: 3 } };
    const result = (0, import_utils.freezeDescendants)(obj);
    (0, import_chai.expect)(Object.isFrozen(result)).to.equal(false);
    (0, import_chai.expect)(Object.isFrozen(result.b)).to.equal(true);
  });
  it("should not freeze non-plain object descendants", () => {
    const obj = { a: /* @__PURE__ */ new Date() };
    const result = (0, import_utils.freezeDescendants)(obj);
    (0, import_chai.expect)(Object.isFrozen(result.a)).to.equal(false);
  });
});
//# sourceMappingURL=freeze-deep.test.js.map
