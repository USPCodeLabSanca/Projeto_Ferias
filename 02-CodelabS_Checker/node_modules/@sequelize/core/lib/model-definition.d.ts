import { MapView, SetView } from '@sequelize/utils';
import type { IndexOptions, TableNameWithSchema } from './abstract-dialect/query-interface.js';
import type { Association } from './associations/index.js';
import type { HookHandler } from './hooks.js';
import type { ModelHooks } from './model-hooks.js';
import type { AttributeOptions, BuiltModelOptions, InitOptions, Model, ModelAttributes, ModelOptions, ModelStatic, NormalizedAttributeOptions, NormalizedAttributeReferencesOptions } from './model.js';
import type { Sequelize } from './sequelize.js';
export interface TimestampAttributes {
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}
/**
 * The goal of this class is to store the definition of a model.
 *
 * It is part of the Repository Design Pattern.
 * See https://github.com/sequelize/sequelize/issues/15389 for more details.
 *
 * There is only one ModelDefinition instance per model per sequelize instance.
 */
export declare class ModelDefinition<M extends Model = Model> {
    #private;
    readonly options: BuiltModelOptions;
    get table(): TableNameWithSchema;
    readonly associations: {
        [associationName: string]: Association;
    };
    /**
     * The list of attributes that have *not* been normalized.
     * This list can be mutated. Call {@link refreshAttributes} to update the normalized attributes ({@link attributes)}.
     */
    readonly rawAttributes: {
        [attributeName: string]: AttributeOptions<M>;
    };
    /**
     * The list of attributes that have been normalized.
     *
     * This map is fully frozen and cannot be modified directly.
     * Modify {@link rawAttributes} then call {@link refreshAttributes} instead.
     */
    readonly attributes: MapView<string, NormalizedAttributeOptions<Model<any, any>>>;
    /**
     * The list of attributes that actually exist in the database, as opposed to {@link virtualAttributeNames}.
     */
    readonly physicalAttributes: MapView<string, NormalizedAttributeOptions<Model<any, any>>>;
    readonly columns: MapView<string, NormalizedAttributeOptions<Model<any, any>>>;
    readonly primaryKeysAttributeNames: SetView<string>;
    /**
     * List of attributes that cannot be modified by the user (read-only)
     */
    readonly readOnlyAttributeNames: SetView<string>;
    /**
     * Records which attributes are the different built-in timestamp attributes
     */
    readonly timestampAttributeNames: TimestampAttributes;
    get versionAttributeName(): string | undefined;
    readonly jsonAttributeNames: SetView<string>;
    /**
     * The list of attributes that do not really exist in the database.
     */
    readonly virtualAttributeNames: SetView<string>;
    readonly attributesWithGetters: SetView<string>;
    readonly attributesWithSetters: SetView<string>;
    /**
     * @deprecated Code should not rely on this as users can create custom attributes.
     */
    readonly booleanAttributeNames: SetView<string>;
    /**
     * @deprecated Code should not rely on this as users can create custom attributes.
     */
    readonly dateAttributeNames: SetView<string>;
    get autoIncrementAttributeName(): string | null;
    readonly defaultValues: MapView<string, () => unknown>;
    readonly model: ModelStatic<M>;
    get modelName(): string;
    get underscored(): boolean;
    get sequelize(): Sequelize;
    get hooks(): HookHandler<ModelHooks>;
    constructor(attributesOptions: ModelAttributes<M>, modelOptions: InitOptions<M>, model: ModelStatic<M>);
    /**
     * Normalizes all attribute definitions, using {@link rawAttributes} as the source.
     */
    refreshAttributes(): void;
    getIndexes(): readonly IndexOptions[];
    /**
     * Returns the column name corresponding to the given attribute name.
     *
     * @param attributeName
     */
    getColumnName(attributeName: string): string;
    /**
     * Returns the column name corresponding to the given attribute name if it exists, otherwise returns the attribute name.
     *
     * ⚠️ Using this method is highly discouraged. Users should specify column names & attribute names separately, to prevent any ambiguity.
     *
     * @param attributeName
     */
    getColumnNameLoose(attributeName: string): string;
    /**
     * Follows the association path and returns the association at the end of the path.
     * For instance, say we have a model User, associated to a model Profile, associated to a model Address.
     *
     * If we call `User.modelDefinition.getAssociation(['profile', 'address'])`, we will get the association named `address` in the model Profile.
     * If we call `User.modelDefinition.getAssociation(['profile'])`, we will get the association named `profile` in the model User.
     *
     * @param associationPath
     */
    getAssociation(associationPath: readonly string[] | string): Association | undefined;
    isParanoid(): boolean;
}
export declare function listenForModelDefinition(callback: (model: ModelStatic) => void): void;
export declare function registerModelDefinition<M extends Model>(model: ModelStatic<M>, modelDefinition: ModelDefinition<M>): void;
export declare function removeModelDefinition(model: ModelStatic): void;
export declare function hasModelDefinition(model: ModelStatic): boolean;
export declare function getModelDefinition(model: ModelStatic): ModelDefinition;
export declare function normalizeReference(references: AttributeOptions['references']): NormalizedAttributeReferencesOptions | undefined;
/**
 * This method mutates the first parameter.
 *
 * @param existingModelOptions
 * @param options
 * @param overrideOnConflict
 */
export declare function mergeModelOptions<M extends Model>(existingModelOptions: ModelOptions<M>, options: ModelOptions<M>, overrideOnConflict: boolean): ModelOptions<M>;
