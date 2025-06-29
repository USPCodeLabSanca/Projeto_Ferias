import type { AbstractDialect, ConnectionOptions } from './dialect.js';
export interface GetConnectionOptions {
    /**
     * Set which replica to use. Available options are `read` and `write`
     */
    type: 'read' | 'write';
    /**
     * Force master or write replica to get connection from
     */
    useMaster?: boolean;
}
export interface AbstractConnection {
    /** The UUID of the transaction that is using this connection */
    uuid?: string | undefined;
}
declare const ConnectionType: unique symbol;
export type Connection<DialectOrConnectionManager extends AbstractDialect | AbstractConnectionManager> = DialectOrConnectionManager extends AbstractDialect ? Connection<DialectOrConnectionManager['connectionManager']> : DialectOrConnectionManager extends AbstractConnectionManager ? DialectOrConnectionManager[typeof ConnectionType] : never;
/**
 * Abstract Connection Manager
 *
 * Connection manager which handles pooling & replication.
 * Uses sequelize-pool for pooling
 *
 * @param connection
 */
export declare class AbstractConnectionManager<Dialect extends AbstractDialect = AbstractDialect, TConnection extends AbstractConnection = AbstractConnection> {
    [ConnectionType]: TConnection;
    protected readonly dialect: Dialect;
    constructor(dialect: Dialect);
    protected get sequelize(): import("../sequelize.js").Sequelize<Dialect>;
    get pool(): never;
    /**
     * Determine if a connection is still valid or not
     *
     * @param _connection
     */
    validate(_connection: TConnection): boolean;
    connect(_config: ConnectionOptions<Dialect>): Promise<TConnection>;
    disconnect(_connection: TConnection): Promise<void>;
}
export {};
