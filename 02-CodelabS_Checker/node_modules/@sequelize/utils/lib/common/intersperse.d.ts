/**
 * Inserts a value between each element of a list.
 * `separator` can be a function, which is useful to generate JSX elements with different keys.
 *
 * @param list The list
 * @param separator The value to insert between each element of the list, or a function that will produce each element to insert.
 */
export declare function intersperse<Value, Separator>(list: Value[], separator: Separator | ((index: number) => Separator)): Array<Value | Separator>;
