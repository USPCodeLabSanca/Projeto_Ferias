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
var build_parser_exports = {};
__export(build_parser_exports, {
  ParseError: () => ParseError,
  buildNullBasedParser: () => buildNullBasedParser,
  buildThrowBasedParser: () => buildThrowBasedParser
});
module.exports = __toCommonJS(build_parser_exports);
function buildNullBasedParser(parseValue, buildError) {
  const parse = (...value) => {
    return parseValue(...value);
  };
  parse.orThrow = (...value) => {
    const out = parseValue(...value);
    if (out === null) {
      throw new ParseError(buildError(...value));
    }
    return out;
  };
  return parse;
}
function buildThrowBasedParser(parseValue) {
  const parse = (...value) => {
    try {
      return parseValue(...value);
    } catch (error) {
      if (error instanceof ParseError) {
        return null;
      }
      throw error;
    }
  };
  parse.orThrow = (...value) => {
    return parseValue(...value);
  };
  return parse;
}
class ParseError extends Error {
}
//# sourceMappingURL=build-parser.js.map
