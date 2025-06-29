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
var transaction_exports = {};
__export(transaction_exports, {
  COMPLETES_TRANSACTION: () => COMPLETES_TRANSACTION,
  IsolationLevel: () => IsolationLevel,
  Lock: () => Lock,
  Transaction: () => Transaction,
  TransactionNestMode: () => TransactionNestMode,
  TransactionType: () => TransactionType,
  assertTransactionIsCompatibleWithOptions: () => assertTransactionIsCompatibleWithOptions,
  normalizeTransactionOptions: () => normalizeTransactionOptions
});
module.exports = __toCommonJS(transaction_exports);
var import_utils = require("@sequelize/utils");
var import_node_assert = __toESM(require("node:assert"));
const COMPLETES_TRANSACTION = Symbol("completesTransaction");
class Transaction {
  sequelize;
  #afterCommitHooks = /* @__PURE__ */ new Set();
  #afterRollbackHooks = /* @__PURE__ */ new Set();
  #afterHooks = /* @__PURE__ */ new Set();
  #name;
  #savepoints = /* @__PURE__ */ new Map();
  options;
  parent;
  id;
  #finished;
  #connection;
  /**
   * Creates a new transaction instance
   *
   * @param sequelize A configured sequelize Instance
   * @param options The transaction options.
   */
  constructor(sequelize, options) {
    this.sequelize = sequelize;
    const generateTransactionId = this.sequelize.dialect.queryGenerator.generateTransactionId;
    const normalizedOptions = normalizeTransactionOptions(this.sequelize, options);
    this.parent = normalizedOptions.transaction ?? null;
    delete normalizedOptions.transaction;
    this.options = Object.freeze(normalizedOptions);
    if (this.parent) {
      this.id = this.parent.id;
      this.#name = `${this.id}-sp-${this.parent.#savepoints.size}`;
      this.parent.#savepoints.set(this.#name, this);
    } else {
      const id = generateTransactionId();
      this.id = id;
      this.#name = id;
    }
  }
  get finished() {
    return this.#finished;
  }
  getConnection() {
    if (!this.#connection) {
      throw new Error("This transaction is not bound to a connection.");
    }
    return this.#connection;
  }
  getConnectionIfExists() {
    return this.#connection;
  }
  /**
   * Commit the transaction.
   */
  async commit() {
    if (this.#finished) {
      throw new Error(
        `Transaction cannot be committed because it has been finished with state: ${this.#finished}`
      );
    }
    this.#finished = "commit";
    if (this.parent) {
      return;
    }
    try {
      await this.sequelize.queryInterface._commitTransaction(this, this.options);
      await this.#dispatchHooks(this.#afterCommitHooks);
      await this.#dispatchHooks(this.#afterHooks);
      this.#cleanup();
    } catch (error) {
      console.warn(
        `Committing transaction ${this.id} failed with error ${error instanceof Error ? JSON.stringify(error.message) : String(error)}. We are killing its connection as it is now in an undetermined state.`
      );
      await this.#forceCleanup();
      throw error;
    } finally {
      this.#finished = "commit";
    }
  }
  /**
   * Rollback (abort) the transaction
   */
  async rollback() {
    if (this.#finished) {
      throw new Error(
        `Transaction cannot be rolled back because it has been finished with state: ${this.finished}`
      );
    }
    if (!this.#connection) {
      throw new Error("Transaction cannot be rolled back because it never started");
    }
    this.#finished = "rollback";
    try {
      if (this.parent) {
        await this.sequelize.queryInterface._rollbackSavepoint(this.parent, {
          ...this.options,
          savepointName: this.#name
        });
      } else {
        await this.sequelize.queryInterface._rollbackTransaction(this, this.options);
      }
      await this.#dispatchHooks(this.#afterRollbackHooks);
      await this.#dispatchHooks(this.#afterHooks);
      this.#cleanup();
    } catch (error) {
      console.warn(
        `Rolling back transaction ${this.id} failed with error ${error instanceof Error ? JSON.stringify(error.message) : String(error)}. We are killing its connection as it is now in an undetermined state.`
      );
      await this.#forceCleanup();
      throw error;
    }
  }
  async #dispatchHooks(hooks) {
    for (const hook of hooks) {
      await Reflect.apply(hook, this, [this]);
    }
  }
  /**
   * Called to acquire a connection to use and set the correct options on the connection.
   * We should ensure all the environment that's set up is cleaned up in `cleanup()` below.
   */
  async prepareEnvironment() {
    let connection;
    if (this.parent) {
      connection = this.parent.#connection;
    } else {
      connection = await this.sequelize.pool.acquire({
        type: this.options.readOnly ? "read" : "write"
      });
    }
    (0, import_node_assert.default)(connection != null, "Transaction failed to acquire Connection.");
    connection.uuid = this.id;
    this.#connection = connection;
    try {
      await this.#begin();
      await this.#setDeferrable();
    } catch (error) {
      try {
        await this.rollback();
      } finally {
        throw error;
      }
    }
  }
  async #setDeferrable() {
    if (this.options.constraintChecking) {
      await this.sequelize.queryInterface.deferConstraints(this.options.constraintChecking, {
        transaction: this
      });
    }
  }
  /**
   * Changes the isolation level of the transaction.
   *
   * @param isolationLevel
   */
  async setIsolationLevel(isolationLevel) {
    await this.sequelize.queryInterface._setIsolationLevel(this, {
      ...this.options,
      isolationLevel
    });
  }
  /**
   * Begins a transaction
   */
  async #begin() {
    const queryInterface = this.sequelize.queryInterface;
    if (this.parent) {
      return queryInterface._createSavepoint(this.parent, {
        ...this.options,
        savepointName: this.#name
      });
    }
    await queryInterface._startTransaction(this, {
      ...this.options,
      readOnly: this.sequelize.dialect.supports.startTransaction.readOnly ? this.options.readOnly : false,
      transactionName: this.#name
    });
  }
  #cleanup() {
    if (this.parent || this.#connection?.uuid === void 0) {
      return;
    }
    this.sequelize.pool.release(this.#connection);
    this.#connection.uuid = void 0;
    this.#connection = void 0;
  }
  /**
   * Kills the connection this transaction uses.
   * Used as a last resort, for instance because COMMIT or ROLLBACK resulted in an error
   * and the transaction is left in a broken state,
   * and releasing the connection to the pool would be dangerous.
   */
  async #forceCleanup() {
    if (this.parent || this.#connection?.uuid === void 0) {
      return;
    }
    this.#connection.uuid = void 0;
    const connection = this.#connection;
    this.#connection = void 0;
    await this.sequelize.pool.destroy(connection);
  }
  /**
   * Adds a hook that is run after a transaction is committed.
   *
   * @param callback A callback function that is called with the transaction
   */
  afterCommit(callback) {
    if (typeof callback !== "function") {
      throw new TypeError('"callback" must be a function');
    }
    this.#afterCommitHooks.add(callback);
    return this;
  }
  /**
   * Adds a hook that is run after a transaction is rolled back.
   *
   * @param callback A callback function that is called with the transaction
   */
  afterRollback(callback) {
    if (typeof callback !== "function") {
      throw new TypeError('"callback" must be a function');
    }
    this.#afterRollbackHooks.add(callback);
    return this;
  }
  /**
   * Adds a hook that is run after a transaction completes, no matter if it was committed or rolled back.
   *
   * @param callback A callback function that is called with the transaction
   */
  afterTransaction(callback) {
    if (typeof callback !== "function") {
      throw new TypeError('"callback" must be a function');
    }
    this.#afterHooks.add(callback);
    return this;
  }
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
  static get TYPES() {
    return TransactionType;
  }
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
  static get ISOLATION_LEVELS() {
    return IsolationLevel;
  }
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
  static get LOCK() {
    return Lock;
  }
  /**
   * Same as {@link Transaction.LOCK}, but can also be called on instances of
   * transactions to get possible options for row locking directly from the
   * instance.
   *
   * @deprecated use the {@link Lock} export
   */
  get LOCK() {
    return Lock;
  }
  /**
   * Get the root transaction if nested, or self if this is a root transaction
   */
  get rootTransaction() {
    if (this.parent !== null) {
      return this.parent.rootTransaction;
    }
    return this;
  }
}
var IsolationLevel = /* @__PURE__ */ ((IsolationLevel2) => {
  IsolationLevel2["READ_UNCOMMITTED"] = "READ UNCOMMITTED";
  IsolationLevel2["READ_COMMITTED"] = "READ COMMITTED";
  IsolationLevel2["REPEATABLE_READ"] = "REPEATABLE READ";
  IsolationLevel2["SERIALIZABLE"] = "SERIALIZABLE";
  return IsolationLevel2;
})(IsolationLevel || {});
var TransactionType = /* @__PURE__ */ ((TransactionType2) => {
  TransactionType2["DEFERRED"] = "DEFERRED";
  TransactionType2["IMMEDIATE"] = "IMMEDIATE";
  TransactionType2["EXCLUSIVE"] = "EXCLUSIVE";
  return TransactionType2;
})(TransactionType || {});
var Lock = /* @__PURE__ */ ((Lock2) => {
  Lock2["UPDATE"] = "UPDATE";
  Lock2["SHARE"] = "SHARE";
  Lock2["KEY_SHARE"] = "KEY SHARE";
  Lock2["NO_KEY_UPDATE"] = "NO KEY UPDATE";
  return Lock2;
})(Lock || {});
var TransactionNestMode = /* @__PURE__ */ ((TransactionNestMode2) => {
  TransactionNestMode2["reuse"] = "reuse";
  TransactionNestMode2["savepoint"] = "savepoint";
  TransactionNestMode2["separate"] = "separate";
  return TransactionNestMode2;
})(TransactionNestMode || {});
function normalizeTransactionOptions(sequelize, options = import_utils.EMPTY_OBJECT) {
  assertSupportedTransactionOptions(sequelize, options);
  return {
    ...options,
    transactionType: options.type ?? (sequelize.dialect.supports.startTransaction.transactionType ? sequelize.options.transactionType : void 0),
    isolationLevel: options.isolationLevel === void 0 ? sequelize.options.isolationLevel ?? null : options.isolationLevel,
    readOnly: options.readOnly ?? false,
    constraintChecking: typeof options.constraintChecking === "function" ? new options.constraintChecking() : options.constraintChecking
  };
}
function assertTransactionIsCompatibleWithOptions(transaction, options) {
  if (options.isolationLevel !== transaction.options.isolationLevel) {
    throw new Error(
      `Requested isolation level (${options.isolationLevel ?? "unspecified"}) is not compatible with the one of the existing transaction (${transaction.options.isolationLevel ?? "unspecified"})`
    );
  }
  if (options.readOnly !== transaction.options.readOnly) {
    throw new Error(
      `Requested a transaction in ${options.readOnly ? "read-only" : "read/write"} mode, which is not compatible with the existing ${transaction.options.readOnly ? "read-only" : "read/write"} transaction`
    );
  }
  if (options.transactionType !== transaction.options.transactionType) {
    throw new Error(
      `Requested transaction type (${options.transactionType}) is not compatible with the one of the existing transaction (${transaction.options.transactionType})`
    );
  }
  if (options.constraintChecking !== transaction.options.constraintChecking && !options.constraintChecking?.isEqual(transaction.options.constraintChecking)) {
    throw new Error(
      `Requested transaction constraintChecking (${options.constraintChecking ?? "none"}) is not compatible with the one of the existing transaction (${transaction.options.constraintChecking ?? "none"})`
    );
  }
}
function assertSupportedTransactionOptions(sequelize, options) {
  if (("type" in options && options.type || "transactionType" in options && options.transactionType) && !sequelize.dialect.supports.startTransaction.transactionType) {
    throw new Error(`The ${sequelize.dialect.name} dialect does not support transaction types.`);
  }
}
//# sourceMappingURL=transaction.js.map
