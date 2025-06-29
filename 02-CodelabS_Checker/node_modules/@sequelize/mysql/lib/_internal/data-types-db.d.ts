import type { MySqlDialect } from '../dialect.js';
/**
 * First pass of DB value parsing: Parses based on the MySQL Type ID.
 * If a Sequelize DataType is specified, the value is then passed to {@link DataTypes.ABSTRACT#parseDatabaseValue}.
 *
 * @param dialect
 */
export declare function registerMySqlDbDataTypeParsers(dialect: MySqlDialect): void;
