/**
 * Splits an object into two objects, one containing the keys provided and the other containing the rest.
 *
 * @param object The object to split
 * @param keys The keys to pick from the object
 * @returns A tuple where the first element is an object containing the picked keys and the second element is an object containing the rest
 */
export declare function splitObject<Obj extends object, Keys extends ReadonlyArray<keyof Obj>>(object: Obj, keys: Keys): [Pick<Obj, Keys[number]>, Omit<Obj, Keys[number]>];
