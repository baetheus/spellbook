import { right } from "fp-ts/es6/Either";
import * as C from "io-ts/es6/Codec";
import * as D from "io-ts/es6/Decoder";

export const setFromStringArray: C.Codec<Set<string>> = C.make(
  D.parse(D.array(D.string), (as) => {
    const set = new Set<string>();
    as.forEach((a) => set.add(a));
    return right(set);
  }),
  { encode: (set) => Array.from(set) }
);

export const toggleIn = <T>(t: T) => (s: Set<T>): Set<T> => {
  if (s.has(t)) {
    s.delete(t);
  } else {
    s.add(t);
  }
  return s;
};
