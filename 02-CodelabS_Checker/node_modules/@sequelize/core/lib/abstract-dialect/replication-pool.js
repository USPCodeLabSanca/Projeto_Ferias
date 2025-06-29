"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var replication_pool_exports = {};
__export(replication_pool_exports, {
  ReplicationPool: () => ReplicationPool
});
module.exports = __toCommonJS(replication_pool_exports);
var import_utils = require("@sequelize/utils");
var import_sequelize_pool = require("sequelize-pool");
var import_logger = require("../utils/logger.js");
const debug = import_logger.logger.debugContext("pool");
const owningPools = /* @__PURE__ */ new WeakMap();
class ReplicationPool {
  /**
   * Replication read pool. Will only be used if the 'read' replication option has been provided,
   * otherwise the {@link write} will be used instead.
   */
  read;
  write;
  #timeoutErrorClass;
  #beforeAcquire;
  #afterAcquire;
  constructor(config) {
    const {
      connect,
      disconnect,
      validate,
      beforeAcquire,
      afterAcquire,
      timeoutErrorClass,
      readConfig,
      writeConfig
    } = config;
    this.#beforeAcquire = beforeAcquire;
    this.#afterAcquire = afterAcquire;
    this.#timeoutErrorClass = timeoutErrorClass;
    if (!readConfig || readConfig.length === 0) {
      this.read = null;
    } else {
      let reads = 0;
      this.read = new import_sequelize_pool.Pool({
        name: "sequelize:read",
        create: async () => {
          const nextRead = reads++ % readConfig.length;
          const connection = await connect(readConfig[nextRead]);
          owningPools.set(connection, "read");
          return connection;
        },
        destroy: disconnect,
        validate,
        max: config.pool.max,
        min: config.pool.min,
        acquireTimeoutMillis: config.pool.acquire,
        idleTimeoutMillis: config.pool.idle,
        reapIntervalMillis: config.pool.evict,
        maxUses: config.pool.maxUses
      });
    }
    this.write = new import_sequelize_pool.Pool({
      name: "sequelize:write",
      create: async () => {
        const connection = await connect(writeConfig);
        owningPools.set(connection, "write");
        return connection;
      },
      destroy: disconnect,
      validate,
      max: config.pool.max,
      min: config.pool.min,
      acquireTimeoutMillis: config.pool.acquire,
      idleTimeoutMillis: config.pool.idle,
      reapIntervalMillis: config.pool.evict,
      maxUses: config.pool.maxUses
    });
    if (!this.read) {
      debug(`pool created with max/min: ${config.pool.max}/${config.pool.min}, no replication`);
    } else {
      debug(`pool created with max/min: ${config.pool.max}/${config.pool.min}, with replication`);
    }
  }
  async acquire(options) {
    options = options ? (0, import_utils.shallowClonePojo)(options) : (0, import_utils.pojo)();
    await this.#beforeAcquire?.(options);
    Object.freeze(options);
    const { useMaster = false, type = "write" } = options;
    if (type !== "read" && type !== "write") {
      throw new Error(`Expected queryType to be either read or write. Received ${type}`);
    }
    const pool = this.read != null && type === "read" && !useMaster ? this.read : this.write;
    let connection;
    try {
      connection = await pool.acquire();
    } catch (error) {
      if (this.#timeoutErrorClass && error instanceof import_sequelize_pool.TimeoutError) {
        throw new this.#timeoutErrorClass(error.message, { cause: error });
      }
      throw error;
    }
    await this.#afterAcquire?.(connection, options);
    return connection;
  }
  release(client) {
    const connectionType = owningPools.get(client);
    if (!connectionType) {
      throw new Error("Unable to determine to which pool the connection belongs");
    }
    this.getPool(connectionType).release(client);
  }
  async destroy(client) {
    const connectionType = owningPools.get(client);
    if (!connectionType) {
      throw new Error("Unable to determine to which pool the connection belongs");
    }
    await this.getPool(connectionType).destroy(client);
    debug("connection destroy");
  }
  async destroyAllNow() {
    await Promise.all([this.read?.destroyAllNow(), this.write.destroyAllNow()]);
    debug("all connections destroyed");
  }
  async drain() {
    await Promise.all([this.write.drain(), this.read?.drain()]);
  }
  getPool(poolType) {
    if (poolType === "read" && this.read != null) {
      return this.read;
    }
    return this.write;
  }
  get size() {
    return (this.read?.size ?? 0) + this.write.size;
  }
  get available() {
    return (this.read?.available ?? 0) + this.write.available;
  }
  get using() {
    return (this.read?.using ?? 0) + this.write.using;
  }
  get waiting() {
    return (this.read?.waiting ?? 0) + this.write.waiting;
  }
}
//# sourceMappingURL=replication-pool.js.map
