import type { StrictRequiredBy } from '@sequelize/utils';
import type { Class } from 'type-fest';
import type { AbstractConnection, ConstraintChecking, Logging, Sequelize } from './index.js';
type TransactionCallback = (transaction: Transaction) => void | Promise<void>;
/**
 * This an option for {@link QueryRawOptions} which indicates if the query completes the transaction
 *
 * @private do not expose outside sequelize
 */
export declare const COMPLETES_TRANSACTION: unique symbol;
/**
 * The transaction object is used to identify a running transaction.
 * It is created by calling `Sequelize.transaction()`.
 * To run a query under a transaction, you should pass the transaction in the options object.
 *
 * @class Transaction
 * @see {Sequelize.transaction}
 */
export declare class Transaction {
    #private;
    sequelize: Sequelize;
    readonly options: Readonly<NormalizedTransactionOptions>;
    readonly parent: Transaction | null;
    readonly id: string;
    /**
     * Creates a new transaction instance
     *
     * @param sequelize A configured sequelize Instance
     * @param options The transaction options.
     */
    constructor(sequelize: Sequelize, options: TransactionOptions);
    get finished(): 'commit' | 'rollback' | undefined;
    getConnection(): AbstractConnection;
    getConnectionIfExists(): AbstractConnection | undefined;
    /**
     * Commit the transaction.
     */
    commit(): Promise<void>;
    /**
     * Rollback (abort) the transaction
     */
    rollback(): Promise<void>;
    /**
     * Called to acquire a connection to use and set the correct options on the connection.
     * We should ensure all the environment that's set up is cleaned up in `cleanup()` below.
     */
    prepareEnvironment(): Promise<void>;
    /**
     * Changes the isolation level of the transaction.
     *
     * @param isolationLevel
     */
    setIsolationLevel(isolationLevel: IsolationLevel): Promise<void>;
    /**
     * Adds a hook that is run after a transaction is committed.
     *
     * @param callback A callback function that is called with the transaction
     */
    afterCommit(callback: TransactionCallback): this;
    /**
     * Adds a hook that is run after a transaction is rolled back.
     *
     * @param callback A callback function that is called with the transaction
     */
    afterRollback(callback: TransactionCallback): this;
    /**
     * Adds a hook that is run after a transaction completes, no matter if it was committed or rolled back.
     *
     * @param callback A callback function that is called with the transaction
     */
    afterTransaction(callback: TransactionCallback): this;
    /**
     * Types can be set per-transaction by passing `options.type` to `sequelize.transaction`.
     * Default to `DEFERRED` but you can override the default type by passing `options.transactionType` in `new Sequelize`.
     * Sqlite only.
     *
     * Pass in the desired level as the first argument:
     *
     * @example
     * try {
     *   await sequelize.transaction({ type: Sequelize.Transaction.TYPES.EXCLUSIVE }, transaction => {
     *      // your transactions
     *   });
     *   // transaction has been committed. Do something after the commit if required.
     * } catch(err) {
     *   // do something with the err.
     * }
     *
     * @property DEFERRED
     * @property IMMEDIATE
     * @property EXCLUSIVE
     *
     * @deprecated use the {@link TransactionType} export
     */
    static get TYPES(): typeof TransactionType;
    /**
     * Isolation levels can be set per-transaction by passing `options.isolationLevel` to `sequelize.transaction`.
     * Sequelize uses the default isolation level of the database, you can override this by passing `options.isolationLevel` in Sequelize constructor options.
     *
     * Pass in the desired level as the first argument:
     *
     * @example
     * try {
     *   const result = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, transaction => {
     *     // your transactions
     *   });
     *   // transaction has been committed. Do something after the commit if required.
     * } catch(err) {
     *   // do something with the err.
     * }
     *
     * @property READ_UNCOMMITTED
     * @property READ_COMMITTED
     * @property REPEATABLE_READ
     * @property SERIALIZABLE
     *
     * @deprecated use the {@link IsolationLevel} export
     */
    static get ISOLATION_LEVELS(): typeof IsolationLevel;
    /**
     * Possible options for row locking. Used in conjunction with `find` calls:
     *
     * @example
     * // t1 is a transaction
     * Model.findAll({
     *   where: ...,
     *   transaction: t1,
     *   lock: t1.LOCK...
     * });
     *
     * @example Postgres also supports specific locks while eager loading by using OF:
     * ```ts
     * UserModel.findAll({
     *   where: ...,
     *   include: [TaskModel, ...],
     *   transaction: t1,
     *   lock: {
     *     level: t1.LOCK...,
     *     of: UserModel
     *   }
     * });
     * ```
     *
     * UserModel will be locked but TaskModel won't!
     *
     * @example You can also skip locked rows:
     * ```ts
     * // t1 is a transaction
     * Model.findAll({
     *   where: ...,
     *   transaction: t1,
     *   lock: true,
     *   skipLocked: true
     * });
     * ```
     *
     * The query will now return any rows that aren't locked by another transaction
     *
     * @returns possible options for row locking
     * @property UPDATE
     * @property SHARE
     * @property KEY_SHARE Postgres 9.3+ only
     * @property NO_KEY_UPDATE Postgres 9.3+ only
     *
     * @deprecated use the {@link Lock} export
     */
    static get LOCK(): typeof Lock;
    /**
     * Same as {@link Transaction.LOCK}, but can also be called on instances of
     * transactions to get possible options for row locking directly from the
     * instance.
     *
     * @deprecated use the {@link Lock} export
     */
    get LOCK(): typeof Lock;
    /**
     * Get the root transaction if nested, or self if this is a root transaction
     */
    get rootTransaction(): Transaction;
}
/**
 * Isolations levels can be set per-transaction by passing `options.isolationLevel` to `sequelize.transaction`.
 * Default to `REPEATABLE_READ` but you can override the default isolation level by passing `options.isolationLevel` in `new Sequelize`.
 *
 * The possible isolations levels to use when starting a transaction:
 *
 * ```js
 * {
 *   READ_UNCOMMITTED: "READ UNCOMMITTED",
 *   READ_COMMITTED: "READ COMMITTED",
 *   REPEATABLE_READ: "REPEATABLE READ",
 *   SERIALIZABLE: "SERIALIZABLE"
 * }
 * ```
 *
 * Pass in the desired level as the first argument:
 *
 * ```js
 * try {
 *   await sequelize.transaction({isolationLevel: Sequelize.Transaction.SERIALIZABLE}, transaction => {
 *      // your transactions
 *   });
 *   // transaction has been committed. Do something after the commit if required.
 * } catch(err) {
 *   // do something with the err.
 * }
 * ```
 */
