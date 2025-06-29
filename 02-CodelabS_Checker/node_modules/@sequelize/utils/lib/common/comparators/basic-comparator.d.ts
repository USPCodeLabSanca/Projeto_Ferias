import type { Comparator } from './comparator.js';
import { SortDirection } from './comparator.js';
/**
 * A comparator that uses the comparison operators (>, <) to determine the order of any value.
 *
 * Works well for:
 * - numbers
 * - bigints
 * - unlocalized strings
 * - Date objects
 *
 * This should be used with caution as other comparators can be better suited to this task.
 * For instance, you may prefer to sort strings with {@link localizedStringComparator} instead
 * of relying on their unicode codepoints.
 *
 * @param direction The sort direction.
 */
export declare function basicComparator<T>(direction?: SortDirection): Comparator<T>;
