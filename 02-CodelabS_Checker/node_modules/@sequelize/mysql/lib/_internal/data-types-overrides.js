"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var data_types_overrides_exports = {};
__export(data_types_overrides_exports, {
  BIGINT: () => BIGINT,
  BOOLEAN: () => BOOLEAN,
  DATE: () => DATE,
  DECIMAL: () => DECIMAL,
  DOUBLE: () => DOUBLE,
  ENUM: () => ENUM,
  FLOAT: () => FLOAT,
  GEOMETRY: () => GEOMETRY,
  INTEGER: () => INTEGER,
  JSON: () => JSON,
  MEDIUMINT: () => MEDIUMINT,
  REAL: () => REAL,
  SMALLINT: () => SMALLINT,
  TINYINT: () => TINYINT,
  UUID: () => UUID
});
module.exports = __toCommonJS(data_types_overrides_exports);
var BaseTypes = __toESM(require("@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/data-types.js"));
var import_dayjs = require("@sequelize/core/_non-semver-use-at-your-own-risk_/utils/dayjs.js");
var import_utils = require("@sequelize/utils");
var import_dayjs2 = __toESM(require("dayjs"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_wkx = __toESM(require("wkx"));
import_dayjs2.default.extend(import_utc.default);
import_dayjs2.default.extend(import_timezone.default);
class FLOAT extends BaseTypes.FLOAT {
  getNumberSqlTypeName() {
    return "FLOAT";
  }
  _supportsNativeUnsigned() {
    return true;
  }
}
class DOUBLE extends BaseTypes.DOUBLE {
  getNumberSqlTypeName() {
    return "DOUBLE PRECISION";
  }
  _supportsNativeUnsigned() {
    return true;
  }
}
class REAL extends BaseTypes.REAL {
  _supportsNativeUnsigned() {
    return true;
  }
}
class DECIMAL extends BaseTypes.DECIMAL {
  _supportsNativeUnsigned() {
    return true;
  }
}
class TINYINT extends BaseTypes.TINYINT {
  _supportsNativeUnsigned() {
    return true;
  }
}
class SMALLINT extends BaseTypes.SMALLINT {
  _supportsNativeUnsigned() {
    return true;
  }
}
class MEDIUMINT extends BaseTypes.MEDIUMINT {
  _supportsNativeUnsigned() {
    return true;
  }
}
class INTEGER extends BaseTypes.INTEGER {
  _supportsNativeUnsigned() {
    return true;
  }
}
class BIGINT extends BaseTypes.BIGINT {
  _supportsNativeUnsigned() {
    return true;
  }
}
class BOOLEAN extends BaseTypes.BOOLEAN {
  toSql() {
    return "TINYINT(1)";
  }
  escape(value) {
    return value ? "true" : "false";
  }
  toBindableValue(value) {
    return value ? 1 : 0;
  }
}
class DATE extends BaseTypes.DATE {
  toBindableValue(date) {
    date = this._applyTimezone(date);
    const precision = this.options.precision ?? 0;
    let format = "YYYY-MM-DD HH:mm:ss";
    if (precision > 0) {
      format += `.SSS`;
    }
    return date.format(format);
  }
  sanitize(value, options) {
    if ((0, import_utils.isString)(value) && options?.timezone) {
      if ((0, import_dayjs.isValidTimeZone)(options.timezone)) {
        return import_dayjs2.default.tz(value, options.timezone).toDate();
      }
      return /* @__PURE__ */ new Date(`${value} ${options.timezone}`);
    }
    return super.sanitize(value);
  }
}
class JSON extends BaseTypes.JSON {
  escape(value) {
    return `CAST(${super.escape(value)} AS JSON)`;
  }
  getBindParamSql(value, options) {
    return `CAST(${super.getBindParamSql(value, options)} AS JSON)`;
  }
}
class UUID extends BaseTypes.UUID {
  // TODO: add check constraint to enforce GUID format
  toSql() {
    return "CHAR(36) BINARY";
  }
}
class GEOMETRY extends BaseTypes.GEOMETRY {
  toBindableValue(value) {
    const srid = this.options.srid ? `, ${this.options.srid}` : "";
    return `ST_GeomFromText(${this._getDialect().escapeString(
      import_wkx.default.Geometry.parseGeoJSON(value).toWkt()
    )}${srid})`;
  }
  getBindParamSql(value, options) {
    const srid = this.options.srid ? `, ${options.bindParam(this.options.srid)}` : "";
    return `ST_GeomFromText(${options.bindParam(import_wkx.default.Geometry.parseGeoJSON(value).toWkt())}${srid})`;
  }
  toSql() {
    const sql = this.options.type?.toUpperCase() || "GEOMETRY";
    if (this.options.srid) {
      return `${sql} /*!80003 SRID ${this.options.srid} */`;
    }
    return sql;
  }
}
class ENUM extends BaseTypes.ENUM {
  toSql() {
    const dialect = this._getDialect();
    return `ENUM(${this.options.values.map((value) => dialect.escapeString(value)).join(", ")})`;
  }
}
//# sourceMappingURL=data-types-overrides.js.map
