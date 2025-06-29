import { SetView } from '@sequelize/utils';
import type { AbstractDialect } from './abstract-dialect/dialect.js';
import type { Model, ModelStatic } from './model';
import type { SequelizeTypeScript } from './sequelize-typescript.js';
export declare class ModelSetView<Dialect extends AbstractDialect> extends SetView<ModelStatic> {
    #private;
    constructor(sequelize: SequelizeTypeScript<Dialect>, set: Set<ModelStatic>);
    get<M extends Model = Model>(modelName: string): ModelStatic<M> | undefined;
    getOrThrow<M extends Model = Model>(modelName: string): ModelStatic<M>;
    /**
     * Returns the list of registered model names.
     */
    getNames(): Iterable<string>;
    hasByName(modelName: string): boolean;
    /**
     * Returns an array that lists every model, sorted in order
     * of foreign key references: The first model is a model that is depended upon,
     * the last model is a model that is not depended upon.
     *
     * If there is a cyclic dependency, this returns null.
     */
    getModelsTopoSortedByForeignKey(): ModelStatic[] | null;
    /**
     * Iterate over Models in an order suitable for e.g. creating tables.
     * Will take foreign key constraints into account so that dependencies are visited before dependents.
     *
     * @param iterator method to execute on each model
     * @param options
     * @param options.reverse
     * @private
     *
     * @deprecated
     */
    forEachModel(iterator: (model: ModelStatic) => void, options?: {
        reverse?: boolean;
    }): void;
}
