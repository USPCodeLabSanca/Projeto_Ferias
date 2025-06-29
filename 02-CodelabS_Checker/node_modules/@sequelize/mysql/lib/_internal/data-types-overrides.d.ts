import type { BindParamOptions, GeoJson } from '@sequelize/core';
import type { AcceptedDate } from '@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/data-types.js';
import * as BaseTypes from '@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/data-types.js';
export declare class FLOAT extends BaseTypes.FLOAT {
    protected getNumberSqlTypeName(): string;
    protected _supportsNativeUnsigned(): boolean;
}
export declare class DOUBLE extends BaseTypes.DOUBLE {
    protected getNumberSqlTypeName(): string;
    protected _supportsNativeUnsigned(): boolean;
}
/** @deprecated */
export declare class REAL extends BaseTypes.REAL {
    protected _supportsNativeUnsigned(): boolean;
}
export declare class DECIMAL extends BaseTypes.DECIMAL {
    protected _supportsNativeUnsigned(): boolean;
}
export declare class TINYINT extends BaseTypes.TINYINT {
    protected _supportsNativeUnsigned(): boolean;
}
export declare class SMALLINT extends BaseTypes.SMALLINT {
    protected _supportsNativeUnsigned(): boolean;
}
export declare class MEDIUMINT extends BaseTypes.MEDIUMINT {
    protected _supportsNativeUnsigned(): boolean;
}
export declare class INTEGER extends BaseTypes.INTEGER {
    protected _supportsNativeUnsigned(): boolean;
}
export declare class BIGINT extends BaseTypes.BIGINT {
    protected _supportsNativeUnsigned(): boolean;
}
export declare class BOOLEAN extends BaseTypes.BOOLEAN {
    toSql(): string;
    escape(value: boolean | unknown): string;
    toBindableValue(value: boolean | unknown): unknown;
}
export declare class DATE extends BaseTypes.DATE {
    toBindableValue(date: AcceptedDate): string;
    sanitize(value: unknown, options?: {
        timezone?: string;
    }): unknown;
}
export declare class JSON extends BaseTypes.JSON {
    escape(value: any): string;
    getBindParamSql(value: any, options: BindParamOptions): string;
}
export declare class UUID extends BaseTypes.UUID {
    toSql(): string;
}
export declare class GEOMETRY extends BaseTypes.GEOMETRY {
    toBindableValue(value: GeoJson): string;
    getBindParamSql(value: GeoJson, options: BindParamOptions): string;
    toSql(): string;
}
export declare class ENUM<Member extends string> extends BaseTypes.ENUM<Member> {
    toSql(): string;
}
