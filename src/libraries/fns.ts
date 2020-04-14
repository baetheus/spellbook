import { Fn, FromFn } from "~/libraries/types";

/**
 * Typeguard for T | undefined | null to undefined | null
 */
export const nil = <T>(t: T | undefined | null): t is undefined | null =>
  t === undefined || t === null;

/**
 * Typeguard for T | undefined | null to T
 */
export const notNil = <T>(t: T | undefined | null): t is T => !nil(t);

/**
 * Curried equality function. Primarily for use in Array.some(eq(valueToCompare))
 */
export const eq = <T>(a: T) => (b: T): boolean => a === b;

/**
 * Curried equality function. Primarilt for use in Array.every(notEq(valueToCheckFor))
 */
export const notEq = <T>(a: T) => (b: T): boolean => a !== b;

/**
 * Curried check for object in array function.
 */
export const isIn = <T>(as: ReadonlyArray<T>, comparitor: typeof eq = eq) => (b: T): boolean =>
  as.some(comparitor(b));

/**
 * Curried Array intersection predicate.
 */
export const intersects = <T>(as: ReadonlyArray<T>, comparitor: typeof eq = eq) => (
  bs: ReadonlyArray<T>
): boolean => as.some(isIn(bs, comparitor));

/**
 * Adds/Removes a value from an array of same values.
 * - If the value is in the array, remove it and return the new array
 * - If the value is not in the array, add it and return the new array
 *
 * Curried for use with Lens.modify on an array
 */
export const toggleIn = <T>(t: T) => (ts: ReadonlyArray<T>): T[] =>
  ts.some(eq(t)) ? ts.filter(notEq(t)) : ts.concat(t);

/**
 * Debounces function
 */
export const debounce = <AS extends any[], R>(fn: Fn<AS, R>, delay: number): Fn<AS, void> => {
  let timeout: FromFn<typeof setTimeout>[1] | null = null;
  return (...args: AS): void => {
    if (notNil(timeout)) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn(...args), delay);
  };
};
