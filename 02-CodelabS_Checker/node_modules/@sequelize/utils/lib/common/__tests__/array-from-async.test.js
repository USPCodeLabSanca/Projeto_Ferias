"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("arrayFromAsync", () => {
  it("returns an array from an async iterable", async () => {
    async function* asyncGenerator() {
      yield 1;
      yield 2;
      yield Promise.resolve(3);
    }
    const result = await (0, import_utils.arrayFromAsync)(asyncGenerator());
    (0, import_chai.expect)(result).to.deep.eq([1, 2, 3]);
  });
});
//# sourceMappingURL=array-from-async.test.js.map
