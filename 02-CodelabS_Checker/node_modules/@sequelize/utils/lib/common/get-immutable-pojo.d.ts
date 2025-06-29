/**
 * Returns a prototype-free, shallow-immutable, version of the provided object,
 * without modifying the original object.
 *
 * If the object already matches the criteria, it is returned as-is.
 *
 * @param obj - The object.
 * @returns The immutable version of the object.
 */
export declare function getImmutablePojo<T extends object>(obj: T): T;
