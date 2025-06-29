import { BaseSqlExpression, SQL_IDENTIFIER } from './base-sql-expression.js';
export declare class AssociationPath extends BaseSqlExpression {
    readonly associationPath: readonly string[];
    readonly attributeName: string;
    protected readonly [SQL_IDENTIFIER]: 'associationPath';
    constructor(associationPath: readonly string[], attributeName: string);
}
