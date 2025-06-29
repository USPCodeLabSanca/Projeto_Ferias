"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var deprecations_exports = {};
__export(deprecations_exports, {
  alwaysQuoteIdentifiers: () => alwaysQuoteIdentifiers,
  columnToAttribute: () => columnToAttribute,
  doNotUseRealDataType: () => doNotUseRealDataType,
  fieldToColumn: () => fieldToColumn,
  hooksReworked: () => hooksReworked,
  movedSequelizeParam: () => movedSequelizeParam,
  noDataTypesUuid: () => noDataTypesUuid,
  noDoubleNestedGroup: () => noDoubleNestedGroup,
  noGetDialect: () => noGetDialect,
  noGetQueryInterface: () => noGetQueryInterface,
  noModelDropSchema: () => noModelDropSchema,
  noModelTableName: () => noModelTableName,
  noNewModel: () => noNewModel,
  noOpCol: () => noOpCol,
  noSchemaDelimiterParameter: () => noSchemaDelimiterParameter,
  noSchemaParameter: () => noSchemaParameter,
  noSequelizeDataType: () => noSequelizeDataType,
  noSequelizeIsDefined: () => noSequelizeIsDefined,
  noSequelizeModel: () => noSequelizeModel,
  noSqlJson: () => noSqlJson,
  noTrueLogging: () => noTrueLogging,
  schemaRenamedToWithSchema: () => schemaRenamedToWithSchema,
  scopeRenamedToWithScope: () => scopeRenamedToWithScope,
  showAllToListSchemas: () => showAllToListSchemas,
  showAllToListTables: () => showAllToListTables,
  unsupportedEngine: () => unsupportedEngine,
  useErrorCause: () => useErrorCause
});
module.exports = __toCommonJS(deprecations_exports);
var import_node_util = require("node:util");
const noop = () => {
};
const noTrueLogging = (0, import_node_util.deprecate)(
  noop,
  "The logging-option should be either a function or false. Default: console.log",
  "SEQUELIZE0002"
);
const noDoubleNestedGroup = (0, import_node_util.deprecate)(
  noop,
  "Passing a double nested nested array to `group` is unsupported and will be removed in v6.",
  "SEQUELIZE0005"
);
const unsupportedEngine = (0, import_node_util.deprecate)(
  noop,
  "This database engine version is not supported, please update your database server. More information https://sequelize.org/releases/",
  "SEQUELIZE0006"
);
const useErrorCause = (0, import_node_util.deprecate)(
  noop,
  'The "parent" and "original" properties in Sequelize errors have been replaced with the native "cause" property. Use that one instead.',
  "SEQUELIZE0007"
);
const scopeRenamedToWithScope = (0, import_node_util.deprecate)(
  noop,
  "Model.scope has been renamed to Model.withScope, and Model.unscoped has been renamed to Model.withoutScope",
  "SEQUELIZE0008"
);
const schemaRenamedToWithSchema = (0, import_node_util.deprecate)(
  noop,
  "Model.schema has been renamed to Model.withSchema",
  "SEQUELIZE0009"
);
const noSequelizeDataType = (0, import_node_util.deprecate)(
  noop,
  `Accessing DataTypes on the Sequelize constructor is deprecated. Use the DataTypes object instead.
e.g, instead of using Sequelize.STRING, use DataTypes.STRING`,
  "SEQUELIZE0010"
);
const noModelDropSchema = (0, import_node_util.deprecate)(
  noop,
  "Do not use Model.dropSchema. Use Sequelize#dropSchema or QueryInterface#dropSchema instead",
  "SEQUELIZE0011"
);
const movedSequelizeParam = (0, import_node_util.deprecate)(
  noop,
  'The "sequelize" instance has been moved from the second parameter bag to the first parameter bag in "beforeAssociate" and "afterAssociate" hooks',
  "SEQUELIZE0012"
);
const hooksReworked = (0, import_node_util.deprecate)(
  noop,
  'Sequelize Hooks methods, such as addHook, runHooks, beforeFind, and afterSync\u2026 are deprecated in favor of using the methods available through "sequelize.hooks", "Sequelize.hooks" and "YourModel.hooks".',
  "SEQUELIZE0013"
);
const doNotUseRealDataType = (0, import_node_util.deprecate)(
  noop,
  "Sequelize 7 has normalized its FLOAT & DOUBLE data types, and made REAL redundant. FLOAT is now always an IEEE-754 single precision floating point, and DOUBLE a double-precision one. Use either instead of REAL.",
  "SEQUELIZE0014"
);
const noSchemaParameter = (0, import_node_util.deprecate)(
  noop,
  "The schema parameter in QueryInterface#describeTable has been deprecated, use a TableNameWithSchema object to specify the schema or set the schema globally in the options.",
  "SEQUELIZE0015"
);
const noSchemaDelimiterParameter = (0, import_node_util.deprecate)(
  noop,
  "The schemaDelimiter parameter in QueryInterface#describeTable has been deprecated, use a TableNameWithSchema object to specify the schemaDelimiter.",
  "SEQUELIZE0016"
);
const columnToAttribute = (0, import_node_util.deprecate)(
  noop,
  "The @Column decorator has been renamed to @Attribute.",
  "SEQUELIZE0017"
);
const fieldToColumn = (0, import_node_util.deprecate)(
  noop,
  'The "field" option in attribute definitions has been renamed to "columnName".',
  "SEQUELIZE0018"
);
const noModelTableName = (0, import_node_util.deprecate)(
  noop,
  "Model.tableName has been replaced with the more complete Model.modelDefinition.table, or Model.table",
  "SEQUELIZE0019"
);
const noNewModel = (0, import_node_util.deprecate)(
  noop,
  `Do not use "new YourModel()" to instantiate a model. Use "YourModel.build()" instead. The previous option is being removed to resolve a conflict with class properties. See https://github.com/sequelize/sequelize/issues/14300#issuecomment-1355188077 for more information.`,
  "SEQUELIZE0020"
);
const noOpCol = (0, import_node_util.deprecate)(
  noop,
  "Do not use Op.col, use col(), attribute(), or identifier() instead. Read more about these in the Raw Queries guide in the sequelize docs.",
  "SEQUELIZE0021"
);
const noSqlJson = (0, import_node_util.deprecate)(
  noop,
  'The json() function used to generate JSON queries is deprecated. All of its features are available through where(), attribute() or jsonPath(). Some of its features have been removed but can be replicated using the "sql" tag. See our Sequelize 7 upgrade guide.',
  "SEQUELIZE0022"
);
const alwaysQuoteIdentifiers = (0, import_node_util.deprecate)(
  noop,
  'Setting "quoteIdentifiers" to false is unsafe and it will be removed in v8.',
  "SEQUELIZE0023"
);
const showAllToListSchemas = (0, import_node_util.deprecate)(
  noop,
  'Do not use "showAllSchemas". Use QueryInterface#listSchemas instead.',
  "SEQUELIZE0024"
);
const showAllToListTables = (0, import_node_util.deprecate)(
  noop,
  'Do not use "showAllTables". Use QueryInterface#listTables instead.',
  "SEQUELIZE0025"
);
const noDataTypesUuid = (0, import_node_util.deprecate)(
  noop,
  "Do not use DataTypes.UUIDV1 or DataTypes.UUIDV4. Use sql.uuidV1 or sql.uuidV4 instead.",
  "SEQUELIZE0026"
);
const noSequelizeModel = (0, import_node_util.deprecate)(
  noop,
  "Do not use sequelize.model(). Use sequelize.models.get or sequelize.models.getOrThrow instead.",
  "SEQUELIZE0028"
);
const noSequelizeIsDefined = (0, import_node_util.deprecate)(
  noop,
  "Do not use sequelize.isDefined(). Use sequelize.models.hasByName instead.",
  "SEQUELIZE0029"
);
const noGetQueryInterface = (0, import_node_util.deprecate)(
  noop,
  "Do not use sequelize.getQueryInterface(). Use sequelize.queryInterface instead.",
  "SEQUELIZE0030"
);
const noGetDialect = (0, import_node_util.deprecate)(
  noop,
  "Do not use sequelize.getDialect(). Use sequelize.dialect.name instead.",
  "SEQUELIZE0031"
);
//# sourceMappingURL=deprecations.js.map
