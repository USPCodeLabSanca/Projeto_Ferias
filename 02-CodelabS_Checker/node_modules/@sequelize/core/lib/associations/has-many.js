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
var has_many_exports = {};
__export(has_many_exports, {
  HasManyAssociation: () => HasManyAssociation
});
module.exports = __toCommonJS(has_many_exports);
var import_utils = require("@sequelize/utils");
var import_isObject = __toESM(require("lodash/isObject"));
var import_upperFirst = __toESM(require("lodash/upperFirst"));
var import_errors = require("../errors/index.js");
var import_col = require("../expression-builders/col.js");
var import_fn = require("../expression-builders/fn.js");
var import_operators = require("../operators");
var import_model_utils = require("../utils/model-utils.js");
var import_object = require("../utils/object.js");
var import_base = require("./base");
var import_belongs_to = require("./belongs-to.js");
var import_helpers = require("./helpers");
class HasManyAssociation extends import_base.MultiAssociation {
  accessors;
  get foreignKey() {
    return this.inverse.foreignKey;
  }
  /**
   * The column name of the foreign key (on the target model)
   */
  get identifierField() {
    return this.inverse.identifierField;
  }
  /**
   * The name of the attribute the foreign key points to.
   *
   * This key is on the Source Model.
   * The {@link Association.foreignKey} is on the Target Model.
   */
  get sourceKey() {
    return this.inverse.targetKey;
  }
  /**
   * @deprecated use {@link sourceKey}
   */
  get sourceKeyAttribute() {
    return this.sourceKey;
  }
  get sourceKeyField() {
    return this.inverse.targetKeyField;
  }
  inverse;
  constructor(secret, source, target, options, parent, inverse) {
    if (options.sourceKey && !source.getAttributes()[options.sourceKey]) {
      throw new Error(
        `Unknown attribute "${options.sourceKey}" passed as sourceKey, define this attribute on model "${source.name}" first`
      );
    }
    if ("keyType" in options) {
      throw new TypeError(
        `Option "keyType" has been removed from the BelongsTo's options. Set "foreignKey.type" instead.`
      );
    }
    if ("through" in options) {
      throw new Error(
        'The "through" option is not available in hasMany. N:M associations are defined using belongsToMany instead.'
      );
    }
    super(secret, source, target, options, parent);
    this.inverse = inverse ?? import_belongs_to.BelongsToAssociation.associate(
      secret,
      target,
      source,
      (0, import_object.removeUndefined)({
        as: options.inverse?.as,
        scope: options.inverse?.scope,
        foreignKey: options.foreignKey,
        targetKey: options.sourceKey,
        foreignKeyConstraints: options.foreignKeyConstraints,
        hooks: options.hooks
      }),
      this
    );
    const plural = (0, import_upperFirst.default)(this.options.name.plural);
    const singular = (0, import_upperFirst.default)(this.options.name.singular);
    this.accessors = {
      get: `get${plural}`,
      set: `set${plural}`,
      addMultiple: `add${plural}`,
      add: `add${singular}`,
      create: `create${singular}`,
      remove: `remove${singular}`,
      removeMultiple: `remove${plural}`,
      hasSingle: `has${singular}`,
      hasAll: `has${plural}`,
      count: `count${plural}`
    };
    this.#mixin(source.prototype);
  }
  static associate(secret, source, target, options = {}, parent, inverse) {
    return (0, import_helpers.defineAssociation)(
      HasManyAssociation,
      source,
      target,
      options,
      parent,
      normalizeHasManyOptions,
      (normalizedOptions) => {
        if ((0, import_model_utils.isSameInitialModel)(source, target) && // use 'options' because this will always be set in 'normalizedOptions'
        (!options.as || !normalizedOptions.inverse?.as || options.as === normalizedOptions.inverse.as)) {
          throw new import_errors.AssociationError(
            'Both options "as" and "inverse.as" must be defined for hasMany self-associations, and their value must be different.'
          );
        }
        return new HasManyAssociation(secret, source, target, normalizedOptions, parent, inverse);
      }
    );
  }
  #mixin(mixinTargetPrototype) {
    (0, import_helpers.mixinMethods)(
      this,
      mixinTargetPrototype,
      [
        "get",
        "count",
        "hasSingle",
        "hasAll",
        "set",
        "add",
        "addMultiple",
        "remove",
        "removeMultiple",
        "create"
      ],
      {
        hasSingle: "has",
        hasAll: "has",
        addMultiple: "add",
        removeMultiple: "remove"
      }
    );
  }
  async get(instances, options = {}) {
    let isManyMode = true;
    if (!Array.isArray(instances)) {
      isManyMode = false;
      instances = [instances];
    }
    const findOptions = { ...options };
    const where = /* @__PURE__ */ Object.create(null);
    if (this.scope) {
      Object.assign(where, this.scope);
    }
    let values;
    if (instances.length > 1) {
      values = instances.map((instance) => instance.get(this.sourceKey, { raw: true }));
      if (findOptions.limit && instances.length > 1) {
        findOptions.groupedLimit = {
          limit: findOptions.limit,
          on: this,
          // association
          values
        };
        delete findOptions.limit;
      } else {
        where[this.foreignKey] = {
          [import_operators.Op.in]: values
        };
        delete findOptions.groupedLimit;
      }
    } else {
      where[this.foreignKey] = instances[0].get(this.sourceKey, { raw: true });
    }
    findOptions.where = findOptions.where ? { [import_operators.Op.and]: [where, findOptions.where] } : where;
    let Model = this.target;
    if (options.scope != null) {
      if (!options.scope) {
        Model = Model.withoutScope();
      } else if (options.scope !== true) {
        Model = Model.withScope(options.scope);
      }
    }
    if (options.schema != null) {
      Model = Model.withSchema({
        schema: options.schema,
        schemaDelimiter: options.schemaDelimiter
      });
    }
    const results = await Model.findAll(findOptions);
    if (!isManyMode) {
      return results;
    }
    const result = /* @__PURE__ */ new Map();
    for (const instance of instances) {
      result.set(instance.get(this.sourceKey, { raw: true }), []);
    }
    for (const instance of results) {
      const value = instance.get(this.foreignKey, { raw: true });
      result.get(value).push(instance);
    }
    return result;
  }
  /**
   * Count everything currently associated with this, using an optional where clause.
   *
   * @param instance the source instance
   * @param options find & count options
   */
  async count(instance, options) {
    const findOptions = {
      ...options,
      raw: true,
      plain: true,
      attributes: [
        [(0, import_fn.fn)("COUNT", (0, import_col.col)(`${this.target.name}.${this.target.primaryKeyField}`)), "count"]
      ]
    };
    const result = await this.get(instance, findOptions);
    return Number.parseInt(
      // @ts-expect-error -- this.get() isn't designed to expect returning a raw output.
      result.count,
      10
    );
  }
  /**
   * Check if one or more rows are associated with `this`.
   *
   * @param sourceInstance the source instance
   * @param targets A list of instances or their primary keys
   * @param options Options passed to getAssociations
   */
  async has(sourceInstance, targets, options) {
    const normalizedTargets = this.toInstanceOrPkArray(targets);
    const where = {
      [import_operators.Op.or]: normalizedTargets.map((instance) => {
        if (instance instanceof this.target) {
          return instance.where();
        }
        return {
          // TODO: support composite foreign keys
          // @ts-expect-error -- TODO: what if the target has no primary key?
          [this.target.primaryKeyAttribute]: instance
        };
      })
    };
    const findOptions = {
      ...options,
      scope: false,
      // TODO: support composite foreign keys
      // @ts-expect-error -- TODO: what if the target has no primary key?
      attributes: [this.target.primaryKeyAttribute],
      raw: true,
      // @ts-expect-error -- TODO: current WhereOptions typings do not allow having 'WhereOptions' inside another 'WhereOptions'
      where: {
        [import_operators.Op.and]: [where, options?.where]
      }
    };
    const associatedObjects = await this.get(sourceInstance, findOptions);
    return associatedObjects.length === normalizedTargets.length;
  }
  /**
   * Set the associated models by passing an array of persisted instances or their primary keys. Everything that is not in the passed array will be un-associated
   *
   * @param sourceInstance source instance to associate new instances with
   * @param targets An array of persisted instances or primary key of instances to associate with this. Pass `null` to remove all associations.
   * @param options Options passed to `target.findAll` and `update`.
   */
  async set(sourceInstance, targets, options) {
    const normalizedTargets = this.toInstanceArray(targets);
    const oldAssociations = await this.get(sourceInstance, { ...options, scope: false, raw: true });
    const promises = [];
    const obsoleteAssociations = oldAssociations.filter((old) => {
      return !normalizedTargets.some((obj) => {
        return obj.get(this.target.primaryKeyAttribute) === old[this.target.primaryKeyAttribute];
      });
    });
    const unassociatedObjects = normalizedTargets.filter((obj) => {
      return !oldAssociations.some((old) => {
        return obj.get(this.target.primaryKeyAttribute) === old[this.target.primaryKeyAttribute];
      });
    });
    if (obsoleteAssociations.length > 0) {
      promises.push(
        this.remove(sourceInstance, obsoleteAssociations, {
          ...options,
          destroy: options?.destroyPrevious
        })
      );
    }
    if (unassociatedObjects.length > 0) {
      const update = {
        [this.foreignKey]: sourceInstance.get(this.sourceKey),
        ...this.scope
      };
      const updateWhere = {
        // @ts-expect-error -- TODO: what if the target has no primary key?
        [this.target.primaryKeyAttribute]: unassociatedObjects.map((unassociatedObject) => {
          return unassociatedObject.get(this.target.primaryKeyAttribute);
        })
      };
      promises.push(
        this.target.withoutScope().update(update, {
          ...options,
          where: updateWhere
        })
      );
    }
    await Promise.all(promises);
  }
  /**
   * Associate one or more target rows with `this`. This method accepts a Model / string / number to associate a single row,
   * or a mixed array of Model / string / numbers to associate multiple rows.
   *
   * @param sourceInstance the source instance
   * @param [rawTargetInstances] A single instance or primary key, or a mixed array of persisted instances or primary keys
   * @param [options] Options passed to `target.update`.
   */
  async add(sourceInstance, rawTargetInstances, options = {}) {
    const targetInstances = this.toInstanceArray(rawTargetInstances);
    if (targetInstances.length === 0) {
      return;
    }
    const update = {
      [this.foreignKey]: sourceInstance.get(this.sourceKey),
      ...this.scope
    };
    const where = {
      // @ts-expect-error -- TODO: what if the target has no primary key?
      [this.target.primaryKeyAttribute]: targetInstances.map((unassociatedObject) => {
        return unassociatedObject.get(this.target.primaryKeyAttribute);
      })
    };
    await this.target.withoutScope().update(update, { ...options, where });
  }
  /**
   * Un-associate one or several target rows.
   *
   * @param sourceInstance instance to un associate instances with
   * @param targets Can be an Instance or its primary key, or a mixed array of instances and primary keys
   * @param options Options passed to `target.update`
   */
  async remove(sourceInstance, targets, options = {}) {
    if (targets == null) {
      return;
    }
    const normalizedTargets = this.toInstanceOrPkArray(targets);
    if (normalizedTargets.length === 0) {
      return;
    }
    const where = {
      [this.foreignKey]: sourceInstance.get(this.sourceKey),
      // @ts-expect-error -- TODO: what if the target has no primary key?
      [this.target.primaryKeyAttribute]: normalizedTargets.map((targetInstance) => {
        if (targetInstance instanceof this.target) {
          return targetInstance.get(this.target.primaryKeyAttribute);
        }
        if ((0, import_utils.isPlainObject)(targetInstance) && this.target.primaryKeyAttribute in targetInstance) {
          return targetInstance[this.target.primaryKeyAttribute];
        }
        return targetInstance;
      })
    };
    const foreignKeyIsNullable = this.target.modelDefinition.attributes.get(this.foreignKey)?.allowNull ?? true;
    if (options.destroy || !foreignKeyIsNullable) {
      await this.target.withoutScope().destroy({
        ...(0, import_isObject.default)(options.destroy) ? options.destroy : void 0,
        logging: options.logging,
        benchmark: options.benchmark,
        transaction: options.transaction,
        where
      });
    } else {
      const update = {
        [this.foreignKey]: null
      };
      await this.target.withoutScope().update(update, { ...options, where });
    }
  }
  /**
   * Create a new instance of the associated model and associate it with this.
   *
   * @param sourceInstance source instance
   * @param values values for target model instance
   * @param options Options passed to `target.create`
   */
  async create(sourceInstance, values = {}, options = {}) {
    if (Array.isArray(options)) {
      options = {
        fields: options
      };
    }
    if (this.scope) {
      for (const attribute of Object.keys(this.scope)) {
        values[attribute] = this.scope[attribute];
        if (options.fields) {
          options.fields.push(attribute);
        }
      }
    }
    if (options.fields) {
      options.fields.push(this.foreignKey);
    }
    return this.target.create(
      {
        ...values,
        [this.foreignKey]: sourceInstance.get(this.sourceKey)
      },
      options
    );
  }
}
Object.defineProperty(HasManyAssociation, "name", {
  value: "HasMany"
});
function normalizeHasManyOptions(type, options, source, target) {
  return (0, import_helpers.normalizeBaseAssociationOptions)(
    type,
    {
      ...options,
      inverse: (0, import_helpers.normalizeInverseAssociation)(options.inverse)
    },
    source,
    target
  );
}
//# sourceMappingURL=has-many.js.map
