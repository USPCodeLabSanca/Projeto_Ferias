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
var query_generator_exports = {};
__export(query_generator_exports, {
  MySqlQueryGenerator: () => MySqlQueryGenerator
});
module.exports = __toCommonJS(query_generator_exports);
var import_data_types_utils = require("@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/data-types-utils.js");
var import_query_generator = require("@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/query-generator.js");
var import_base_sql_expression = require("@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/base-sql-expression.js");
var import_check = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/check.js");
var import_join_sql_fragments = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/join-sql-fragments.js");
var import_object = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/object.js");
var import_query_builder_utils = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/query-builder-utils.js");
var import_utils = require("@sequelize/utils");
var import_each = __toESM(require("lodash/each"));
var import_isPlainObject = __toESM(require("lodash/isPlainObject"));
var import_query_generator_typescript_internal = require("./query-generator-typescript.internal.js");
const typeWithoutDefault = /* @__PURE__ */ new Set(["BLOB", "TEXT", "GEOMETRY", "JSON"]);
class MySqlQueryGenerator extends import_query_generator_typescript_internal.MySqlQueryGeneratorTypeScript {
  createTableQuery(tableName, attributes, options) {
    options = {
      engine: "InnoDB",
      charset: null,
      rowFormat: null,
      ...options
    };
    const primaryKeys = [];
    const foreignKeys = {};
    const attrStr = [];
    for (const attr in attributes) {
      if (!Object.hasOwn(attributes, attr)) {
        continue;
      }
      const dataType = attributes[attr];
      let match;
      if (dataType.includes("PRIMARY KEY")) {
        primaryKeys.push(attr);
        if (dataType.includes("REFERENCES")) {
          match = dataType.match(/^(.+) (REFERENCES.*)$/);
          attrStr.push(`${this.quoteIdentifier(attr)} ${match[1].replace("PRIMARY KEY", "")}`);
          foreignKeys[attr] = match[2];
        } else {
          attrStr.push(`${this.quoteIdentifier(attr)} ${dataType.replace("PRIMARY KEY", "")}`);
        }
      } else if (dataType.includes("REFERENCES")) {
        match = dataType.match(/^(.+) (REFERENCES.*)$/);
        attrStr.push(`${this.quoteIdentifier(attr)} ${match[1]}`);
        foreignKeys[attr] = match[2];
      } else {
        attrStr.push(`${this.quoteIdentifier(attr)} ${dataType}`);
      }
    }
    const table = this.quoteTable(tableName);
    let attributesClause = attrStr.join(", ");
    const pkString = primaryKeys.map((pk) => this.quoteIdentifier(pk)).join(", ");
    if (options.uniqueKeys) {
      (0, import_each.default)(options.uniqueKeys, (columns, indexName) => {
        if (typeof indexName !== "string") {
          indexName = `uniq_${tableName}_${columns.fields.join("_")}`;
        }
        attributesClause += `, UNIQUE ${this.quoteIdentifier(indexName)} (${columns.fields.map((field) => this.quoteIdentifier(field)).join(", ")})`;
      });
    }
    if (pkString.length > 0) {
      attributesClause += `, PRIMARY KEY (${pkString})`;
    }
    for (const fkey in foreignKeys) {
      if (Object.hasOwn(foreignKeys, fkey)) {
        attributesClause += `, FOREIGN KEY (${this.quoteIdentifier(fkey)}) ${foreignKeys[fkey]}`;
      }
    }
    return (0, import_join_sql_fragments.joinSQLFragments)([
      "CREATE TABLE IF NOT EXISTS",
      table,
      `(${attributesClause})`,
      `ENGINE=${options.engine}`,
      options.comment && typeof options.comment === "string" && `COMMENT ${this.escape(options.comment)}`,
      options.charset && `DEFAULT CHARSET=${options.charset}`,
      options.collate && `COLLATE ${options.collate}`,
      options.initialAutoIncrement && `AUTO_INCREMENT=${options.initialAutoIncrement}`,
      options.rowFormat && `ROW_FORMAT=${options.rowFormat}`,
      ";"
    ]);
  }
  addColumnQuery(table, key, dataType, options) {
    if (options) {
      (0, import_check.rejectInvalidOptions)(
        "addColumnQuery",
        this.dialect,
        import_query_generator.ADD_COLUMN_QUERY_SUPPORTABLE_OPTIONS,
        import_object.EMPTY_SET,
        options
      );
    }
    dataType = {
      ...dataType,
      type: (0, import_data_types_utils.normalizeDataType)(dataType.type, this.dialect)
    };
    return (0, import_join_sql_fragments.joinSQLFragments)([
      "ALTER TABLE",
      this.quoteTable(table),
      "ADD",
      this.quoteIdentifier(key),
      this.attributeToSQL(dataType, {
        context: "addColumn",
        tableName: table,
        foreignKey: key
      }),
      ";"
    ]);
  }
  changeColumnQuery(tableName, attributes) {
    const attrString = [];
    const constraintString = [];
    for (const attributeName in attributes) {
      let definition = attributes[attributeName];
      if (definition.includes("REFERENCES")) {
        const attrName = this.quoteIdentifier(attributeName);
        definition = definition.replace(/.+?(?=REFERENCES)/, "");
        constraintString.push(`FOREIGN KEY (${attrName}) ${definition}`);
      } else {
        attrString.push(`\`${attributeName}\` \`${attributeName}\` ${definition}`);
      }
    }
    return (0, import_join_sql_fragments.joinSQLFragments)([
      "ALTER TABLE",
      this.quoteTable(tableName),
      attrString.length && `CHANGE ${attrString.join(", ")}`,
      constraintString.length && `ADD ${constraintString.join(", ")}`,
      ";"
    ]);
  }
  renameColumnQuery(tableName, attrBefore, attributes) {
    const attrString = [];
    for (const attrName in attributes) {
      const definition = attributes[attrName];
      attrString.push(`\`${attrBefore}\` \`${attrName}\` ${definition}`);
    }
    return (0, import_join_sql_fragments.joinSQLFragments)([
      "ALTER TABLE",
      this.quoteTable(tableName),
      "CHANGE",
      attrString.join(", "),
      ";"
    ]);
  }
  attributeToSQL(attribute, options) {
    if (!(0, import_isPlainObject.default)(attribute)) {
      attribute = {
        type: attribute
      };
    }
    const attributeString = (0, import_data_types_utils.attributeTypeToSql)(attribute.type, {
      escape: this.escape.bind(this),
      dialect: this.dialect
    });
    let template = attributeString;
    if (attribute.allowNull === false) {
      template += " NOT NULL";
    }
    if (attribute.autoIncrement) {
      template += " auto_increment";
    }
    if (!typeWithoutDefault.has(attributeString) && attribute.type._binary !== true && (0, import_query_builder_utils.defaultValueSchemable)(attribute.defaultValue, this.dialect)) {
      const { defaultValue } = attribute;
      const escaped = this.escape(defaultValue);
      template += ` DEFAULT ${defaultValue instanceof import_base_sql_expression.BaseSqlExpression ? `(${escaped})` : escaped}`;
    }
    if (attribute.unique === true) {
      template += " UNIQUE";
    }
    if (attribute.primaryKey) {
      template += " PRIMARY KEY";
    }
    if (attribute.comment) {
      template += ` COMMENT ${this.escape(attribute.comment)}`;
    }
    if (attribute.first) {
      template += " FIRST";
    }
    if (attribute.after) {
      template += ` AFTER ${this.quoteIdentifier(attribute.after)}`;
    }
    if ((!options || !options.withoutForeignKeyConstraints) && attribute.references) {
      if (options && options.context === "addColumn" && options.foreignKey) {
        const fkName = this.quoteIdentifier(
          `${this.extractTableDetails(options.tableName).tableName}_${options.foreignKey}_foreign_idx`
        );
        template += `, ADD CONSTRAINT ${fkName} FOREIGN KEY (${this.quoteIdentifier(options.foreignKey)})`;
      }
      template += ` REFERENCES ${this.quoteTable(attribute.references.table)}`;
      if (attribute.references.key) {
        template += ` (${this.quoteIdentifier(attribute.references.key)})`;
      } else {
        template += ` (${this.quoteIdentifier("id")})`;
      }
      if (attribute.onDelete) {
        template += ` ON DELETE ${attribute.onDelete.toUpperCase()}`;
      }
      if (attribute.onUpdate) {
        template += ` ON UPDATE ${attribute.onUpdate.toUpperCase()}`;
      }
    }
    return template;
  }
  attributesToSQL(attributes, options) {
    const result = {};
    for (const key in attributes) {
      const attribute = attributes[key];
      result[attribute.field || key] = this.attributeToSQL(attribute, options);
    }
    return result;
  }
  _getBeforeSelectAttributesFragment(options) {
    let fragment = "";
    const MINIMUM_EXECUTION_TIME_VALUE = 0;
    const MAXIMUM_EXECUTION_TIME_VALUE = 4294967295;
    if (options.maxExecutionTimeHintMs != null) {
      if (Number.isSafeInteger(options.maxExecutionTimeHintMs) && options.maxExecutionTimeHintMs >= MINIMUM_EXECUTION_TIME_VALUE && options.maxExecutionTimeHintMs <= MAXIMUM_EXECUTION_TIME_VALUE) {
        fragment += ` /*+ MAX_EXECUTION_TIME(${options.maxExecutionTimeHintMs}) */`;
      } else {
        throw new Error(
          `maxExecutionTimeMs must be between ${MINIMUM_EXECUTION_TIME_VALUE} and ${MAXIMUM_EXECUTION_TIME_VALUE}, but it is ${(0, import_utils.inspect)(options.maxExecutionTimeHintMs)}`
        );
      }
    }
    return fragment;
  }
}
//# sourceMappingURL=query-generator.js.map
