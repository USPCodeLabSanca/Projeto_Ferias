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
var instance_validator_exports = {};
__export(instance_validator_exports, {
  InstanceValidator: () => InstanceValidator
});
module.exports = __toCommonJS(instance_validator_exports);
var import_difference = __toESM(require("lodash/difference"));
var import_forIn = __toESM(require("lodash/forIn"));
var import_get = __toESM(require("lodash/get"));
var import_node_util = require("node:util");
var import_data_types = require("./abstract-dialect/data-types");
var import_data_types_utils = require("./abstract-dialect/data-types-utils");
var import_belongs_to = require("./associations/belongs-to");
var SequelizeError = __toESM(require("./errors"));
var import_base_sql_expression = require("./expression-builders/base-sql-expression.js");
var import_object = require("./utils/object");
var import_validator_extras = require("./utils/validator-extras");
class InstanceValidator {
  constructor(modelInstance, options) {
    options = {
      // assign defined and default options
      hooks: true,
      ...options
    };
    if (options.fields && !options.skip) {
      options.skip = (0, import_difference.default)(
        Array.from(modelInstance.modelDefinition.attributes.keys()),
        options.fields
      );
    } else {
      options.skip ??= [];
    }
    this.options = options;
    this.modelInstance = modelInstance;
    this.validator = import_validator_extras.validator;
    this.errors = [];
    this.inProgress = false;
  }
  /**
   * The main entry point for the Validation module, invoke to start the dance.
   *
   * @returns {Promise}
   * @private
   */
  async _validate() {
    if (this.inProgress) {
      throw new Error("Validations already in progress.");
    }
    this.inProgress = true;
    await Promise.all([this._perAttributeValidators(), this._customValidators()]);
    if (this.errors.length > 0) {
      throw new SequelizeError.ValidationError(null, this.errors);
    }
  }
  /**
   * Invoke the Validation sequence and run validation hooks if defined
   *   - Before Validation Model Hooks
   *   - Validation
   *   - On validation success: After Validation Model Hooks
   *   - On validation failure: Validation Failed Model Hooks
   *
   * @returns {Promise}
   * @private
   */
  async validate() {
    return await (this.options.hooks ? this._validateAndRunHooks() : this._validate());
  }
  /**
   * Invoke the Validation sequence and run hooks
   *   - Before Validation Model Hooks
   *   - Validation
   *   - On validation success: After Validation Model Hooks
   *   - On validation failure: Validation Failed Model Hooks
   *
   * @returns {Promise}
   * @private
   */
  async _validateAndRunHooks() {
    await this.modelInstance.constructor.hooks.runAsync(
      "beforeValidate",
      this.modelInstance,
      this.options
    );
    try {
      await this._validate();
    } catch (error) {
      const newError = await this.modelInstance.constructor.hooks.runAsync(
        "validationFailed",
        this.modelInstance,
        this.options,
        error
      );
      throw newError || error;
    }
    await this.modelInstance.constructor.hooks.runAsync(
      "afterValidate",
      this.modelInstance,
      this.options
    );
    return this.modelInstance;
  }
  /**
   * Will run all the validators defined per attribute (built-in validators and custom validators)
   *
   * @returns {Promise<Array>}
   * @private
   */
  async _perAttributeValidators() {
    const validators = [];
    const { attributes } = this.modelInstance.modelDefinition;
    for (const attribute of attributes.values()) {
      const attrName = attribute.attributeName;
      if (this.options.skip.includes(attrName)) {
        continue;
      }
      const value = this.modelInstance.dataValues[attrName];
      if (value instanceof import_base_sql_expression.BaseSqlExpression) {
        continue;
      }
      if (!attribute._autoGenerated && !attribute.autoIncrement) {
        this._validateSchema(attribute, attrName, value);
      }
      if (attribute.validate) {
        validators.push(this._singleAttrValidate(value, attrName, attribute.allowNull));
      }
    }
    return await Promise.all(validators);
  }
  /**
   * Will run all the custom validators defined in the model's options.
   *
   * @returns {Promise<Array>}
   * @private
   */
  async _customValidators() {
    const validators = [];
    const validateOptions = this.modelInstance.constructor.options.validate;
    for (const validatorName of (0, import_object.getAllOwnKeys)(validateOptions)) {
      if (this.options.skip.includes(validatorName)) {
        continue;
      }
      const validator2 = validateOptions[validatorName];
      const valprom = this._invokeCustomValidator(validator2, validatorName).catch(() => {
      });
      validators.push(valprom);
    }
    return await Promise.all(validators);
  }
  /**
   * Validate a single attribute with all the defined built-in validators and custom validators.
   *
   * @private
   *
   * @param {*} value Anything.
   * @param {string} attributeName The attribute name.
   * @param {boolean} allowNull Whether or not the schema allows null values
   *
   * @returns {Promise} A promise, will always resolve, auto populates error on this.error local object.
   */
  async _singleAttrValidate(value, attributeName, allowNull) {
    if (value == null && !allowNull) {
      return;
    }
    const validators = [];
    const attribute = this.modelInstance.modelDefinition.attributes.get(attributeName);
    (0, import_forIn.default)(attribute.validate, (test, validatorType) => {
      if (["isUrl", "isURL", "isEmail"].includes(validatorType)) {
        if (typeof test === "object" && test !== null && test.msg) {
          test = {
            msg: test.msg
          };
        } else if (test === true) {
          test = {};
        }
      }
      if (typeof test === "function") {
        validators.push(
          this._invokeCustomValidator(test, validatorType, true, value, attributeName)
        );
        return;
      }
      if (value === null || value === void 0) {
        return;
      }
      const validatorPromise = this._invokeBuiltinValidator(
        value,
        test,
        validatorType,
        attributeName
      );
      validatorPromise.catch(() => {
      });
      validators.push(validatorPromise);
    });
    return Promise.all(
      validators.map(
        (validator2) => validator2.catch((error) => {
          const isBuiltIn = Boolean(error.validatorName);
          this._pushError(
            isBuiltIn,
            attributeName,
            error,
            value,
            error.validatorName,
            error.validatorArgs
          );
        })
      )
    );
  }
  /**
   * Prepare and invoke a custom validator.
   *
   * @private
   *
   * @param {Function} validator The custom validator.
   * @param {string} validatorType the custom validator type (name).
   * @param {boolean} optAttrDefined Set to true if custom validator was defined from the attribute
   * @param {*} optValue value for attribute
   * @param {string} optField field for attribute
   *
   * @returns {Promise} A promise.
   */
  async _invokeCustomValidator(validator2, validatorType, optAttrDefined, optValue, optField) {
    let isAsync = false;
    const validatorArity = validator2.length;
    let asyncArity = 1;
    let errorKey = validatorType;
    let invokeArgs;
    if (optAttrDefined) {
      asyncArity = 2;
      invokeArgs = optValue;
      errorKey = optField;
    }
    if (validatorArity === asyncArity) {
      isAsync = true;
    }
    if (isAsync) {
      try {
        if (optAttrDefined) {
          return await (0, import_node_util.promisify)(validator2.bind(this.modelInstance, invokeArgs))();
        }
        return await (0, import_node_util.promisify)(validator2.bind(this.modelInstance))();
      } catch (error) {
        return this._pushError(false, errorKey, error, optValue, validatorType);
      }
    }
    try {
      return await validator2.call(this.modelInstance, invokeArgs);
    } catch (error) {
      return this._pushError(false, errorKey, error, optValue, validatorType);
    }
  }
  /**
   * Prepare and invoke a build-in validator.
   *
   * @private
   *
   * @param {*} value Anything.
   * @param {*} test The test case.
   * @param {string} validatorType One of known to Sequelize validators.
   * @param {string} field The field that is being validated
   *
   * @returns {object} An object with specific keys to invoke the validator.
   */
  async _invokeBuiltinValidator(value, test, validatorType, field) {
    const valueString = String(value);
    if (typeof import_validator_extras.validator[validatorType] !== "function") {
      throw new TypeError(`Invalid validator function: ${validatorType}`);
    }
    const validatorArgs = this._extractValidatorArgs(test, validatorType, field);
    if (!import_validator_extras.validator[validatorType](valueString, ...validatorArgs)) {
      throw Object.assign(new Error(test.msg || `Validation ${validatorType} on ${field} failed`), {
        validatorName: validatorType,
        validatorArgs
      });
    }
  }
  /**
   * Will extract arguments for the validator.
   *
   * @param {*} test The test case.
   * @param {string} validatorType One of known to Sequelize validators.
   * @param {string} field The field that is being validated.
   *
   * @private
   */
  _extractValidatorArgs(test, validatorType, field) {
    let validatorArgs = test.args || test;
    const isLocalizedValidator = typeof validatorArgs !== "string" && ["isAlpha", "isAlphanumeric", "isMobilePhone"].includes(validatorType);
    if (!Array.isArray(validatorArgs)) {
      if (validatorType === "isImmutable") {
        validatorArgs = [validatorArgs, field, this.modelInstance];
      } else if (isLocalizedValidator || validatorType === "isIP") {
        validatorArgs = [];
      } else {
        validatorArgs = [validatorArgs];
      }
    } else {
      validatorArgs = [...validatorArgs];
    }
    return validatorArgs;
  }
  /**
   * Will validate a single field against its schema definition (isnull).
   *
   * @param {object} attribute As defined in the Schema.
   * @param {string} attributeName The field name.
   * @param {*} value anything.
   *
   * @private
   */
  _validateSchema(attribute, attributeName, value) {
    if (attribute.allowNull === false && value == null) {
      const modelDefinition = this.modelInstance.modelDefinition;
      const association = Object.values(modelDefinition.associations).find(
        (association2) => association2 instanceof import_belongs_to.BelongsToAssociation && association2.foreignKey === attribute.fieldName
      );
      if (!association || !this.modelInstance.get(association.as)) {
        const validators = modelDefinition.attributes.get(attributeName)?.validate;
        const errMsg = (0, import_get.default)(
          validators,
          "notNull.msg",
          `${this.modelInstance.constructor.name}.${attributeName} cannot be null`
        );
        this.errors.push(
          new SequelizeError.ValidationErrorItem(
            errMsg,
            "notNull violation",
            // sequelizeError.ValidationErrorItem.Origins.CORE,
            attributeName,
            value,
            this.modelInstance,
            "is_null"
          )
        );
      }
    }
    const type = attribute.type;
    if (value != null && !(value instanceof import_base_sql_expression.BaseSqlExpression) && type instanceof import_data_types.AbstractDataType) {
      const error = (0, import_data_types_utils.validateDataType)(value, type, attributeName, this.modelInstance);
      if (error) {
        this.errors.push(error);
      }
    }
  }
  /**
   * Signs all errors retaining the original.
   *
   * @param {boolean}       isBuiltin   - Determines if error is from builtin validator.
   * @param {string}        errorKey    - name of invalid attribute.
   * @param {Error|string}  rawError    - The original error.
   * @param {string|number} value       - The data that triggered the error.
   * @param {string}        fnName      - Name of the validator, if any
   * @param {Array}         fnArgs      - Arguments for the validator [function], if any
   *
   * @private
   */
  _pushError(isBuiltin, errorKey, rawError, value, fnName, fnArgs) {
    const message = rawError.message || rawError || "Validation error";
    const error = new SequelizeError.ValidationErrorItem(
      message,
      "Validation error",
      // sequelizeError.ValidationErrorItem.Origins.FUNCTION,
      errorKey,
      value,
      this.modelInstance,
      fnName,
      isBuiltin ? fnName : void 0,
      isBuiltin ? fnArgs : void 0
    );
    error[InstanceValidator.RAW_KEY_NAME] = rawError;
    this.errors.push(error);
  }
}
InstanceValidator.RAW_KEY_NAME = "original";
//# sourceMappingURL=instance-validator.js.map
