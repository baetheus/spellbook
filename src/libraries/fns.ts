export const eq = <T>(a: T) => (b: T): boolean => a === b;
export const notEq = <T>(a: T) => (b: T): boolean => a !== b;
export const isIn = <T>(as: T[]) => (b: T): boolean => as.some(eq(b));
export const intersects = <T>(as: T[]) => (bs: T[]): boolean => as.some(isIn(bs));
export const toggleIn = <T>(t: T) => (ts: T[]): T[] =>
  ts.some(eq(t)) ? ts.filter(notEq(t)) : ts.concat(t);
