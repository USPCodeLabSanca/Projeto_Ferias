/**
 * Can be used to make foreign key constraints deferrable.
 * This is only supported in PostgreSQL.
 *
 * The foreign keys can be configured like this. It will create a foreign key
 * that will check the constraints immediately when the data was inserted.
 *
 * ```js
 * class MyModel extends Model {}
 * MyModel.init({
 *   foreign_id: {
 *     type: DataTypes.INTEGER,
 *     references: {
 *       model: OtherModel,
 *       key: 'id',
 *       deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
 *     }
 *   }
 * }, { sequelize });
 * ```
 */
export declare enum Deferrable {
    INITIALLY_DEFERRED = "INITIALLY_DEFERRED",
    INITIALLY_IMMEDIATE = "INITIALLY_IMMEDIATE",
    NOT = "NOT"
}
/**
 * Can be used to set constraints deferrable within a transaction.
 * This is only supported in PostgreSQL.
 *
 * The constraints can be configured to be deferrable in a transaction like this.
 * It will trigger a query once the transaction has been started and set the constraints
 * to be checked at the very end of the transaction.
 *
 * ```js
 * sequelize.transaction({
 *   constraintChecking: Sequelize.ConstraintChecking.DEFERRED
 * });
 * ```
 */
export declare class ConstraintChecking {
    toString(): string;
    isEqual(_other: unknown): boolean;
    static toString(): string;
    get constraints(): readonly string[];
    /**
     * Will trigger an additional query at the beginning of a
     * transaction which sets the constraints to deferred.
     */
    static readonly DEFERRED: {
        new (constraints?: readonly string[]): {
            readonly "__#4@#constraints": readonly string[];
            isEqual(other: unknown): boolean;
            readonly constraints: readonly string[];
            toString(): string;
        };
        toString(): string;
        readonly DEFERRED: /*elided*/ any & ((constraints?: readonly string[] | undefined) => {
            readonly "__#4@#constraints": readonly string[];
            isEqual(other: unknown): boolean;
            readonly constraints: readonly string[];
            toString(): string;
        });
        /**
         * Will trigger an additional query at the beginning of a
         * transaction which sets the constraints to immediately.
         */
        readonly IMMEDIATE: {
            new (constraints?: readonly string[]): {
                readonly "__#5@#constraints": readonly string[];
                isEqual(other: unknown): boolean;
                readonly constraints: readonly string[];
                toString(): string;
            };
            toString(): string;
            /**
             * Will trigger an additional query at the beginning of a
             * transaction which sets the constraints to deferred.
             */
            readonly DEFERRED: /*elided*/ any & ((constraints?: readonly string[] | undefined) => {
                readonly "__#4@#constraints": readonly string[];
                isEqual(other: unknown): boolean;
                readonly constraints: readonly string[];
                toString(): string;
            });
            readonly IMMEDIATE: /*elided*/ any & ((constraints?: readonly string[] | undefined) => {
                readonly "__#5@#constraints": readonly string[];
                isEqual(other: unknown): boolean;
                readonly constraints: readonly string[];
                toString(): string;
            });
        } & ((constraints?: readonly string[] | undefined) => {
            readonly "__#5@#constraints": readonly string[];
            isEqual(other: unknown): boolean;
            readonly constraints: readonly string[];
            toString(): string;
        });
    } & ((constraints?: readonly string[] | undefined) => {
        readonly "__#4@#constraints": readonly string[];
        isEqual(other: unknown): boolean;
        readonly constraints: readonly string[];
        toString(): string;
    });
    /**
     * Will trigger an additional query at the beginning of a
     * transaction which sets the constraints to immediately.
     */
    static readonly IMMEDIATE: {
        new (constraints?: readonly string[]): {
            readonly "__#5@#constraints": readonly string[];
            isEqual(other: unknown): boolean;
            readonly constraints: readonly string[];
            toString(): string;
        };
        toString(): string;
        /**
         * Will trigger an additional query at the beginning of a
         * transaction which sets the constraints to deferred.
         */
        readonly DEFERRED: {
            new (constraints?: readonly string[]): {
                readonly "__#4@#constraints": readonly string[];
                isEqual(other: unknown): boolean;
                readonly constraints: readonly string[];
                toString(): string;
            };
            toString(): string;
            readonly DEFERRED: /*elided*/ any & ((constraints?: readonly string[] | undefined) => {
                readonly "__#4@#constraints": readonly string[];
                isEqual(other: unknown): boolean;
                readonly constraints: readonly string[];
                toString(): string;
            });
            /**
             * Will trigger an additional query at the beginning of a
             * transaction which sets the constraints to immediately.
             */
            readonly IMMEDIATE: /*elided*/ any & ((constraints?: readonly string[] | undefined) => {
                readonly "__#5@#constraints": readonly string[];
                isEqual(other: unknown): boolean;
                readonly constraints: readonly string[];
                toString(): string;
            });
        } & ((constraints?: readonly string[] | undefined) => {
            readonly "__#4@#constraints": readonly string[];
            isEqual(other: unknown): boolean;
            readonly constraints: readonly string[];
            toString(): string;
        });
        readonly IMMEDIATE: /*elided*/ any & ((constraints?: readonly string[] | undefined) => {
            readonly "__#5@#constraints": readonly string[];
            isEqual(other: unknown): boolean;
            readonly constraints: readonly string[];
            toString(): string;
        });
    } & ((constraints?: readonly string[] | undefined) => {
        readonly "__#5@#constraints": readonly string[];
        isEqual(other: unknown): boolean;
        readonly constraints: readonly string[];
        toString(): string;
    });
}
