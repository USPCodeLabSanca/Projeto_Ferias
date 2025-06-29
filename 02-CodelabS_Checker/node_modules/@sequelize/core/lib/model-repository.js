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
var model_repository_exports = {};
__export(model_repository_exports, {
  ModelRepository: () => ModelRepository,
  getModelRepository: () => getModelRepository
});
module.exports = __toCommonJS(model_repository_exports);
var import_utils = require("@sequelize/utils");
var import_node_assert = __toESM(require("node:assert"));
var import_get_belongs_to_associations_with_target = require("./_model-internals/get-belongs-to-associations-with-target.js");
var import_hooks = require("./hooks.js");
var import_model_internals = require("./model-internals.js");
var import_model_repository_types = require("./model-repository.types.js");
var import_operators = require("./operators.js");
class ModelRepository {
  #modelDefinition;
  constructor(modelDefinition) {
    this.#modelDefinition = modelDefinition;
  }
  get #sequelize() {
    return this.#modelDefinition.sequelize;
  }
  get #queryInterface() {
    return this.#sequelize.queryInterface;
  }
  async _UNSTABLE_destroy(instanceOrInstances, options = import_utils.EMPTY_OBJECT) {
    options = (0, import_utils.shallowClonePojo)(options);
    options.manualOnDelete ??= import_model_repository_types.ManualOnDelete.paranoid;
    (0, import_model_internals.assertHasPrimaryKey)(this.#modelDefinition);
    (0, import_model_internals.setTransactionFromCls)(options, this.#sequelize);
    const instances = Array.isArray(instanceOrInstances) ? [...instanceOrInstances] : [instanceOrInstances];
    if (instances.length === 0) {
      return 0;
    }
    options = (0, import_model_internals.ensureOptionsAreImmutable)(options);
    if ((0, import_hooks.mayRunHook)("beforeDestroyMany", options.noHooks)) {
      await this.#modelDefinition.hooks.runAsync("beforeDestroyMany", instances, options);
      if (instances.length === 0) {
        return 0;
      }
    }
    Object.freeze(instances);
    let result;
    const cascadingAssociations = this.#getCascadingDeleteAssociations(options);
    if (cascadingAssociations.length > 0 && !options.transaction) {
      result = await this.#sequelize.transaction(async (transaction) => {
        options.transaction = transaction;
        Object.freeze(options);
        return this.#destroyInternal(instances, cascadingAssociations, options);
      });
    } else {
      Object.freeze(options);
      result = await this.#destroyInternal(instances, cascadingAssociations, options);
    }
    if ((0, import_hooks.mayRunHook)("afterDestroyMany", options.noHooks)) {
      await this.#modelDefinition.hooks.runAsync("afterDestroyMany", instances, options, result);
    }
    return result;
  }
  async #destroyInternal(instances, cascadingAssociations, options) {
    if (cascadingAssociations.length > 0) {
      await this.#manuallyCascadeDestroy(instances, cascadingAssociations, options);
    }
    const isSoftDelete = !options.hardDelete && this.#modelDefinition.isParanoid();
    if (isSoftDelete) {
      throw new Error("ModelRepository#_UNSTABLE_destroy does not support paranoid deletion yet.");
    }
    const primaryKeys = this.#modelDefinition.primaryKeysAttributeNames;
    let where;
    if (instances.length === 1) {
      where = (0, import_model_internals.getModelPkWhere)(instances[0], true);
    } else if (primaryKeys.size === 1 && !this.#modelDefinition.versionAttributeName) {
      const primaryKey = primaryKeys.values().next().value;
      const values = instances.map((instance) => (0, import_model_internals.getPrimaryKeyValueOrThrow)(instance, primaryKey));
      where = { [primaryKey]: values };
    } else {
      where = {
        // Ideally, we'd use tuple comparison here, but that's not supported by Sequelize yet.
        // It would look like this:
        // WHERE (id1, id2) IN ((1, 2), (3, 4))
        [import_operators.Op.or]: instances.map((instance) => (0, import_model_internals.getModelPkWhere)(instance, true))
      };
    }
    const bulkDeleteOptions = {
      ...options,
      limit: null,
      where
    };
    delete bulkDeleteOptions.hardDelete;
    delete bulkDeleteOptions.noHooks;
    return this.#queryInterface.bulkDelete(this.#modelDefinition, bulkDeleteOptions);
  }
  async _UNSTABLE_bulkDestroy(options) {
    options = (0, import_utils.shallowClonePojo)(options);
    options.manualOnDelete ??= import_model_repository_types.ManualOnDelete.paranoid;
    (0, import_model_internals.assertHasWhereOptions)(options);
    (0, import_model_internals.setTransactionFromCls)(options, this.#sequelize);
    const modelDefinition = this.#modelDefinition;
    if ((0, import_hooks.mayRunHook)("_UNSTABLE_beforeBulkDestroy", options.noHooks)) {
      await modelDefinition.hooks.runAsync("_UNSTABLE_beforeBulkDestroy", options);
    }
    let result;
    const cascadingAssociations = this.#getCascadingDeleteAssociations(options);
    if (cascadingAssociations.length > 0 && !options.transaction) {
      result = await this.#sequelize.transaction(async (transaction) => {
        options.transaction = transaction;
        Object.freeze(options);
        return this.#bulkDestroyInternal(cascadingAssociations, options);
      });
    } else {
      Object.freeze(options);
      result = await this.#bulkDestroyInternal(cascadingAssociations, options);
    }
    if ((0, import_hooks.mayRunHook)("_UNSTABLE_afterBulkDestroy", options.noHooks)) {
      await modelDefinition.hooks.runAsync("_UNSTABLE_afterBulkDestroy", options, result);
    }
    return result;
  }
  async #bulkDestroyInternal(cascadingAssociations, options) {
    const modelDefinition = this.#modelDefinition;
    if (cascadingAssociations.length > 0) {
      const instances = await modelDefinition.model.findAll(options);
      await this.#manuallyCascadeDestroy(instances, cascadingAssociations, options);
    }
    const deletedAtAttributeName = modelDefinition.timestampAttributeNames.deletedAt;
    if (deletedAtAttributeName && !options.hardDelete) {
      throw new Error(
        "ModelRepository#_UNSTABLE_bulkDestroy does not support paranoid deletion yet."
      );
    }
    return this.#queryInterface.bulkDelete(this.#modelDefinition, options);
  }
  #getCascadingDeleteAssociations(options) {
    if (options.manualOnDelete === import_model_repository_types.ManualOnDelete.none) {
      return import_utils.EMPTY_ARRAY;
    }
    if (options.manualOnDelete === import_model_repository_types.ManualOnDelete.paranoid && !options.hardDelete && this.#modelDefinition.isParanoid()) {
      return import_utils.EMPTY_ARRAY;
    }
    const belongsToAssociations = (0, import_get_belongs_to_associations_with_target.getBelongsToAssociationsWithTarget)(this.#modelDefinition.model);
    return belongsToAssociations.filter((association) => {
      const source = association.source.modelDefinition;
      const foreignKey = source.physicalAttributes.getOrThrow(association.foreignKey);
      return foreignKey.onDelete === "CASCADE" || foreignKey.onDelete === "SET NULL" || foreignKey.onDelete === "SET DEFAULT";
    });
  }
  async #manuallyCascadeDestroy(instances, cascadingAssociations, options) {
    (0, import_node_assert.default)(options.transaction, "Handling ON DELETE in JavaScript requires a transaction.");
    const isSoftDelete = !options.hardDelete && this.#modelDefinition.isParanoid();
    await Promise.all(
      cascadingAssociations.map(async (association) => {
        const source = association.source.modelDefinition;
        const foreignKey = source.physicalAttributes.getOrThrow(association.foreignKey);
        switch (foreignKey.onDelete) {
          case "CASCADE": {
            const associatedInstances = await source.model.findAll({
              transaction: options.transaction,
              connection: options.connection,
              where: {
                [association.foreignKey]: instances.map(
                  (instance) => instance.get(association.targetKey)
                )
              }
            });
            if (associatedInstances.length === 0) {
              return;
            }
            if (isSoftDelete && !source.isParanoid()) {
              throw new Error(`Trying to soft delete model ${this.#modelDefinition.modelName}, but it is associated with a non-paranoid model, ${source.modelName}, through ${association.name} with onDelete: 'CASCADE'.
This would lead to an active record being associated with a deleted record.`);
            }
            await source.model.modelRepository._UNSTABLE_destroy(associatedInstances, options);
            return;
          }
          case "SET NULL": {
            throw new Error("Manual cascades do not support SET NULL yet.");
          }
          case "SET DEFAULT": {
            throw new Error("Manual cascades do not support SET DEFAULT yet.");
          }
          default:
            throw new Error(`Unexpected onDelete action: ${foreignKey.onDelete}`);
        }
      })
    );
  }
  // async save(instances: M[] | M): Promise<void> {}
  // async updateOne(instance: M, values: object, options: unknown): Promise<M> {}
  // async updateMany(data: Array<{ instance: M, values: object }>, options: unknown): Promise<M> {}
  // async updateMany(data: Array<{ where: object, values: object }>, options: unknown): Promise<M> {}
  // async restore(instances: M[] | M, options: unknown): Promise<number> {}
  // async bulkUpdate(options: unknown): Promise<M> {}
  // async bulkRestore(options: unknown): Promise<M> {}
}
const modelRepositories = /* @__PURE__ */ new WeakMap();
function getModelRepository(model) {
  let internals = modelRepositories.get(model);
  if (internals) {
    return internals;
  }
  internals = new ModelRepository(model);
  return internals;
}
//# sourceMappingURL=model-repository.js.map
