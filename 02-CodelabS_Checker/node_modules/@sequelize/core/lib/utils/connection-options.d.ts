import type { PickByType } from '@sequelize/utils';
import type { StringKeyOf } from 'type-fest';
import type { AbstractDialect } from '../abstract-dialect/dialect.js';
import type { NormalizedReplicationOptions, RawConnectionOptions } from '../sequelize';
import type { PersistedSequelizeOptions } from '../sequelize.internals.js';
export declare function normalizeReplicationConfig<Dialect extends AbstractDialect>(dialect: Dialect, connectionOptions: RawConnectionOptions<Dialect>, replicationOption: PersistedSequelizeOptions<Dialect>['replication']): NormalizedReplicationOptions<Dialect>;
export declare function parseCommonConnectionUrlOptions<TConnectionOptions extends object>(options: {
    url: URL | string;
    /**
     * The list of protocols that the URL can use
     */
    allowedProtocols: readonly string[];
    /**
     * The name of the dialect-specific connection option to use for the hostname
     */
    hostname: keyof PickByType<TConnectionOptions, string>;
    /**
     * The name of the dialect-specific connection option to use for the port
     */
    port: keyof PickByType<TConnectionOptions, number>;
    /**
     * The name of the dialect-specific connection option to use for the database name
     */
    pathname: keyof PickByType<TConnectionOptions, string>;
    /**
     * The name of the dialect-specific connection option to use for the username
     *
     * If not provided, the username will be ignored
     */
    username?: keyof PickByType<TConnectionOptions, string>;
    /**
     * The name of the dialect-specific connection option to use for the password
     *
     * If not provided, the password will be ignored
     */
    password?: keyof PickByType<TConnectionOptions, string>;
    /**
     * The string options that can be set via the search parameters in the URL
     */
    stringSearchParams?: ReadonlyArray<StringKeyOf<PickByType<TConnectionOptions, string>>>;
    /**
     * The boolean options that can be set via the search parameters in the URL.
     * Will be parsed as a boolean.
     */
    booleanSearchParams?: ReadonlyArray<StringKeyOf<PickByType<TConnectionOptions, boolean>>>;
    /**
     * The number options that can be set via the search parameters in the URL.
     * Will be parsed as a JS number.
     */
    numberSearchParams?: ReadonlyArray<StringKeyOf<PickByType<TConnectionOptions, number>>>;
}): TConnectionOptions;
