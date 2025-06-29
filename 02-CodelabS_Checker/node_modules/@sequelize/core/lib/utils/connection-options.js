"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var connection_options_exports = {};
__export(connection_options_exports, {
  normalizeReplicationConfig: () => normalizeReplicationConfig,
  parseCommonConnectionUrlOptions: () => parseCommonConnectionUrlOptions
});
module.exports = __toCommonJS(connection_options_exports);
var import_utils = require("@sequelize/utils");
function normalizeReplicationConfig(dialect, connectionOptions, replicationOption) {
  const normalizedConnectionOptions = normalizeRawConnectionOptions(dialect, connectionOptions);
  return {
    write: {
      ...normalizedConnectionOptions,
      ...replicationOption && replicationOption.write && normalizeRawConnectionOptions(dialect, replicationOption.write)
    },
    read: !replicationOption ? import_utils.EMPTY_ARRAY : replicationOption.read.map((readOptions) => {
      return {
        ...normalizedConnectionOptions,
        ...normalizeRawConnectionOptions(dialect, readOptions)
      };
    })
  };
}
function normalizeRawConnectionOptions(dialect, options) {
  if ((0, import_utils.isString)(options)) {
    return dialect.parseConnectionUrl(options);
  }
  const { url, ...remainingOptions } = options;
  if (url) {
    return {
      ...dialect.parseConnectionUrl(url),
      ...remainingOptions
    };
  }
  return remainingOptions;
}
function parseCommonConnectionUrlOptions(options) {
  const url = (0, import_utils.isString)(options.url) ? new URL(options.url) : options.url;
  const assignTo = (0, import_utils.pojo)();
  const scheme = url.protocol.slice(0, -1);
  if (!options.allowedProtocols.includes(scheme)) {
    throw new Error(
      `URL ${(0, import_utils.inspect)(url.toString())} is not a valid connection URL. Expected the protocol to be one of ${options.allowedProtocols.map(import_utils.inspect).join(", ")}, but it's ${(0, import_utils.inspect)(scheme)}.`
    );
  }
  if (url.hostname) {
    assignTo[options.hostname] = decodeURIComponent(url.hostname);
  }
  if (url.port) {
    assignTo[options.port] = import_utils.parseSafeInteger.orThrow(url.port);
  }
  if (url.pathname) {
    assignTo[options.pathname] = decodeURIComponent(url.pathname.replace(/^\//, ""));
  }
  if (options.username && url.username) {
    assignTo[options.username] = decodeURIComponent(url.username);
  }
  if (options.password && url.password) {
    assignTo[options.password] = decodeURIComponent(url.password);
  }
  const allSearchParams = /* @__PURE__ */ new Set([
    ...options.stringSearchParams ?? import_utils.EMPTY_ARRAY,
    ...options.booleanSearchParams ?? import_utils.EMPTY_ARRAY,
    ...options.numberSearchParams ?? import_utils.EMPTY_ARRAY
  ]);
  if (url.searchParams) {
    for (const key of url.searchParams.keys()) {
      if (!allSearchParams.has(key)) {
        throw new Error(
          `Option ${(0, import_utils.inspect)(key)} cannot be set as a connection URL search parameter. Only the following options can be set: ${(0, import_utils.join)(allSearchParams, ", ")}`
        );
      }
      if (options.stringSearchParams?.includes(key)) {
        assignTo[key] = url.searchParams.get(key);
      }
      try {
        if (options.booleanSearchParams?.includes(key)) {
          assignTo[key] = import_utils.parseBoolean.orThrow(url.searchParams.get(key));
        }
        if (options.numberSearchParams?.includes(key)) {
          assignTo[key] = import_utils.parseFiniteNumber.orThrow(url.searchParams.get(key));
        }
      } catch (error) {
        throw new Error(`Could not parse URL search parameter ${key}`, { cause: error });
      }
    }
  }
  return assignTo;
}
//# sourceMappingURL=connection-options.js.map
