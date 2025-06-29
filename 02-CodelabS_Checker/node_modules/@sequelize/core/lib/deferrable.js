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
var deferrable_exports = {};
__export(deferrable_exports, {
  ConstraintChecking: () => ConstraintChecking,
  Deferrable: () => Deferrable
});
module.exports = __toCommonJS(deferrable_exports);
var import_utils = require("@sequelize/utils");
var import_isEqual = __toESM(require("lodash/isEqual"));
var import_class_to_invokable = require("./utils/class-to-invokable.js");
var Deferrable = /* @__PURE__ */ ((Deferrable2) => {
  Deferrable2["INITIALLY_DEFERRED"] = "INITIALLY_DEFERRED";
  Deferrable2["INITIALLY_IMMEDIATE"] = "INITIALLY_IMMEDIATE";
  Deferrable2["NOT"] = "NOT";
  return Deferrable2;
})(Deferrable || {});
class ConstraintChecking {
  toString() {
    return this.constructor.name;
  }
  isEqual(_other) {
    throw new Error("isEqual implementation missing");
  }
  static toString() {
    return this.name;
  }
  get constraints() {
    throw new Error("constraints getter implementation missing");
  }
  /**
   * Will trigger an additional query at the beginning of a
   * transaction which sets the constraints to deferred.
   */
  static DEFERRED = (0, import_class_to_invokable.classToInvokable)(
    class DEFERRED extends ConstraintChecking {
      #constraints;
      /**
       * @param constraints An array of constraint names. Will defer all constraints by default.
       */
      constructor(constraints = import_utils.EMPTY_ARRAY) {
        super();
        this.#constraints = Object.freeze([...constraints]);
      }
      isEqual(other) {
        return other instanceof DEFERRED && (0, import_isEqual.default)(this.#constraints, other.#constraints);
      }
      get constraints() {
        return this.#constraints;
      }
    }
  );
  /**
   * Will trigger an additional query at the beginning of a
   * transaction which sets the constraints to immediately.
   */
  static IMMEDIATE = (0, import_class_to_invokable.classToInvokable)(
    class IMMEDIATE extends ConstraintChecking {
      #constraints;
      /**
       * @param constraints An array of constraint names. Will defer all constraints by default.
       */
      constructor(constraints = import_utils.EMPTY_ARRAY) {
        super();
        this.#constraints = Object.freeze([...constraints]);
      }
      isEqual(other) {
        return other instanceof IMMEDIATE && (0, import_isEqual.default)(this.#constraints, other.#constraints);
      }
      get constraints() {
        return this.#constraints;
      }
    }
  );
}
//# sourceMappingURL=deferrable.js.map
