/**
 * getComplexKeys
 *
 * @param obj
 * @returns All keys including operators
 * @private
 */
export declare function getComplexKeys(obj: object): Array<string | symbol>;
/**
 * getComplexSize
 *
 * @param obj
 * @returns Length of object properties including operators if obj is array returns its length
 * @private
 */
export declare function getComplexSize(obj: object | any[]): number;
/**
 * getOperators
 *
 * @param obj
 * @returns All operators properties of obj
 * @private
 */
export declare function getOperators(obj: object): symbol[];
