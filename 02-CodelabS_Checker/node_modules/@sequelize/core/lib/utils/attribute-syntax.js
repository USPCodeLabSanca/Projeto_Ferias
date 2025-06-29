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
var attribute_syntax_exports = {};
__export(attribute_syntax_exports, {
  parseAttributeSyntax: () => parseAttributeSyntax,
  parseNestedJsonKeySyntax: () => parseNestedJsonKeySyntax
});
module.exports = __toCommonJS(attribute_syntax_exports);
var import_utils = require("@sequelize/utils");
var import_bnf_parser = require("bnf-parser");
var import_memoize = __toESM(require("lodash/memoize.js"));
var import_association_path = require("../expression-builders/association-path.js");
var import_attribute = require("../expression-builders/attribute.js");
var import_cast = require("../expression-builders/cast.js");
var import_dialect_aware_fn = require("../expression-builders/dialect-aware-fn.js");
var import_json_path = require("../expression-builders/json-path.js");
const parseAttributeSyntax = (0, import_memoize.default)(parseAttributeSyntaxInternal);
const parseNestedJsonKeySyntax = (0, import_memoize.default)(parseJsonPropertyKeyInternal);
const builtInModifiers = (0, import_utils.pojo)({
  unquote: import_dialect_aware_fn.Unquote
});
function getModifier(name) {
  const ModifierClass = builtInModifiers[name.toLowerCase()];
  if (!ModifierClass) {
    throw new Error(
      `${name} is not a recognized built-in modifier. Here is the list of supported modifiers: ${Object.keys(builtInModifiers).join(", ")}`
    );
  }
  return ModifierClass;
}
const attributeParser = (() => {
  const advancedAttributeBnf = `
    # Entry points

    ## Used when parsing the attribute
    attribute ::= ( ...association | ...identifier ) jsonPath? castOrModifiers?;

    ## Used when parsing a nested JSON path used inside of an attribute
    ## Difference with "attribute" is in the first part. Instead of accepting:
    ##  $association.attribute$ & attribute
    ## It accepts:
    ##  key, "quotedKey", and [0] (index access)
    partialJsonPath ::= ( ...indexAccess | ...key ) jsonPath? castOrModifiers? ;

    # Internals

    identifier ::= ( "A"->"Z" | "a"->"z" | digit | "_" )+ ;
    digit ::= "0"->"9" ;
    number ::= ...digit+ ;
    association ::= %"$" identifier ("." identifier)* %"$" ;
    jsonPath ::= ( ...indexAccess | ...keyAccess )+ ;
    indexAccess ::= %"[" number %"]" ;
    keyAccess ::= %"." key ;
    # path segments accept dashes without needing to be quoted
    key ::= nonEmptyString | ( "A"->"Z" | "a"->"z" | digit | "_" | "-" )+ ;
    nonEmptyString ::= ...(%"\\"" (anyExceptQuoteOrBackslash | escapedCharacter)+ %"\\"") ;
    escapedCharacter ::= %"\\\\" ( "\\"" | "\\\\" );
    any ::= !"" ;
    anyExceptQuoteOrBackslash ::= !("\\"" | "\\\\");
    castOrModifiers ::= (...cast | ...modifier)+;
    cast ::= %"::" identifier ;
    modifier ::= %":" identifier ;
  `;
  const parsedAttributeBnf = import_bnf_parser.BNF.parse(advancedAttributeBnf);
  if (parsedAttributeBnf instanceof import_bnf_parser.ParseError) {
    throw new Error(
      `Failed to initialize attribute syntax parser. This is a Sequelize bug: ${parsedAttributeBnf.toString()}`
    );
  }
  return (0, import_bnf_parser.Compile)(parsedAttributeBnf);
})();
function parseAttributeSyntaxInternal(code) {
  const parsed = attributeParser.parse(code, false, "attribute");
  if (parsed instanceof import_bnf_parser.ParseError) {
    throw new TypeError(`Failed to parse syntax of attribute. Parse error at index ${parsed.ref.start.index}:
${code}
${" ".repeat(parsed.ref.start.index)}^`);
  }
  const [attributeNode, jsonPathNodeRaw, castOrModifiersNodeRaw] = parsed.value;
  let result = parseAssociationPath(
    attributeNode.value
  );
  const jsonPathNodes = jsonPathNodeRaw.value[0]?.value[0].value;
  if (jsonPathNodes) {
    const path = jsonPathNodes.map((pathNode) => {
      return parseJsonPathSegment(pathNode);
    });
    result = new import_json_path.JsonPath(result, path);
  }
  const castOrModifierNodes = castOrModifiersNodeRaw.value[0]?.value[0].value;
  if (castOrModifierNodes) {
    for (const castOrModifierNode of castOrModifierNodes) {
      if (castOrModifierNode.type === "cast") {
        result = new import_cast.Cast(result, castOrModifierNode.value);
        continue;
      }
      const ModifierClass = getModifier(castOrModifierNode.value);
      result = new ModifierClass(result);
    }
  }
  return result;
}
function parseAssociationPath(syntax) {
  const path = syntax.split(".");
  if (path.length > 1) {
    const attr = path.pop();
    return new import_association_path.AssociationPath(path, attr);
  }
  return new import_attribute.Attribute(syntax);
}
function parseJsonPropertyKeyInternal(code) {
  const parsed = attributeParser.parse(code, false, "partialJsonPath");
  if (parsed instanceof import_bnf_parser.ParseError) {
    throw new TypeError(`Failed to parse syntax of json path. Parse error at index ${parsed.ref.start.index}:
${code}
${" ".repeat(parsed.ref.start.index)}^`);
  }
  const [firstKey, jsonPathNodeRaw, castOrModifiersNodeRaw] = parsed.value;
  const pathSegments = [parseJsonPathSegment(firstKey)];
  const jsonPathNodes = jsonPathNodeRaw.value[0]?.value[0].value;
  if (jsonPathNodes) {
    for (const pathNode of jsonPathNodes) {
      pathSegments.push(parseJsonPathSegment(pathNode));
    }
  }
  const castOrModifierNodes = castOrModifiersNodeRaw.value[0]?.value[0].value;
  const castsAndModifiers = [];
  if (castOrModifierNodes) {
    for (const castOrModifierNode of castOrModifierNodes) {
      if (castOrModifierNode.type === "cast") {
        castsAndModifiers.push(castOrModifierNode.value);
        continue;
      }
      const ModifierClass = getModifier(castOrModifierNode.value);
      castsAndModifiers.push(ModifierClass);
    }
  }
  return { pathSegments, castsAndModifiers };
}
function parseJsonPathSegment(node) {
  if (node.type === "indexAccess") {
    return Number(node.value);
  }
  return node.value;
}
//# sourceMappingURL=attribute-syntax.js.map
