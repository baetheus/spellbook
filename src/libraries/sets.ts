export const toggleIn = <T>(t: T) => (s: Set<T>): Set<T> => {
  if (s.has(t)) {
    s.delete(t);
  } else {
    s.add(t);
  }
  return s;
};
