/**
 * Takes an integer and returns the ordinal string for that integer.
 *
 * @example
 * assert(ordinal(1) === '1st');
 * assert(ordinal(10) === '1th');
 * assert(ordinal(22) === '2nd');
 */
export const ordinal = (i: number): string => {
  const j = i % 10;
  const k = i % 100;

  if (j == 1 && k != 11) {
    return i + "st";
  } else if (j == 2 && k != 12) {
    return i + "nd";
  } else if (j == 3 && k != 13) {
    return i + "rd";
  } else {
    return i + "th";
  }
};

/**
 * Constrain number to Comparison
 */
export const toComparison = (n: number): -1 | 0 | 1 => {
  if (n > 0) {
    return 1;
  } else if (n < 0) {
    return -1;
  } else {
    return 0;
  }
};

/**
 * Safe modulo operator
 */
export const mod = (m: number, n: number): number => {
  return ((m % n) + n) % n;
};
