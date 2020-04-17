export const split = <T>(ts: ReadonlyArray<T>): [T[], T[]] => {
  const front: T[] = [];
  const back: T[] = [];
  const middle = Math.floor(ts.length / 2);
  ts.forEach((t, i) => (i < middle ? front.push(t) : back.push(t)));
  return [front, back];
};

export const chunk = <T>(ts: ReadonlyArray<T>, chunkSize: number): T[][] => {
  if (chunkSize === 0) {
    return [[...ts]];
  }

  const result: T[][] = [];
  for (let i = 0, len = ts.length; i < len; i += chunkSize) {
    result.push(ts.slice(i, i + chunkSize));
  }
  return result;
};
