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
var base_exports = {};
__export(base_exports, {
  Association: () => Association,
  MultiAssociation: () => MultiAssociation
});
module.exports = __toCommonJS(base_exports);
var import_utils = require("@sequelize/utils");
var import_isObject = __toESM(require("lodash/isObject.js"));
var import_object = require("../utils/object.js");
var import_helpers = require("./helpers");
class Association {
  source;
  target;
  isSelfAssociation;
  isAliased;
  options;
  /**
   * A reference to the association that created this one.
   */
  parentAssociation;
  /**
   * Creating an associations can automatically create other associations.
   * This returns the initial association that caused the creation of the descendant associations.
   */
  // eslint-disable-next-line @typescript-eslint/prefer-return-this-type -- false positive
  get rootAssociation() {
    if (this.parentAssociation) {
      return this.parentAssociation.rootAssociation;
    }
    return this;
  }
  /**
   * The type of the association. One of `HasMany`, `BelongsTo`, `HasOne`, `BelongsToMany`
   *
   * @type {string}
   */
  get associationType() {
    return this.constructor.name;
  }
  get isMultiAssociation() {
    return this.constructor.isMultiAssociation;
  }
  /**
   * @deprecated negate {@link isMultiAssociation} instead
   */
  get isSingleAssociation() {
    return !this.isMultiAssociation;
  }
  static get isMultiAssociation() {
    return false;
  }
  constructor(secret, source, target, options, parent) {
    if (secret !== import_helpers.AssociationSecret) {
      throw new Error(
        `Class ${this.constructor.name} cannot be instantiated directly due to it mutating the source model. Use one of the static methods on Model instead.`
      );
    }
    this.source = source;
    this.target = target;
    this.parentAssociation = parent ?? null;
    this.isSelfAssociation = // @ts-expect-error -- TypeScript thinks ModelStatic & ModelStatic have no overlap.
    this.source === this.target;
    this.isAliased = Boolean(options?.as);
    this.options = (0, import_object.cloneDeep)(options) ?? {};
    source.modelDefinition.hooks.runSync("beforeDefinitionRefresh");
    source.associations[this.as] = this;
    source.modelDefinition.hooks.runSync("afterDefinitionRefresh");
  }
  /**
   * The identifier of the relation on the source model.
   */
  get as() {
    return this.options.as;
  }
  get name() {
    return this.options.name;
  }
  get scope() {
    return this.options.scope;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.as;
  }
}
class MultiAssociation extends Association {
  static get isMultiAssociation() {
    return true;
  }
  toInstanceOrPkArray(input) {
    if (input == null) {
      return [];
    }
    if (!(0, import_utils.isIterable)(input) || !(0, import_isObject.default)(input)) {
      return [input];
    }
    return [...input];
  }
  /**
   * Normalize input
   *
   * @param input it may be array or single obj, instance or primary key
   *
   * @private
   * @returns built objects
   */
  toInstanceArray(input) {
    const normalizedInput = this.toInstanceOrPkArray(input);
    return normalizedInput.map((element) => {
      if (element instanceof this.target) {
        return element;
      }
      const tmpInstance = /* @__PURE__ */ Object.create(null);
      tmpInstance[this.target.primaryKeyAttribute] = element;
      return this.target.build(tmpInstance, { isNewRecord: false });
    });
  }
}
//# sourceMappingURL=base.js.map
