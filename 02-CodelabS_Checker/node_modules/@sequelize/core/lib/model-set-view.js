"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var model_set_view_exports = {};
__export(model_set_view_exports, {
  ModelSetView: () => ModelSetView
});
module.exports = __toCommonJS(model_set_view_exports);
var import_utils = require("@sequelize/utils");
var import_node_util = require("node:util");
var import_toposort_class = __toESM(require("toposort-class"));
class ModelSetView extends import_utils.SetView {
  #sequelize;
  constructor(sequelize, set) {
    super(set);
    this.#sequelize = sequelize;
  }
  get(modelName) {
    return this.find((model) => model.modelDefinition.modelName === modelName);
  }
  getOrThrow(modelName) {
    const model = this.get(modelName);
    if (!model) {
      throw new Error(`Model ${(0, import_node_util.inspect)(modelName)} was not added to this Sequelize instance.`);
    }
    return model;
  }
  /**
   * Returns the list of registered model names.
   */
  getNames() {
    return (0, import_utils.map)(this, (model) => model.modelDefinition.modelName);
  }
  hasByName(modelName) {
    return this.get(modelName) !== void 0;
  }
  /**
   * Returns an array that lists every model, sorted in order
   * of foreign key references: The first model is a model that is depended upon,
   * the last model is a model that is not depended upon.
   *
   * If there is a cyclic dependency, this returns null.
   */
  getModelsTopoSortedByForeignKey() {
    const models = /* @__PURE__ */ new Map();
    const sorter = new import_toposort_class.default();
    const queryGenerator = this.#sequelize.queryGenerator;
    for (const model of this) {
      let deps = [];
      const tableName = queryGenerator.quoteTable(model);
      models.set(tableName, model);
      const { attributes } = model.modelDefinition;
      for (const attrName of attributes.keys()) {
        const attribute = attributes.get(attrName);
        if (!attribute?.references) {
          continue;
        }
        const dep = queryGenerator.quoteTable(attribute.references.table);
        deps.push(dep);
      }
      deps = deps.filter((dep) => tableName !== dep);
      sorter.add(tableName, deps);
    }
    let sorted;
    try {
      sorted = sorter.sort();
    } catch (error) {
      if (error instanceof Error && !error.message.startsWith("Cyclic dependency found.")) {
        throw error;
      }
      return null;
    }
    return sorted.map((modelName) => {
      return models.get(modelName);
    }).filter(Boolean);
  }
  /**
   * Iterate over Models in an order suitable for e.g. creating tables.
   * Will take foreign key constraints into account so that dependencies are visited before dependents.
   *
   * @param iterator method to execute on each model
   * @param options
   * @param options.reverse
   * @private
   *
   * @deprecated
   */
  forEachModel(iterator, options) {
    const sortedModels = this.getModelsTopoSortedByForeignKey();
    if (sortedModels == null) {
      throw new Error("Cyclic dependency found.");
    }
    const reverse = options?.reverse ?? true;
    if (reverse) {
      sortedModels.reverse();
    }
    for (const model of sortedModels) {
      iterator(model);
    }
  }
}
//# sourceMappingURL=model-set-view.js.map
