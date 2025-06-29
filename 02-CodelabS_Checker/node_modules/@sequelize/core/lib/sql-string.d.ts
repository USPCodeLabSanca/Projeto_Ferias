import type { AbstractDataType } from './abstract-dialect/data-types.js';
import type { AbstractDialect } from './abstract-dialect/dialect.js';
export declare function getTextDataTypeForDialect(dialect: AbstractDialect): AbstractDataType<any>;
export declare function bestGuessDataTypeOfVal(val: unknown, dialect: AbstractDialect): AbstractDataType<any>;
