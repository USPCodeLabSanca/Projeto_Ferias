import type { ModelDefinition } from './model-definition.js';
import type { BulkDestroyOptions, DestroyManyOptions } from './model-repository.types.js';
import type { Model } from './model.js';
/**
 * The goal of this class is to become the new home of all the static methods that are currently present on the Model class,
 * as a way to enable a true Repository Mode for Sequelize.
 *
 * Currently, this class is not usable as a repository (due to having a dependency on ModelStatic), but as we migrate all of
 * Model to this class, we will be able to remove the dependency on ModelStatic, and make this class usable as a repository.
 *
 * See https://github.com/sequelize/sequelize/issues/15389 for more details.
 *
 * Unlike {@link ModelDefinition}, it's possible to have multiple different repositories for the same model (as users can provide their own implementation).
 */
export declare class ModelRepository<M extends Model = Model> {
    #private;
    constructor(modelDefinition: ModelDefinition<M>);
    _UNSTABLE_destroy(instanceOrInstances: readonly M[] | M, options?: DestroyManyOptions): Promise<number>;
    _UNSTABLE_bulkDestroy(options: BulkDestroyOptions<M>): Promise<number>;
}
export declare function getModelRepository(model: ModelDefinition): ModelRepository;
