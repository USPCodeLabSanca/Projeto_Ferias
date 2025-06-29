import { AbstractQueryGeneratorInternal } from '@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/query-generator-internal.js';
import type { AddLimitOffsetOptions } from '@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/query-generator.internal-types.js';
import type { MySqlDialect } from './dialect.js';
export declare class MySqlQueryGeneratorInternal<Dialect extends MySqlDialect = MySqlDialect> extends AbstractQueryGeneratorInternal<Dialect> {
    getTechnicalSchemaNames(): readonly string[];
    addLimitAndOffset(options: AddLimitOffsetOptions): string;
}
