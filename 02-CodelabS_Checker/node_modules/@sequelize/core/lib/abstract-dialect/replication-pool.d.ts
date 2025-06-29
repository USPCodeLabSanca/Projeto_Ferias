import { Pool } from 'sequelize-pool';
import type { Class } from 'type-fest';
export type ConnectionType = 'read' | 'write';
export interface ReplicationPoolOptions {
    /**
     * Maximum number of connections in pool. Default is 5
     */
    max: number;
    /**
     * Minimum number of connections in pool. Default is 0
     */
    min: number;
    /**
     * The maximum time, in milliseconds, that a connection can be idle before being released
     */
    idle: number;
    /**
     * The maximum time, in milliseconds, that pool will try to get connection before throwing error
     */
    acquire: number;
    /**
     * The time interval, in milliseconds, after which sequelize-pool will remove idle connections.
     */
    evict: number;
    /**
     * The number of times to use a connection before closing and replacing it.  Default is Infinity
     */
    maxUses: number;
}
export interface AcquireConnectionOptions {
    /**
     * Set which replica to use. Available options are `read` and `write`
     */
    type?: 'read' | 'write';
    /**
     * Force master or write replica to get connection from
     */
    useMaster?: boolean;
}
interface ReplicationPoolConfig<Connection extends object, ConnectionOptions extends object> {
    readConfig: readonly ConnectionOptions[] | null;
    writeConfig: ConnectionOptions;
    pool: ReplicationPoolOptions;
    timeoutErrorClass?: Class<Error>;
    connect(options: ConnectionOptions): Promise<Connection>;
    disconnect(connection: Connection): Promise<void>;
    validate(connection: Connection): boolean;
    beforeAcquire?(options: AcquireConnectionOptions): Promise<void>;
    afterAcquire?(connection: Connection, options: AcquireConnectionOptions): Promise<void>;
}
export declare class ReplicationPool<Connection extends object, ConnectionOptions extends object> {
    #private;
    /**
     * Replication read pool. Will only be used if the 'read' replication option has been provided,
     * otherwise the {@link write} will be used instead.
     */
    readonly read: Pool<Connection> | null;
    readonly write: Pool<Connection>;
    constructor(config: ReplicationPoolConfig<Connection, ConnectionOptions>);
    acquire(options?: AcquireConnectionOptions | undefined): Promise<Connection>;
    release(client: Connection): void;
    destroy(client: Connection): Promise<void>;
    destroyAllNow(): Promise<void>;
    drain(): Promise<void>;
    getPool(poolType: ConnectionType): Pool<Connection>;
    get size(): number;
    get available(): number;
    get using(): number;
    get waiting(): number;
}
export {};
