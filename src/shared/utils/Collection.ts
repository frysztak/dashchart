export function isNumeric(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function zip<A, B>(a: A[], b: B[]): [A, B][] {
  return a.map((v: A, i: number) => [v, b[i]]);
}

export function minmax<T extends number | Date>(list: Array<T>): [T, T] {
  return list.reduce(
    (acc: [T, T], value: T) => {
      let [min, max] = acc;
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
      return [min, max] as [T, T];
    },
    [Infinity, -Infinity] as [T, T],
  );
}
