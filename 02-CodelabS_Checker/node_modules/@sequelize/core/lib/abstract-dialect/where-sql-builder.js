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
var where_sql_builder_exports = {};
__export(where_sql_builder_exports, {
  PojoWhere: () => PojoWhere,
  WhereSqlBuilder: () => WhereSqlBuilder,
  joinWithLogicalOperator: () => joinWithLogicalOperator,
  wrapAmbiguousWhere: () => wrapAmbiguousWhere
});
module.exports = __toCommonJS(where_sql_builder_exports);
var import_utils = require("@sequelize/utils");
var import_node_util = __toESM(require("node:util"));
var import_base_error = require("../errors/base-error.js");
var import_association_path = require("../expression-builders/association-path.js");
var import_attribute = require("../expression-builders/attribute.js");
var import_base_sql_expression = require("../expression-builders/base-sql-expression.js");
var import_cast = require("../expression-builders/cast.js");
var import_col = require("../expression-builders/col.js");
var import_json_path = require("../expression-builders/json-path.js");
var import_json_sql_null = require("../expression-builders/json-sql-null.js");
var import_literal = require("../expression-builders/literal.js");
var import_value = require("../expression-builders/value.js");
var import_where = require("../expression-builders/where.js");
var import_operators = require("../operators");
var import_attribute_syntax = require("../utils/attribute-syntax.js");
var import_deprecations = require("../utils/deprecations.js");
var import_model_utils = require("../utils/model-utils.js");
var import_where2 = require("../utils/where.js");
var DataTypes = __toESM(require("./data-types.js"));
class PojoWhere {
  static create(leftOperand, whereAttributeHashValue) {
    const pojoWhere = new PojoWhere();
    pojoWhere.leftOperand = leftOperand;
    pojoWhere.whereValue = whereAttributeHashValue;
    return pojoWhere;
  }
}
class ObjectPool {
  #freeItems;
  #factory;
  #lastOccupiedIndex;
  constructor(factory, initialSize) {
    this.#freeItems = Array.from({ length: initialSize }).map(factory);
    this.#lastOccupiedIndex = initialSize - 1;
    this.#factory = factory;
  }
  getObject() {
    if (this.#lastOccupiedIndex < 0) {
      return this.#factory();
    }
    return this.#freeItems[this.#lastOccupiedIndex--];
  }
  free(val) {
    if (this.#lastOccupiedIndex >= this.#freeItems.length - 1) {
      this.#freeItems.push(val);
      return;
    }
    this.#freeItems[++this.#lastOccupiedIndex] = val;
  }
}
const pojoWherePool = new ObjectPool(() => new PojoWhere(), 20);
class WhereSqlBuilder {
  #dialect;
  #operatorMap = {
    [import_operators.Op.eq]: "=",
    [import_operators.Op.ne]: "!=",
    [import_operators.Op.gte]: ">=",
    [import_operators.Op.gt]: ">",
    [import_operators.Op.lte]: "<=",
    [import_operators.Op.lt]: "<",
    [import_operators.Op.is]: "IS",
    [import_operators.Op.isNot]: "IS NOT",
    [import_operators.Op.in]: "IN",
    [import_operators.Op.notIn]: "NOT IN",
    [import_operators.Op.like]: "LIKE",
    [import_operators.Op.notLike]: "NOT LIKE",
    [import_operators.Op.iLike]: "ILIKE",
    [import_operators.Op.notILike]: "NOT ILIKE",
    [import_operators.Op.regexp]: "~",
    [import_operators.Op.notRegexp]: "!~",
    [import_operators.Op.iRegexp]: "~*",
    [import_operators.Op.notIRegexp]: "!~*",
    [import_operators.Op.between]: "BETWEEN",
    [import_operators.Op.notBetween]: "NOT BETWEEN",
    [import_operators.Op.overlap]: "&&",
    [import_operators.Op.contains]: "@>",
    [import_operators.Op.contained]: "<@",
    [import_operators.Op.adjacent]: "-|-",
    [import_operators.Op.strictLeft]: "<<",
    [import_operators.Op.strictRight]: ">>",
    [import_operators.Op.noExtendRight]: "&<",
    [import_operators.Op.noExtendLeft]: "&>",
    [import_operators.Op.any]: "ANY",
    [import_operators.Op.all]: "ALL",
    [import_operators.Op.match]: "@@",
    [import_operators.Op.anyKeyExists]: "?|",
    [import_operators.Op.allKeysExist]: "?&"
  };
  #jsonType;
  #arrayOfTextType;
  constructor(dialect) {
    this.#dialect = dialect;
    this.#jsonType = dialect.supports.dataTypes.JSON ? new DataTypes.JSON().toDialectDataType(dialect) : void 0;
    this.#arrayOfTextType = dialect.supports.dataTypes.ARRAY ? new DataTypes.ARRAY(new DataTypes.TEXT()).toDialectDataType(dialect) : void 0;
  }
  get #queryGenerator() {
    return this.#dialect.queryGenerator;
  }
  setOperatorKeyword(op, keyword) {
    this.#operatorMap[op] = keyword;
  }
  /**
   * Transforms any value accepted by {@link WhereOptions} into a SQL string.
   *
   * @param where
   * @param options
   */
  formatWhereOptions(where, options = import_utils.EMPTY_OBJECT) {
    if (typeof where === "string") {
      throw new TypeError(
        "Support for `{ where: 'raw query' }` has been removed. Use `{ where: literal('raw query') }` instead"
      );
    }
    if (where === void 0) {
      return "";
    }
    try {
      return this.#handleRecursiveNotOrAndWithImplicitAndArray(
        where,
        (piece) => {
          if (piece instanceof import_base_sql_expression.BaseSqlExpression) {
            return this.#queryGenerator.formatSqlExpression(piece, options);
          }
          return this.formatPojoWhere(piece, options);
        }
      );
    } catch (error) {
      throw new import_base_error.BaseError(
        `Invalid value received for the "where" option. Refer to the sequelize documentation to learn which values the "where" option accepts.
Value: ${import_node_util.default.inspect(where)}`,
        {
          cause: error
        }
      );
    }
  }
  /**
   * This is the recursive "and", "or" and "not" handler of the first level of {@link WhereOptions} (the level *before* encountering an attribute name).
   * Unlike handleRecursiveNotOrAndNestedPathRecursive, this method accepts arrays at the top level, which are implicitly converted to "and" groups.
   * and does not handle nested JSON paths.
   *
   * @param input
   * @param handlePart
   * @param logicalOperator AND / OR
   */
  #handleRecursiveNotOrAndWithImplicitAndArray(input, handlePart, logicalOperator = import_operators.Op.and) {
    if (Array.isArray(input)) {
      return joinWithLogicalOperator(
        input.map((part) => {
          if (part === void 0) {
            return "";
          }
          return this.#handleRecursiveNotOrAndWithImplicitAndArray(part, handlePart);
        }),
        logicalOperator
      );
    }
    if (!(0, import_utils.isPlainObject)(input)) {
      if (!(input instanceof import_base_sql_expression.BaseSqlExpression)) {
        throw new TypeError(
          `Invalid Query: expected a plain object, an array or a sequelize SQL method but got ${import_node_util.default.inspect(input)} `
        );
      }
      return handlePart(input);
    }
    const keys = (0, import_where2.getComplexKeys)(input);
    const sqlArray = keys.map((operatorOrAttribute) => {
      if (operatorOrAttribute === import_operators.Op.not) {
        const generatedResult = this.#handleRecursiveNotOrAndWithImplicitAndArray(
          // @ts-expect-error -- This is a recursive type, which TS does not handle well
          input[import_operators.Op.not],
          handlePart
        );
        return wrapWithNot(generatedResult);
      }
      if (operatorOrAttribute === import_operators.Op.and || operatorOrAttribute === import_operators.Op.or) {
        return this.#handleRecursiveNotOrAndWithImplicitAndArray(
          // @ts-expect-error -- This is a recursive type, which TS does not handle well
          input[operatorOrAttribute],
          handlePart,
          operatorOrAttribute
        );
      }
      if (typeof operatorOrAttribute === "symbol") {
        throw new TypeError(
          `Invalid Query: ${import_node_util.default.inspect(input)} includes the Symbol Operator Op.${operatorOrAttribute.description} but only attributes, Op.and, Op.or, and Op.not are allowed.`
        );
      }
      let pojoWhereObject;
      try {
        pojoWhereObject = pojoWherePool.getObject();
        pojoWhereObject.leftOperand = (0, import_attribute_syntax.parseAttributeSyntax)(operatorOrAttribute);
        pojoWhereObject.whereValue = input[operatorOrAttribute];
        return handlePart(pojoWhereObject);
      } finally {
        if (pojoWhereObject) {
          pojoWherePool.free(pojoWhereObject);
        }
      }
    });
    return joinWithLogicalOperator(sqlArray, logicalOperator);
  }
  /**
   * This method is responsible for transforming a group "left operand" + "operators, right operands" (multiple) into a SQL string.
   *
   * @param pojoWhere The representation of the group.
   * @param options Option bag.
   */
  formatPojoWhere(pojoWhere, options = import_utils.EMPTY_OBJECT) {
    const modelDefinition = options?.model ? (0, import_model_utils.extractModelDefinition)(options.model) : null;
    let leftDataType = this.#getOperandType(pojoWhere.leftOperand, modelDefinition);
    const operandIsJsonColumn = leftDataType == null || leftDataType instanceof DataTypes.JSON;
    return this.#handleRecursiveNotOrAndNestedPathRecursive(
      pojoWhere.leftOperand,
      pojoWhere.whereValue,
      operandIsJsonColumn,
      (left, operator, right) => {
        if (leftDataType == null && left instanceof import_json_path.JsonPath) {
          leftDataType = this.#jsonType;
        } else if (left !== pojoWhere.leftOperand) {
          leftDataType = this.#getOperandType(left, modelDefinition);
        }
        if (operator === import_operators.Op.col) {
          (0, import_deprecations.noOpCol)();
          right = new import_col.Col(right);
          operator = import_operators.Op.eq;
        }
        if (operator === import_operators.Op.any || operator === import_operators.Op.all) {
          right = { [operator]: right };
          operator = import_operators.Op.eq;
        }
        if (operator == null) {
          if (right === null && leftDataType instanceof DataTypes.JSON) {
            throw new Error(
              `When comparing against a JSON column, the JavaScript null value can be represented using either the JSON 'null', or the SQL NULL. You must be explicit about which one you mean by using Op.is or SQL_NULL for the SQL NULL; or Op.eq or JSON_NULL for the JSON 'null'. Learn more at https://sequelize.org/docs/v7/querying/json/`
            );
          }
          operator = Array.isArray(right) && !(leftDataType instanceof DataTypes.ARRAY) ? import_operators.Op.in : right === null || right === import_json_sql_null.SQL_NULL ? import_operators.Op.is : import_operators.Op.eq;
        }
        if (right === null && !(leftDataType instanceof DataTypes.JSON)) {
          if (operator === import_operators.Op.eq) {
            operator = import_operators.Op.is;
          }
          if (operator === import_operators.Op.ne) {
            operator = import_operators.Op.isNot;
          }
        }
        const rightDataType = this.#getOperandType(right, modelDefinition);
        if (operator in this) {
          return this[operator](left, leftDataType, operator, right, rightDataType, options);
        }
        return this.formatBinaryOperation(
          left,
          leftDataType,
          operator,
          right,
          rightDataType,
          options
        );
      }
    );
  }
  [import_operators.Op.notIn](...args) {
    return this[import_operators.Op.in](...args);
  }
  [import_operators.Op.in](left, leftDataType, operator, right, rightDataType, options) {
    const rightEscapeOptions = { ...options, type: rightDataType ?? leftDataType };
    const leftEscapeOptions = { ...options, type: leftDataType ?? rightDataType };
    let rightSql;
    if (right instanceof import_literal.Literal) {
      rightSql = this.#queryGenerator.escape(right, rightEscapeOptions);
    } else if (Array.isArray(right)) {
      if (right.length === 0) {
        if (operator === import_operators.Op.notIn) {
          return "";
        }
        rightSql = "(NULL)";
      } else {
        rightSql = this.#queryGenerator.escapeList(right, rightEscapeOptions);
      }
    } else {
      throw new TypeError(
        "Operators Op.in and Op.notIn must be called with an array of values, or a literal"
      );
    }
    const leftSql = this.#queryGenerator.escape(left, leftEscapeOptions);
    return `${leftSql} ${this.#operatorMap[operator]} ${rightSql}`;
  }
  [import_operators.Op.isNot](...args) {
    return this[import_operators.Op.is](...args);
  }
  [import_operators.Op.is](left, leftDataType, operator, right, rightDataType, options) {
    if (right !== null && typeof right !== "boolean" && !(right instanceof import_literal.Literal)) {
      throw new Error(
        "Operators Op.is and Op.isNot can only be used with null, true, false or a literal."
      );
    }
    if (options.bindParam) {
      options = {
        ...options,
        bindParam: void 0
      };
    }
    return this.formatBinaryOperation(left, void 0, operator, right, void 0, options);
  }
  [import_operators.Op.notBetween](...args) {
    return this[import_operators.Op.between](...args);
  }
  [import_operators.Op.between](left, leftDataType, operator, right, rightDataType, options) {
    const rightEscapeOptions = { ...options, type: rightDataType ?? leftDataType };
    const leftEscapeOptions = { ...options, type: leftDataType ?? rightDataType };
    const leftSql = this.#queryGenerator.escape(left, leftEscapeOptions);
    let rightSql;
    if (right instanceof import_base_sql_expression.BaseSqlExpression) {
      rightSql = this.#queryGenerator.escape(right, rightEscapeOptions);
    } else if (Array.isArray(right) && right.length === 2) {
      rightSql = `${this.#queryGenerator.escape(right[0], rightEscapeOptions)} AND ${this.#queryGenerator.escape(right[1], rightEscapeOptions)}`;
    } else {
      throw new Error(
        "Operators Op.between and Op.notBetween must be used with an array of two values, or a literal."
      );
    }
    return `${leftSql} ${this.#operatorMap[operator]} ${rightSql}`;
  }
  [import_operators.Op.contains](left, leftDataType, operator, right, rightDataType, options) {
    if (!rightDataType && leftDataType instanceof DataTypes.RANGE && !Array.isArray(right)) {
      return this.formatBinaryOperation(
        left,
        leftDataType,
        operator,
        right,
        leftDataType.options.subtype,
        options
      );
    }
    return this.formatBinaryOperation(left, leftDataType, operator, right, rightDataType, options);
  }
  [import_operators.Op.contained](left, leftDataType, operator, right, rightDataType, options) {
    if (leftDataType instanceof DataTypes.AbstractDataType && !(leftDataType instanceof DataTypes.RANGE) && !(leftDataType instanceof DataTypes.ARRAY) && Array.isArray(right)) {
      return this.formatBinaryOperation(
        left,
        leftDataType,
        operator,
        right,
        new DataTypes.RANGE(leftDataType).toDialectDataType(this.#dialect),
        options
      );
    }
    return this.formatBinaryOperation(left, leftDataType, operator, right, rightDataType, options);
  }
  [import_operators.Op.startsWith](left, leftDataType, operator, right, rightDataType, options) {
    return this.formatSubstring(
      left,
      leftDataType,
      import_operators.Op.like,
      right,
      rightDataType,
      options,
      false,
      true
    );
  }
  [import_operators.Op.notStartsWith](left, leftDataType, operator, right, rightDataType, options) {
    return this.formatSubstring(
      left,
      leftDataType,
      import_operators.Op.notLike,
      right,
      rightDataType,
      options,
      false,
      true
    );
  }
  [import_operators.Op.endsWith](left, leftDataType, operator, right, rightDataType, options) {
    return this.formatSubstring(
      left,
      leftDataType,
      import_operators.Op.like,
      right,
      rightDataType,
      options,
      true,
      false
    );
  }
  [import_operators.Op.notEndsWith](left, leftDataType, operator, right, rightDataType, options) {
    return this.formatSubstring(
      left,
      leftDataType,
      import_operators.Op.notLike,
      right,
      rightDataType,
      options,
      true,
      false
    );
  }
  [import_operators.Op.substring](left, leftDataType, operator, right, rightDataType, options) {
    return this.formatSubstring(
      left,
      leftDataType,
      import_operators.Op.like,
      right,
      rightDataType,
      options,
      true,
      true
    );
  }
  [import_operators.Op.notSubstring](left, leftDataType, operator, right, rightDataType, options) {
    return this.formatSubstring(
      left,
      leftDataType,
      import_operators.Op.notLike,
      right,
      rightDataType,
      options,
      true,
      true
    );
  }
  formatSubstring(left, leftDataType, operator, right, rightDataType, options, start, end) {
    if (typeof right === "string") {
      const startToken = start ? "%" : "";
      const endToken = end ? "%" : "";
      return this.formatBinaryOperation(
        left,
        leftDataType,
        operator,
        startToken + right + endToken,
        rightDataType,
        options
      );
    }
    const escapedPercent = this.#dialect.escapeString("%");
    const literalBuilder = [`CONCAT(`];
    if (start) {
      literalBuilder.push(escapedPercent, ", ");
    }
    literalBuilder.push(new import_value.Value(right));
    if (end) {
      literalBuilder.push(", ", escapedPercent);
    }
    literalBuilder.push(")");
    return this.formatBinaryOperation(
      left,
      leftDataType,
      operator,
      new import_literal.Literal(literalBuilder),
      rightDataType,
      options
    );
  }
  [import_operators.Op.anyKeyExists](left, leftDataType, operator, right, rightDataType, options) {
    if (!this.#arrayOfTextType) {
      throw new Error("This dialect does not support Op.anyKeyExists");
    }
    return this.formatBinaryOperation(
      left,
      leftDataType,
      operator,
      right,
      this.#arrayOfTextType,
      options
    );
  }
  [import_operators.Op.allKeysExist](left, leftDataType, operator, right, rightDataType, options) {
    if (!this.#arrayOfTextType) {
      throw new Error("This dialect does not support Op.allKeysExist");
    }
    return this.formatBinaryOperation(
      left,
      leftDataType,
      operator,
      right,
      this.#arrayOfTextType,
      options
    );
  }
  formatBinaryOperation(left, leftDataType, operator, right, rightDataType, options) {
    const operatorSql = this.#operatorMap[operator];
    if (!operatorSql) {
      throw new TypeError(
        `Operator Op.${operator.description} does not exist or is not supported by this dialect.`
      );
    }
    const leftSql = this.#queryGenerator.escape(left, {
      ...options,
      type: leftDataType ?? rightDataType
    });
    const rightSql = this.#formatOpAnyAll(right, rightDataType ?? leftDataType) || this.#queryGenerator.escape(right, { ...options, type: rightDataType ?? leftDataType });
    return `${wrapAmbiguousWhere(left, leftSql)} ${this.#operatorMap[operator]} ${wrapAmbiguousWhere(right, rightSql)}`;
  }
  #formatOpAnyAll(value, type) {
    if (!(0, import_utils.isPlainObject)(value)) {
      return "";
    }
    if (import_operators.Op.any in value) {
      return `ANY (${this.#formatOpValues(value[import_operators.Op.any], type)})`;
    }
    if (import_operators.Op.all in value) {
      return `ALL (${this.#formatOpValues(value[import_operators.Op.all], type)})`;
    }
    return "";
  }
  #formatOpValues(value, type) {
    if ((0, import_utils.isPlainObject)(value) && import_operators.Op.values in value) {
      const options = { type };
      const operand = Array.isArray(value[import_operators.Op.values]) ? value[import_operators.Op.values] : [value[import_operators.Op.values]];
      const valueSql = operand.map((v) => `(${this.#queryGenerator.escape(v, options)})`).join(", ");
      return `VALUES ${valueSql}`;
    }
    return this.#queryGenerator.escape(value, { type: type && new DataTypes.ARRAY(type) });
  }
  /**
   * This is the recursive "and", "or" and "not" handler of {@link WhereAttributeHashValue} (the level *after* encountering an attribute name).
   * Unlike handleRecursiveNotOrAndWithImplicitAndArray, arrays at the top level have an implicit "IN" operator, instead of an implicit "AND" operator,
   * and this method handles nested JSON paths.
   *
   * @param leftOperand
   * @param whereValue
   * @param allowJsonPath
   * @param handlePart
   * @param operator
   * @param parentJsonPath
   */
  #handleRecursiveNotOrAndNestedPathRecursive(leftOperand, whereValue, allowJsonPath, handlePart, operator = import_operators.Op.and, parentJsonPath = import_utils.EMPTY_ARRAY) {
    if (!(0, import_utils.isPlainObject)(whereValue)) {
      return handlePart(
        this.#wrapSimpleJsonPath(leftOperand, parentJsonPath),
        void 0,
        whereValue
      );
    }
    const stringKeys = Object.keys(whereValue);
    if (!allowJsonPath && stringKeys.length > 0) {
      return handlePart(
        this.#wrapSimpleJsonPath(leftOperand, parentJsonPath),
        void 0,
        whereValue
      );
    }
    const keys = [...stringKeys, ...(0, import_where2.getOperators)(whereValue)];
    const parts = keys.map((key) => {
      const value = whereValue[key];
      if (typeof key === "string") {
        const parsedKey = (0, import_attribute_syntax.parseNestedJsonKeySyntax)(key);
        if (parsedKey.castsAndModifiers.length === 0) {
          return this.#handleRecursiveNotOrAndNestedPathRecursive(
            leftOperand,
            value,
            allowJsonPath,
            handlePart,
            operator,
            [...parentJsonPath, ...parsedKey.pathSegments]
          );
        }
        const newOperand = this.#wrapComplexJsonPath(leftOperand, parentJsonPath, parsedKey);
        return this.#handleRecursiveNotOrAndNestedPathRecursive(
          newOperand,
          value,
          // TODO: allow JSON if last cast is JSON?
          //  needs a mechanism to get JS DataType from SQL DataType first. To get last cast:
          //  newOperand instanceof Cast && isString(newOperand.type) && newOperand.type.toLowerCase();
          false,
          handlePart,
          operator,
          // reset json path
          import_utils.EMPTY_ARRAY
        );
      }
      if (key === import_operators.Op.not) {
        return wrapWithNot(
          this.#handleRecursiveNotOrAndNestedPathRecursive(
            leftOperand,
            value,
            allowJsonPath,
            handlePart,
            import_operators.Op.and
          )
        );
      }
      if (key === import_operators.Op.and || key === import_operators.Op.or) {
        if (Array.isArray(value)) {
          const sqlParts = value.map(
            (v) => this.#handleRecursiveNotOrAndNestedPathRecursive(
              leftOperand,
              v,
              allowJsonPath,
              handlePart,
              import_operators.Op.and
            )
          );
          return joinWithLogicalOperator(sqlParts, key);
        }
        return this.#handleRecursiveNotOrAndNestedPathRecursive(
          leftOperand,
          value,
          allowJsonPath,
          handlePart,
          key
        );
      }
      return handlePart(this.#wrapSimpleJsonPath(leftOperand, parentJsonPath), key, value);
    });
    return joinWithLogicalOperator(parts, operator);
  }
  #wrapSimpleJsonPath(operand, pathSegments) {
    if (pathSegments.length === 0) {
      return operand;
    }
    if (operand instanceof import_json_path.JsonPath) {
      return new import_json_path.JsonPath(operand.expression, [...operand.path, ...pathSegments]);
    }
    return new import_json_path.JsonPath(operand, pathSegments);
  }
  #wrapComplexJsonPath(operand, parentJsonPath, parsedPath) {
    const finalPathSegments = parentJsonPath.length > 0 ? [...parentJsonPath, ...parsedPath.pathSegments] : parsedPath.pathSegments;
    operand = this.#wrapSimpleJsonPath(operand, finalPathSegments);
    for (const castOrModifier of parsedPath.castsAndModifiers) {
      if ((0, import_utils.isString)(castOrModifier)) {
        operand = new import_cast.Cast(operand, castOrModifier);
      } else {
        operand = new castOrModifier(operand);
      }
    }
    return operand;
  }
  #getOperandType(operand, modelDefinition) {
    if (operand instanceof import_cast.Cast) {
      return this.#dialect.sequelize.normalizeDataType(operand.type);
    }
    if (operand instanceof import_json_path.JsonPath) {
      return this.#jsonType;
    }
    if (!modelDefinition) {
      return void 0;
    }
    if (operand instanceof import_association_path.AssociationPath) {
      const association = modelDefinition.getAssociation(operand.associationPath);
      if (!association) {
        return void 0;
      }
      return this.#getOperandType(operand.attributeName, association.target.modelDefinition);
    }
    if (operand instanceof import_attribute.Attribute) {
      return modelDefinition.attributes.get(operand.attributeName)?.type;
    }
    return void 0;
  }
}
function joinWithLogicalOperator(sqlArray, operator) {
  const operatorSql = operator === import_operators.Op.and ? " AND " : " OR ";
  sqlArray = sqlArray.filter((val) => Boolean(val));
  if (sqlArray.length === 0) {
    return "";
  }
  if (sqlArray.length === 1) {
    return sqlArray[0];
  }
  return sqlArray.map((sql) => {
    if (/ AND | OR /i.test(sql)) {
      return `(${sql})`;
    }
    return sql;
  }).join(operatorSql);
}
function wrapWithNot(sql) {
  if (!sql) {
    return "";
  }
  return `NOT (${sql})`;
}
function wrapAmbiguousWhere(operand, sql) {
  if (operand instanceof import_where.Where && sql.includes(" ")) {
    return `(${sql})`;
  }
  return sql;
}
//# sourceMappingURL=where-sql-builder.js.map
