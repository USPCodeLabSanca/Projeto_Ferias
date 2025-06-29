import type { Sequelize } from '@sequelize/core';
import { AbstractDialect } from '@sequelize/core';
import type { MySql2Module, MySqlConnectionOptions } from './connection-manager.js';
import { MySqlConnectionManager } from './connection-manager.js';
import { MySqlQueryGenerator } from './query-generator.js';
import { MySqlQueryInterface } from './query-interface.js';
import { MySqlQuery } from './query.js';
export interface MySqlDialectOptions {
    /**
     * The mysql2 library to use.
     * If not provided, the mysql2 npm library will be used.
     * Must be compatible with the mysql2 npm library API.
     *
     * Using this option should only be considered as a last resort,
     * as the Sequelize team cannot guarantee its compatibility.
     */
    mysql2Module?: MySql2Module;
    /**
     * Show warnings if there are any when executing a query
     */
    showWarnings?: boolean | undefined;
}
export declare class MySqlDialect extends AbstractDialect<MySqlDialectOptions, MySqlConnectionOptions> {
    static supports: import("@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/dialect.js").DialectSupports;
    readonly connectionManager: MySqlConnectionManager;
    readonly queryGenerator: MySqlQueryGenerator;
    readonly queryInterface: MySqlQueryInterface;
    readonly Query: typeof MySqlQuery;
    constructor(sequelize: Sequelize, options: MySqlDialectOptions);
    createBindCollector(): import("@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/dialect.js").BindCollector;
    escapeString(value: string): string;
    escapeJson(value: unknown): string;
    canBackslashEscape(): boolean;
    getDefaultSchema(): string;
    parseConnectionUrl(url: string): MySqlConnectionOptions;
    static getSupportedOptions(): readonly (keyof MySqlDialectOptions)[];
    static getSupportedConnectionOptions(): readonly (keyof MySqlConnectionOptions)[];
}
