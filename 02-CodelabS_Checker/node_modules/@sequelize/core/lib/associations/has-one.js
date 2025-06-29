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
var has_one_exports = {};
__export(has_one_exports, {
  HasOneAssociation: () => HasOneAssociation
});
module.exports = __toCommonJS(has_one_exports);
var import_isObject = __toESM(require("lodash/isObject"));
var import_upperFirst = __toESM(require("lodash/upperFirst"));
var import_errors = require("../errors/index.js");
var import_model = require("../model");
var import_operators = require("../operators");
var import_model_utils = require("../utils/model-utils.js");
var import_object = require("../utils/object.js");
var import_base = require("./base");
var import_belongs_to = require("./belongs-to.js");
var import_helpers = require("./helpers");
class HasOneAssociation extends import_base.Association {
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
   * In HasOne, it is on the Source Model, instead of the Target Model (unlike {@link BelongsToAssociation.targetKey}).
   * The {@link Association.foreignKey} is on the Target Model.
   */
  get sourceKey() {
    return this.inverse.targetKey;
  }
  /**
   * The Column Name of the source key.
   */
  get sourceKeyField() {
    return this.inverse.targetKeyField;
  }
  /**
   * @deprecated use {@link sourceKey}
   */
  get sourceKeyAttribute() {
    return this.sourceKey;
  }
  inverse;
  accessors;
  constructor(secret, source, target, options, parent, inverse) {
    if (options?.sourceKey && !source.getAttributes()[options.sourceKey]) {
      throw new Error(
        `Unknown attribute "${options.sourceKey}" passed as sourceKey, define this attribute on model "${source.name}" first`
      );
    }
    if ("keyType" in options) {
      throw new TypeError(
        `Option "keyType" has been removed from the BelongsTo's options. Set "foreignKey.type" instead.`
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
    const singular = (0, import_upperFirst.default)(this.options.name.singular);
    this.accessors = {
      get: `get${singular}`,
      set: `set${singular}`,
      create: `create${singular}`
    };
    this.#mixin(source.prototype);
  }
  #mixin(mixinTargetPrototype) {
    (0, import_helpers.mixinMethods)(this, mixinTargetPrototype, ["get", "set", "create"]);
  }
  static associate(secret, source, target, options = {}, parent, inverse) {
    return (0, import_helpers.defineAssociation)(
      HasOneAssociation,
      source,
      target,
      options,
      parent,
      normalizeHasOneOptions,
      (normalizedOptions) => {
        if ((0, import_model_utils.isSameInitialModel)(source, target) && // use 'options' because this will always be set in 'normalizedOptions'
        (!options.as || !normalizedOptions.inverse?.as || options.as === normalizedOptions.inverse.as)) {
          throw new import_errors.AssociationError(`Both options "as" and "inverse.as" must be defined for hasOne self-associations, and their value must be different.
This is because hasOne associations automatically create the corresponding belongsTo association, but they cannot share the same name.

If having two associations does not make sense (for instance a "spouse" association from user to user), consider using belongsTo instead of hasOne.`);
        }
        return new HasOneAssociation(secret, source, target, normalizedOptions, parent, inverse);
      }
    );
  }
  async get(instances, options) {
    options = options ? (0, import_object.cloneDeep)(options) : {};
    let Target = this.target;
    if (options.scope != null) {
      if (!options.scope) {
        Target = Target.withoutScope();
      } else if (options.scope !== true) {
        Target = Target.withScope(options.scope);
      }
    }
    if (options.schema != null) {
      Target = Target.withSchema({
        schema: options.schema,
        schemaDelimiter: options.schemaDelimiter
      });
    }
    let isManyMode = true;
    if (!Array.isArray(instances)) {
      isManyMode = false;
      instances = [instances];
    }
    const where = /* @__PURE__ */ Object.create(null);
    if (instances.length > 1) {
      where[this.foreignKey] = {
        [import_operators.Op.in]: instances.map((instance) => instance.get(this.sourceKey))
      };
    } else {
      where[this.foreignKey] = instances[0].get(this.sourceKey);
    }
    if (this.scope) {
      Object.assign(where, this.scope);
    }
    options.where = options.where ? { [import_operators.Op.and]: [where, options.where] } : where;
    if (isManyMode) {
      const results = await Target.findAll(options);
      const result = /* @__PURE__ */ new Map();
      for (const targetInstance of results) {
        result.set(targetInstance.get(this.foreignKey, { raw: true }), targetInstance);
      }
      return result;
    }
    return Target.findOne(options);
  }
  async set(sourceInstance, associatedInstanceOrPk, options) {
    options = { ...options, scope: false };
    if (options.save === false) {
      throw new Error(`The "save: false" option cannot be honoured in ${this.source.name}#${this.accessors.set}
because, as this is a hasOne association, the foreign key we need to update is located on the model ${this.target.name}.

This option is only available in BelongsTo associations.`);
    }
    const oldInstance = await this.get(sourceInstance, options);
    const alreadyAssociated = !oldInstance || !associatedInstanceOrPk ? false : associatedInstanceOrPk instanceof import_model.Model ? associatedInstanceOrPk.equals(oldInstance) : (
      // @ts-expect-error -- TODO: what if the target has no primary key?
      oldInstance.get(this.target.primaryKeyAttribute) === associatedInstanceOrPk
    );
    if (alreadyAssociated) {
      if (associatedInstanceOrPk instanceof import_model.Model) {
        return associatedInstanceOrPk;
      }
      return oldInstance;
    }
    if (oldInstance) {
      const foreignKeyIsNullable = this.target.modelDefinition.attributes.get(this.foreignKey)?.allowNull ?? true;
      if (options.destroyPrevious || !foreignKeyIsNullable) {
        await oldInstance.destroy({
          ...(0, import_isObject.default)(options.destroyPrevious) ? options.destroyPrevious : void 0,
          logging: options.logging,
          benchmark: options.benchmark,
          transaction: options.transaction
        });
      } else {
        await oldInstance.update(
          {
            [this.foreignKey]: null
          },
          {
            ...options,
            association: true
          }
        );
      }
    }
    if (associatedInstanceOrPk) {
      let associatedInstance;
      if (associatedInstanceOrPk instanceof this.target) {
        associatedInstance = associatedInstanceOrPk;
      } else {
        const tmpInstance = /* @__PURE__ */ Object.create(null);
        tmpInstance[this.target.primaryKeyAttribute] = associatedInstanceOrPk;
        associatedInstance = this.target.build(tmpInstance, {
          isNewRecord: false
        });
      }
      Object.assign(associatedInstance, this.scope);
      associatedInstance.set(this.foreignKey, sourceInstance.get(this.sourceKeyAttribute));
      return associatedInstance.save(options);
    }
    return null;
  }
  /**
   * Create a new instance of the associated model and associate it with this.
   *
   * See {@link Model.create} for a full explanation of options.
   *
   * @param sourceInstance - the source instance
   * @param values - values to create associated model instance with
   * @param options - Options passed to `target.create` and setAssociation.
   *
   * @returns The created target model
   */
  async create(sourceInstance, values = {}, options = {}) {
    if (this.scope) {
      for (const attribute of Object.keys(this.scope)) {
        values[attribute] = this.scope[attribute];
        if (options.fields) {
          options.fields.push(attribute);
        }
      }
    }
    values[this.foreignKey] = sourceInstance.get(this.sourceKeyAttribute);
    if (options.fields) {
      options.fields.push(this.foreignKey);
    }
    return this.target.create(values, options);
  }
}
Object.defineProperty(HasOneAssociation, "name", {
  value: "HasOne"
});
function normalizeHasOneOptions(type, options, source, target) {
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
//# sourceMappingURL=has-one.js.map
