import type { AbstractConnection, ConnectionOptions } from '@sequelize/core';
import { AbstractConnectionManager } from '@sequelize/core';
import * as MySql2 from 'mysql2';
import type { MySqlDialect } from './dialect.js';
export type MySql2Module = typeof MySql2;
export interface MySqlConnection extends MySql2.Connection, AbstractConnection {
}
export interface MySqlConnectionOptions extends Omit<MySql2.ConnectionOptions, 'timezone' | 'nestTables' | 'namedPlaceholders' | 'pool' | 'typeCast' | 'bigNumberStrings' | 'supportBigNumbers' | 'dateStrings' | 'decimalNumbers' | 'rowsAsArray' | 'stringifyObjects' | 'queryFormat' | 'Promise' | 'uri'> {
}
/**
 * MySQL Connection Manager
 *
 * Get connections, validate and disconnect them.
 * AbstractConnectionManager pooling use it to handle MySQL specific connections
 * Use https://github.com/sidorares/node-mysql2 to connect with MySQL server
 */
export declare class MySqlConnectionManager extends AbstractConnectionManager<MySqlDialect, MySqlConnection> {
    #private;
    constructor(dialect: MySqlDialect);
    /**
     * Connect with MySQL database based on config, Handle any errors in connection
     * Set the pool handlers on connection.error
     * Also set proper timezone once connection is connected.
     *
     * @param config
     */
    connect(config: ConnectionOptions<MySqlDialect>): Promise<MySqlConnection>;
    disconnect(connection: MySqlConnection): Promise<void>;
    validate(connection: MySqlConnection): boolean;
}
