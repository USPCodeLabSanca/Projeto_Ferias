import type { TableOrModel } from '../abstract-dialect/query-generator.types.js';
import type { TableNameWithSchema } from '../abstract-dialect/query-interface.js';
import type { Model, ModelStatic } from '../model';
import { ModelDefinition } from '../model-definition.js';
/**
 * Returns true if the value is a model subclass.
 *
 * @param val The value whose type will be checked
 */
export declare function isModelStatic<M extends Model>(val: any): val is ModelStatic<M>;
/**
 * Returns true if a & b are the same initial model, ignoring variants created by {@link Model.withSchema}, {@link Model.withScope}, and the like.
 *
 * The difference with doing `a === b` is that this method will also
 * return true if one of the models is scoped, or a variant with a different schema.
 *
 * @example
 * isSameInitialModel(a, a.withScope('myScope')) // true;
 *
 * @param a
 * @param b
 */
export declare function isSameInitialModel(a: ModelStatic<any>, b: ModelStatic<any>): boolean;
export declare function extractModelDefinition(tableOrModel: TableOrModel): ModelDefinition | null;
export declare function extractTableIdentifier(tableOrModel: TableOrModel): TableNameWithSchema;
