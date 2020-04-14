export const split = <T>(ts: ReadonlyArray<T>): [T[], T[]] => {
  const front: T[] = [];
  const back: T[] = [];
  const middle = Math.floor(ts.length / 2);
  ts.forEach((t, i) => (i < middle ? front.push(t) : back.push(t)));
  return [front, back];
};
