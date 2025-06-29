import type { SyntaxNode } from 'bnf-parser';
import type { Class } from 'type-fest';
import { AssociationPath } from '../expression-builders/association-path.js';
import { Attribute } from '../expression-builders/attribute.js';
import { Cast } from '../expression-builders/cast.js';
import type { DialectAwareFn } from '../expression-builders/dialect-aware-fn.js';
import { JsonPath } from '../expression-builders/json-path.js';
/**
 * Parses the attribute syntax (the syntax of keys in WHERE POJOs) into its "BaseExpression" representation.
 *
 * @example
 * ```ts
 * parseAttribute('id') // => attribute('id')
 * parseAttribute('$user.id$') // => association(['user'], 'id')
 * parseAttribute('json.key') // => jsonPath(attribute('json'), ['key'])
 * parseAttribute('name::number') // => cast(attribute('name'), 'number')
 * parseAttribute('json.key::number') // => cast(jsonPath(attribute('json'), ['key']), 'number')
 * ```
 *
 * @param attribute The syntax to parse
 */
export declare const parseAttributeSyntax: typeof parseAttributeSyntaxInternal & import("lodash").MemoizedFunction;
/**
 * Parses the syntax supported by nested JSON properties.
 * This is a subset of {@link parseAttributeSyntax}, which does not parse associations, and returns raw data
 * instead of a BaseExpression.
 */
export declare const parseNestedJsonKeySyntax: typeof parseJsonPropertyKeyInternal & import("lodash").MemoizedFunction;
export interface StringNode<Type extends string> extends SyntaxNode {
    type: Type;
    value: string;
}
declare function parseAttributeSyntaxInternal(code: string): Cast | JsonPath | AssociationPath | Attribute | DialectAwareFn;
/**
 * Do not mutate this! It is memoized to avoid re-parsing the same path over and over.
 */
export interface ParsedJsonPropertyKey {
    readonly pathSegments: ReadonlyArray<string | number>;
    /**
     * If it's a string, it's a cast. If it's a class, it's a modifier.
     */
    readonly castsAndModifiers: ReadonlyArray<string | Class<DialectAwareFn>>;
}
declare function parseJsonPropertyKeyInternal(code: string): ParsedJsonPropertyKey;
export {};
