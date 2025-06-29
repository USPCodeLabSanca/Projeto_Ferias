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
var query_generator_internal_exports = {};
__export(query_generator_internal_exports, {
  AbstractQueryGeneratorInternal: () => AbstractQueryGeneratorInternal
});
module.exports = __toCommonJS(query_generator_internal_exports);
var import_utils = require("@sequelize/utils");
var import_deferrable = require("../deferrable.js");
var import_base_sql_expression = require("../expression-builders/base-sql-expression.js");
var import_model_utils = require("../utils/model-utils.js");
var import_sql = require("../utils/sql.js");
var import_data_types_utils = require("./data-types-utils.js");
var import_where_sql_builder = require("./where-sql-builder.js");
class AbstractQueryGeneratorInternal {
  dialect;
  whereSqlBuilder;
  get sequelize() {
    return this.dialect.sequelize;
  }
  get queryGenerator() {
    return this.dialect.queryGenerator;
  }
  constructor(dialect) {
    this.dialect = dialect;
    this.whereSqlBuilder = new import_where_sql_builder.WhereSqlBuilder(dialect);
  }
  getTechnicalDatabaseNames() {
    return import_utils.EMPTY_ARRAY;
  }
  getTechnicalSchemaNames() {
    return import_utils.EMPTY_ARRAY;
  }
  getConstraintSnippet(tableName, options) {
    const quotedFields = options.fields.map((field) => {
      if (typeof field === "string") {
        return this.queryGenerator.quoteIdentifier(field);
      }
      if (field instanceof import_base_sql_expression.BaseSqlExpression) {
        return this.queryGenerator.formatSqlExpression(field);
      }
      if (field.attribute) {
        throw new Error(
          "The field.attribute property has been removed. Use the field.name property instead"
        );
      }
      if (!field.name) {
        throw new Error(`The following index field has no name: ${field}`);
      }
      return this.queryGenerator.quoteIdentifier(field.name);
    });
    const constraintNameParts = options.name ? null : options.fields.map((field) => {
      if (typeof field === "string") {
        return field;
      }
      if (field instanceof import_base_sql_expression.BaseSqlExpression) {
        throw new TypeError(
          `The constraint name must be provided explicitly if one of Sequelize's method (literal(), col(), etc\u2026) is used in the constraint's fields`
        );
      }
      return field.name;
    });
    let constraintSnippet;
    const table = this.queryGenerator.extractTableDetails(tableName);
    const fieldsSqlQuotedString = quotedFields.join(", ");
    const fieldsSqlString = constraintNameParts?.join("_");
    switch (options.type.toUpperCase()) {
      case "CHECK": {
        if (!this.dialect.supports.constraints.check) {
          throw new Error(`Check constraints are not supported by ${this.dialect.name} dialect`);
        }
        const constraintName = this.queryGenerator.quoteIdentifier(
          options.name || `${table.tableName}_${fieldsSqlString}_ck`
        );
        constraintSnippet = `CONSTRAINT ${constraintName} CHECK (${this.queryGenerator.whereItemsQuery(options.where)})`;
        break;
      }
      case "UNIQUE": {
        if (!this.dialect.supports.constraints.unique) {
          throw new Error(`Unique constraints are not supported by ${this.dialect.name} dialect`);
        }
        const constraintName = this.queryGenerator.quoteIdentifier(
          options.name || `${table.tableName}_${fieldsSqlString}_uk`
        );
        constraintSnippet = `CONSTRAINT ${constraintName} UNIQUE (${fieldsSqlQuotedString})`;
        if (options.deferrable) {
          constraintSnippet += ` ${this.getDeferrableConstraintSnippet(options.deferrable)}`;
        }
        break;
      }
      case "DEFAULT": {
        if (!this.dialect.supports.constraints.default) {
          throw new Error(`Default constraints are not supported by ${this.dialect.name} dialect`);
        }
        if (options.defaultValue === void 0) {
          throw new Error("Default value must be specified for DEFAULT CONSTRAINT");
        }
        const constraintName = this.queryGenerator.quoteIdentifier(
          options.name || `${table.tableName}_${fieldsSqlString}_df`
        );
        constraintSnippet = `CONSTRAINT ${constraintName} DEFAULT (${this.queryGenerator.escape(options.defaultValue, options)}) FOR ${quotedFields[0]}`;
        break;
      }
      case "PRIMARY KEY": {
        if (!this.dialect.supports.constraints.primaryKey) {
          throw new Error(
            `Primary key constraints are not supported by ${this.dialect.name} dialect`
          );
        }
        const constraintName = this.queryGenerator.quoteIdentifier(
          options.name || `${table.tableName}_${fieldsSqlString}_pk`
        );
        constraintSnippet = `CONSTRAINT ${constraintName} PRIMARY KEY (${fieldsSqlQuotedString})`;
        if (options.deferrable) {
          constraintSnippet += ` ${this.getDeferrableConstraintSnippet(options.deferrable)}`;
        }
        break;
      }
      case "FOREIGN KEY": {
        if (!this.dialect.supports.constraints.foreignKey) {
          throw new Error(
            `Foreign key constraints are not supported by ${this.dialect.name} dialect`
          );
        }
        const references = options.references;
        if (!references || !references.table || !(references.field || references.fields)) {
          throw new Error(
            "Invalid foreign key constraint options. `references` object with `table` and `field` must be specified"
          );
        }
        const referencedTable = this.queryGenerator.extractTableDetails(references.table);
        const constraintName = this.queryGenerator.quoteIdentifier(
          options.name || `${table.tableName}_${fieldsSqlString}_${referencedTable.tableName}_fk`
        );
        const quotedReferences = references.field !== void 0 ? this.queryGenerator.quoteIdentifier(references.field) : references.fields.map((f) => this.queryGenerator.quoteIdentifier(f)).join(", ");
        const referencesSnippet = `${this.queryGenerator.quoteTable(referencedTable)} (${quotedReferences})`;
        constraintSnippet = `CONSTRAINT ${constraintName} `;
        constraintSnippet += `FOREIGN KEY (${fieldsSqlQuotedString}) REFERENCES ${referencesSnippet}`;
        if (options.onUpdate) {
          if (!this.dialect.supports.constraints.onUpdate) {
            throw new Error(
              `Foreign key constraint with onUpdate is not supported by ${this.dialect.name} dialect`
            );
          }
          constraintSnippet += ` ON UPDATE ${options.onUpdate.toUpperCase()}`;
        }
        if (options.onDelete) {
          constraintSnippet += ` ON DELETE ${options.onDelete.toUpperCase()}`;
        }
        if (options.deferrable) {
          constraintSnippet += ` ${this.getDeferrableConstraintSnippet(options.deferrable)}`;
        }
        break;
      }
      default: {
        throw new Error(
          `Constraint type ${options.type} is not supported by ${this.dialect.name} dialect`
        );
      }
    }
    return constraintSnippet;
  }
  getDeferrableConstraintSnippet(deferrable) {
    if (!this.dialect.supports.constraints.deferrable) {
      throw new Error(`Deferrable constraints are not supported by ${this.dialect.name} dialect`);
    }
    switch (deferrable) {
      case import_deferrable.Deferrable.INITIALLY_DEFERRED: {
        return "DEFERRABLE INITIALLY DEFERRED";
      }
      case import_deferrable.Deferrable.INITIALLY_IMMEDIATE: {
        return "DEFERRABLE INITIALLY IMMEDIATE";
      }
      case import_deferrable.Deferrable.NOT: {
        return "NOT DEFERRABLE";
      }
      default: {
        throw new Error(`Unknown constraint checking behavior ${deferrable}`);
      }
    }
  }
  formatAssociationPath(associationPath) {
    return `${this.queryGenerator.quoteIdentifier(associationPath.associationPath.join("->"))}.${this.queryGenerator.quoteIdentifier(associationPath.attributeName)}`;
  }
  formatJsonPath(jsonPathVal, options) {
    const value = this.queryGenerator.escape(jsonPathVal.expression, options);
    if (jsonPathVal.path.length === 0) {
      return value;
    }
    return this.queryGenerator.jsonPathExtractionQuery(value, jsonPathVal.path, false);
  }
  formatLiteral(piece, options) {
    const sql = piece.val.map((part) => {
      if (part instanceof import_base_sql_expression.BaseSqlExpression) {
        return this.queryGenerator.formatSqlExpression(part, options);
      }
      return part;
    }).join("");
    if (options?.replacements) {
      return (0, import_sql.injectReplacements)(sql, this.dialect, options.replacements, {
        onPositionalReplacement: () => {
          throw new TypeError(`The following literal includes positional replacements (?).
Only named replacements (:name) are allowed in literal() because we cannot guarantee the order in which they will be evaluated:
\u279C literal(${JSON.stringify(sql)})`);
        }
      });
    }
    return sql;
  }
  formatAttribute(piece, options) {
    const modelDefinition = options?.model ? (0, import_model_utils.extractModelDefinition)(options.model) : null;
    const columnName = modelDefinition?.getColumnNameLoose(piece.attributeName) ?? piece.attributeName;
    if (options?.mainAlias) {
      return `${this.queryGenerator.quoteIdentifier(options.mainAlias)}.${this.queryGenerator.quoteIdentifier(columnName)}`;
    }
    return this.queryGenerator.quoteIdentifier(columnName);
  }
  formatFn(piece, options) {
    const argEscapeOptions = piece.args.length > 0 && options?.type ? { ...options, type: void 0 } : options;
    const args = piece.args.map((arg) => {
      return this.queryGenerator.escape(arg, argEscapeOptions);
    }).join(", ");
    return `${piece.fn}(${args})`;
  }
  formatDialectAwareFn(piece, options) {
    const argEscapeOptions = piece.args.length > 0 && options?.type ? { ...options, type: void 0 } : options;
    if (!piece.supportsDialect(this.dialect)) {
      throw new Error(
        `Function ${piece.constructor.name} is not supported by ${this.dialect.name}.`
      );
    }
    return piece.applyForDialect(this.dialect, argEscapeOptions);
  }
  formatCast(cast, options) {
    const type = this.sequelize.normalizeDataType(cast.type);
    const castSql = (0, import_where_sql_builder.wrapAmbiguousWhere)(
      cast.expression,
      this.queryGenerator.escape(cast.expression, { ...options, type })
    );
    const targetSql = (0, import_data_types_utils.attributeTypeToSql)(type).toUpperCase();
    return `CAST(${castSql} AS ${targetSql})`;
  }
  formatCol(piece, options) {
    if (piece.identifiers.length === 1 && piece.identifiers[0].startsWith("*")) {
      return "*";
    }
    const identifiers = piece.identifiers.length === 1 ? piece.identifiers[0] : piece.identifiers;
    return this.queryGenerator.quote(identifiers, options?.model, void 0, options);
  }
  /**
   * Returns an SQL fragment for adding result constraints.
   *
   * @param _options
   */
  addLimitAndOffset(_options) {
    throw new Error(`addLimitAndOffset has not been implemented in ${this.dialect.name}.`);
  }
}
//# sourceMappingURL=query-generator-internal.js.map
