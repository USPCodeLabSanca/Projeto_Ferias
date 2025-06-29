"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("shallowClonePojo", () => {
  it("returns a shallow copy of the provided object", () => {
    const obj = { a: 1, b: 2 };
    const clonedObj = (0, import_utils.shallowClonePojo)(obj);
    (0, import_chai.expect)(clonedObj).to.deep.equal(obj);
    (0, import_chai.expect)(clonedObj).to.not.equal(obj);
  });
  it("does not copy nested objects", () => {
    const obj = { a: 1, b: { c: 3 } };
    const clonedObj = (0, import_utils.shallowClonePojo)(obj);
    (0, import_chai.expect)(clonedObj.b).to.equal(obj.b);
  });
  it("throws an error when provided a non-plain object", () => {
    const nonPlainObject = /* @__PURE__ */ new Date();
    (0, import_chai.expect)(() => (0, import_utils.shallowClonePojo)(nonPlainObject)).to.throw();
  });
});
//# sourceMappingURL=shallow-clone-pojo.test.js.map
