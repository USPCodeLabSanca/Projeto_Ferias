"use strict";
var import_utils = require("@sequelize/utils");
var import_chai = require("chai");
describe("localizedStringComparator", () => {
  it("sorts strings", () => {
    const items = ["0", "10", "2", "1"];
    items.sort(
      (0, import_utils.localizedStringComparator)("en", import_utils.SortDirection.ASC, {
        numeric: true
      })
    );
    (0, import_chai.expect)(items).to.deep.eq(["0", "1", "2", "10"]);
  });
  it("sorts strings (desc)", () => {
    const items = ["0", "10", "2", "1"];
    items.sort(
      (0, import_utils.localizedStringComparator)("en", import_utils.SortDirection.DESC, {
        numeric: true
      })
    );
    (0, import_chai.expect)(items).to.deep.eq(["10", "2", "1", "0"]);
  });
});
describe("basicComparator", () => {
  it("sorts numbers using > & <", () => {
    const items = [0, 10, 2, 1];
    items.sort((0, import_utils.basicComparator)());
    (0, import_chai.expect)(items).to.deep.eq([0, 1, 2, 10]);
  });
  it("sorts bigints using > & <", () => {
    const items = [0n, 10n, 2n, 1n];
    items.sort((0, import_utils.basicComparator)());
    (0, import_chai.expect)(items).to.deep.eq([0n, 1n, 2n, 10n]);
  });
  it("sorts unlocalized strings using > & <", () => {
    const items = ["0", "10", "2", "1"];
    items.sort((0, import_utils.basicComparator)());
    (0, import_chai.expect)(items).to.deep.eq(["0", "1", "10", "2"]);
  });
  it("sorts Date objects using > & <", () => {
    const items = [/* @__PURE__ */ new Date(0), /* @__PURE__ */ new Date(10), /* @__PURE__ */ new Date(2), /* @__PURE__ */ new Date(1)];
    items.sort((0, import_utils.basicComparator)());
    (0, import_chai.expect)(items).to.deep.eq([/* @__PURE__ */ new Date(0), /* @__PURE__ */ new Date(1), /* @__PURE__ */ new Date(2), /* @__PURE__ */ new Date(10)]);
  });
});
//# sourceMappingURL=comparators.test.js.map
