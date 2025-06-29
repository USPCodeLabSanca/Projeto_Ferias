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
var model_internals_exports = {};
__export(model_internals_exports, {
  _validateIncludedElements: () => _validateIncludedElements,
  assertHasPrimaryKey: () => assertHasPrimaryKey,
  assertHasWhereOptions: () => assertHasWhereOptions,
  combineIncludes: () => combineIncludes,
  conformIndex: () => conformIndex,
  ensureOptionsAreImmutable: () => ensureOptionsAreImmutable,
  getModelPkWhere: () => getModelPkWhere,
  getPrimaryKeyValueOrThrow: () => getPrimaryKeyValueOrThrow,
  setTransactionFromCls: () => setTransactionFromCls,
  throwInvalidInclude: () => throwInvalidInclude
});
module.exports = __toCommonJS(model_internals_exports);
var import_utils = require("@sequelize/utils");
var import_node_util = __toESM(require("node:util"));
var import_errors = require("./errors");
var import_check = require("./utils/check.js");
var import_model_utils = require("./utils/model-utils.js");
function _validateIncludedElements(options, tableNames = {}) {
  if (!(0, import_model_utils.isModelStatic)(options.model)) {
    throw new TypeError("options.model must be provided, and a Model subclass.");
  }
  const ModelSubclass = options.model;
  options.includeNames = [];
  options.includeMap = {};
  options.hasSingleAssociation = false;
  options.hasMultiAssociation = false;
  if (!options.parent) {
    options.topModel = options.model;
    options.topLimit = options.limit;
  }
  options.include = options.include.map((include) => {
    include = ModelSubclass._conformInclude(include, options.model);
    include.parent = options;
    include.topLimit = options.topLimit;
    ModelSubclass._validateIncludedElement.call(options.model, include, tableNames, options);
    if (include.duplicating === void 0) {
      include.duplicating = include.association.isMultiAssociation;
    }
    include.hasDuplicating = include.hasDuplicating || include.duplicating;
    include.hasRequired = include.hasRequired || include.required;
    options.hasDuplicating = options.hasDuplicating || include.hasDuplicating;
    options.hasRequired = options.hasRequired || include.required;
    options.hasWhere = options.hasWhere || include.hasWhere || Boolean(include.where);
    return include;
  });
  for (const include of options.include) {
    include.hasParentWhere = options.hasParentWhere || Boolean(options.where);
    include.hasParentRequired = options.hasParentRequired || Boolean(options.required);
    if (include.subQuery !== false && options.hasDuplicating && options.topLimit) {
      if (include.duplicating) {
        include.subQuery = include.subQuery || false;
        include.subQueryFilter = include.hasRequired;
      } else {
        include.subQuery = include.hasRequired;
        include.subQueryFilter = false;
      }
    } else {
      include.subQuery = include.subQuery || false;
      if (include.duplicating) {
        include.subQueryFilter = include.subQuery;
      } else {
        include.subQueryFilter = false;
        include.subQuery = include.subQuery || include.hasParentRequired && include.hasRequired && !include.separate;
      }
    }
    options.includeMap[include.as] = include;
    options.includeNames.push(include.as);
    if (options.topModel === options.model && options.subQuery === void 0 && options.topLimit) {
      if (include.subQuery) {
        options.subQuery = include.subQuery;
      } else if (include.hasDuplicating) {
        options.subQuery = true;
      }
    }
    options.hasIncludeWhere = options.hasIncludeWhere || include.hasIncludeWhere || Boolean(include.where);
    options.hasIncludeRequired = options.hasIncludeRequired || include.hasIncludeRequired || Boolean(include.required);
    if (include.association.isMultiAssociation || include.hasMultiAssociation) {
      options.hasMultiAssociation = true;
    }
    if (include.association.isSingleAssociation || include.hasSingleAssociation) {
      options.hasSingleAssociation = true;
    }
  }
  if (options.topModel === options.model && options.subQuery === void 0) {
    options.subQuery = false;
  }
  return options;
}
function combineIncludes(a, b) {
  if (a == null) {
    return b;
  }
  if (b == null) {
    return a;
  }
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError(
      "Includes should have already been normalized before calling this method, but it received something else than an array."
    );
  }
  const combinedIncludes = [...a];
  for (const newInclude of b) {
    const existingIndex = combinedIncludes.findIndex((include) => {
      if (!include.association || !newInclude.association) {
        throw new TypeError("Include should have been normalized");
      }
      return include.association === newInclude.association;
    });
    if (existingIndex === -1) {
      combinedIncludes.push(newInclude);
      continue;
    }
    const ModelClass = newInclude.model;
    ModelClass._assignOptions(combinedIncludes[existingIndex], newInclude);
  }
  return combinedIncludes;
}
function throwInvalidInclude(include) {
  throw new import_errors.EagerLoadingError(`Invalid Include received. Include has to be either a Model, an Association, the name of an association, or a plain object compatible with IncludeOptions.
Got ${import_node_util.default.inspect(include)} instead`);
}
function setTransactionFromCls(options, sequelize) {
  if (options.transaction && options.connection && options.connection !== options.transaction.getConnection()) {
    throw new Error(
      `You are using mismatching "transaction" and "connection" options. Please pass either one of them, or make sure they're both using the same connection.`
    );
  }
  if (options.transaction === void 0 && options.connection == null) {
    const currentTransaction = sequelize.getCurrentClsTransaction();
    if (currentTransaction) {
      options.transaction = currentTransaction;
    }
  }
  if (options.connection) {
    const clsTransaction = sequelize.getCurrentClsTransaction();
    const transactionConnection = clsTransaction?.getConnectionIfExists();
    if (transactionConnection && transactionConnection === options.connection) {
      options.transaction = clsTransaction;
    }
  } else {
    const connection = options.transaction?.getConnectionIfExists();
    if (connection) {
      options.connection = connection;
    }
  }
}
function conformIndex(index) {
  if (!index.fields) {
    throw new Error('Missing "fields" property for index definition');
  }
  index = { ...index };
  if (index.type && index.type.toLowerCase() === "unique") {
    index.unique = true;
    delete index.type;
  }
  return index;
}
function getPrimaryKeyValueOrThrow(instance, attributeName) {
  const attrVal = instance.get(attributeName, { raw: true });
  if (attrVal == null) {
    throw new TypeError(
      `This model instance method needs to be able to identify the entity in a stable way, but this model instance is missing the value of its primary key "${attributeName}". Make sure that attribute was not excluded when retrieving the model from the database.`
    );
  }
  return attrVal;
}
function getModelPkWhere(instance, checkVersion, nullIfImpossible) {
  const modelDefinition = instance.modelDefinition;
  if (modelDefinition.primaryKeysAttributeNames.size === 0) {
    if (nullIfImpossible) {
      return null;
    }
    assertHasPrimaryKey(modelDefinition);
  }
  const where = /* @__PURE__ */ Object.create(null);
  for (const attributeName of modelDefinition.primaryKeysAttributeNames) {
    const attrVal = nullIfImpossible ? instance.get(attributeName, { raw: true }) : getPrimaryKeyValueOrThrow(instance, attributeName);
    if (attrVal == null) {
      return null;
    }
    where[attributeName] = attrVal;
  }
  const versionAttr = modelDefinition.versionAttributeName;
  if (checkVersion && versionAttr) {
    where[versionAttr] = instance.get(versionAttr, { raw: true });
  }
  return where;
}
function assertHasPrimaryKey(modelDefinition) {
  if (modelDefinition.primaryKeysAttributeNames.size === 0) {
    throw new Error(
      `This model instance method needs to be able to identify the entity in a stable way, but the model does not have a primary key attribute definition.
Either add a primary key to this model, or use one of the following alternatives:

- instance methods "save", "update", "decrement", "increment": Use the static "update" method instead.
- instance method "reload": Use the static "findOne" method instead.
- instance methods "destroy" and "restore": use the static "destroy" and "restore" methods instead.
        `.trim()
    );
  }
}
function assertHasWhereOptions(options) {
  if (options?.where == null) {
    throw new Error(
      'As a safeguard, this method requires explicitly specifying a "where" option. If you actually mean to delete all rows in the table, set the option to a dummy condition such as sql`1 = 1`.'
    );
  }
}
function ensureOptionsAreImmutable(options) {
  if ((0, import_check.isDevEnv)()) {
    return (0, import_utils.freezeDescendants)((0, import_utils.cloneDeepPlainValues)(options, true));
  }
  return options;
}
//# sourceMappingURL=model-internals.js.map
