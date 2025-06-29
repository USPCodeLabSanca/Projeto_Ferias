"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
var import_promises = require("node:timers/promises");
describe("parallelForEach", () => {
  it("executes the callbacks in parallel", async () => {
    const array = [1, 2, 3];
    const order = [];
    await (0, import_utils.parallelForEach)(array, async (value, index) => {
      await (0, import_promises.setTimeout)((3 - index) * 100);
      order.push(value);
    });
    (0, import_chai.expect)(order).to.deep.equal([3, 2, 1]);
  });
  it("treats holes as undefined", async () => {
    const array = [1, , 3];
    const values = [];
    await (0, import_utils.parallelForEach)(array, async (value) => {
      values.push(value);
    });
    (0, import_chai.expect)(values).to.deep.equal([1, void 0, 3]);
  });
  it("should pass the correct index to the callback", async () => {
    const array = ["a", "b", "c"];
    const indices = [];
    await (0, import_utils.parallelForEach)(array, async (_, index) => {
      indices.push(index);
    });
    (0, import_chai.expect)(indices).to.deep.equal([0, 1, 2]);
  });
});
//# sourceMappingURL=parallel-for-each.test.js.map
