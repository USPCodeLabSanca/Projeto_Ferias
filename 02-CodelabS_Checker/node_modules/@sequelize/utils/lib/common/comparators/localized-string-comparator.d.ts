import type { Comparator } from './comparator.js';
import { SortDirection } from './comparator.js';
/**
 * Returns a comparator that sorts strings alphabetically using `localeCompare`.
 * The collator includes many options to sort numerically, to ignore the case, to ignore accents, etc…
 *
 * @param locale The locale of the strings
 * @param direction The sort direction
 * @param options collator options
 */
export declare function localizedStringComparator(locale: string, direction?: SortDirection, options?: Omit<Intl.CollatorOptions, 'usage'>): Comparator<string>;