export declare enum IsolationLevel {
    READ_UNCOMMITTED = "READ UNCOMMITTED",
    READ_COMMITTED = "READ COMMITTED",
    REPEATABLE_READ = "REPEATABLE READ",
    SERIALIZABLE = "SERIALIZABLE"
}
export declare enum TransactionType {
    DEFERRED = "DEFERRED",
    IMMEDIATE = "IMMEDIATE",
    EXCLUSIVE = "EXCLUSIVE"
}
/**
 * Possible options for row locking. Used in conjunction with `find` calls:
 *
 * Usage:
 * ```js
 * import { LOCK } from '@sequelize/core';
 *
 * Model.findAll({
 *   transaction,
 *   lock: LOCK.UPDATE,
 * });
 * ```
 *
 * Postgres also supports specific locks while eager loading by using OF:
 * ```js
 * import { LOCK } from '@sequelize/core';
 *
 * UserModel.findAll({
 *   transaction,
 *   lock: {
 *     level: LOCK.KEY_SHARE,
 *     of: UserModel,
 *   },
 * });
 * ```
 * UserModel will be locked but other models won't be!
 *
 * [Read more on transaction locks here](https://sequelize.org/docs/v7/querying/transactions/#locks)
 */
export declare enum Lock {
    UPDATE = "UPDATE",
    SHARE = "SHARE",
    /**
     * Postgres 9.3+ only
     */
    KEY_SHARE = "KEY SHARE",
    /**
     * Postgres 9.3+ only
     */
    NO_KEY_UPDATE = "NO KEY UPDATE"
}
export declare enum TransactionNestMode {
    /**
     * In this mode, nesting a transaction block in another will reuse the parent transaction
     * if its options are compatible (or throw an error otherwise).
     *
     * This is the default mode.
     */
    reuse = "reuse",
    /**
     * In this mode, nesting a transaction block will cause the creation of a SAVEPOINT
     * on the current transaction if the options provided to the nested transaction block are compatible with the parent one.
     */
    savepoint = "savepoint",
    /**
     * In this mode, nesting a transaction block will always create a new transaction, in a separate connection.
     * This mode is equivalent to setting the "transaction" option to "null" in the nested transaction block.
     *
     * Be very careful when using this mode, as it can easily lead to transaction deadlocks if used improperly.
     */
    separate = "separate"
}
/**
 * Options provided when the transaction is created
 */
export interface TransactionOptions extends Logging {
    /**
     * Whether this transaction will only be used to read data.
     * Used to determine whether sequelize is allowed to use a read replication server.
     */
    readOnly?: boolean | undefined;
    /**
     * Sets the isolation level of the transaction.
     */
    isolationLevel?: IsolationLevel | null | undefined;
    /**
     * Sets the type of the transaction. Sqlite only
     */
    type?: TransactionType | undefined;
    /**
     * Sets the constraints to be deferred or immediately checked. PostgreSQL only
     */
    constraintChecking?: ConstraintChecking | Class<ConstraintChecking> | undefined;
    /**
     * Parent transaction.
     * Will be retrieved from CLS automatically if not provided or if null.
     */
    transaction?: Transaction | null | undefined;
}
export type NormalizedTransactionOptions = StrictRequiredBy<Omit<TransactionOptions, 'constraintChecking' | 'type'>, 'isolationLevel' | 'readOnly'> & {
    constraintChecking?: ConstraintChecking | undefined;
    transactionType?: TransactionType | undefined;
};
/**
 * Options accepted by {@link Sequelize#transaction}.
 */
export interface ManagedTransactionOptions extends TransactionOptions {
    /**
     * How the transaction block should behave if a parent transaction block exists.
     */
    nestMode?: TransactionNestMode;
}
export declare function normalizeTransactionOptions(sequelize: Sequelize, options?: TransactionOptions): NormalizedTransactionOptions;
export declare function assertTransactionIsCompatibleWithOptions(transaction: Transaction, options: NormalizedTransactionOptions): void;
export {};
