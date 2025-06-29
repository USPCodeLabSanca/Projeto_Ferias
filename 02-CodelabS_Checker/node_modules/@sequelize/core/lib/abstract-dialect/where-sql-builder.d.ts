import type { AbstractDialect, Expression, WhereOptions } from '../index.js';
import { Op } from '../operators';
import type { NormalizedDataType } from './data-types.js';
import type { FormatWhereOptions } from './query-generator-typescript.js';
import type { WhereAttributeHashValue } from './where-sql-builder-types.js';
export declare class PojoWhere {
    leftOperand: Expression;
    whereValue: WhereAttributeHashValue<any>;
    static create(leftOperand: Expression, whereAttributeHashValue: WhereAttributeHashValue<any>): PojoWhere;
}
export declare class WhereSqlBuilder {
    #private;
    constructor(dialect: AbstractDialect);
    setOperatorKeyword(op: symbol, keyword: string): void;
    /**
     * Transforms any value accepted by {@link WhereOptions} into a SQL string.
     *
     * @param where
     * @param options
     */
    formatWhereOptions(where: WhereOptions, options?: FormatWhereOptions): string;
    /**
     * This method is responsible for transforming a group "left operand" + "operators, right operands" (multiple) into a SQL string.
     *
     * @param pojoWhere The representation of the group.
     * @param options Option bag.
     */
    formatPojoWhere(pojoWhere: PojoWhere, options?: FormatWhereOptions): string;
    protected [Op.notIn](...args: Parameters<WhereSqlBuilder[typeof Op.in]>): string;
    protected [Op.in](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.isNot](...args: Parameters<WhereSqlBuilder[typeof Op.is]>): string;
    protected [Op.is](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.notBetween](...args: Parameters<WhereSqlBuilder[typeof Op.between]>): string;
    protected [Op.between](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.contains](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.contained](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.startsWith](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.notStartsWith](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.endsWith](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.notEndsWith](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.substring](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected [Op.notSubstring](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected formatSubstring(left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions, start: boolean, end: boolean): string;
    [Op.anyKeyExists](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    [Op.allKeysExist](left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
    protected formatBinaryOperation(left: Expression, leftDataType: NormalizedDataType | undefined, operator: symbol, right: Expression, rightDataType: NormalizedDataType | undefined, options: FormatWhereOptions): string;
}
export declare function joinWithLogicalOperator(sqlArray: string[], operator: typeof Op.and | typeof Op.or): string;
export declare function wrapAmbiguousWhere(operand: Expression, sql: string): string;
