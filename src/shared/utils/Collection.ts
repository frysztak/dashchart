export function isNumeric(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function zip<A, B>(a: A[], b: B[]): [A, B][] {
  const len: number = Math.min(a.length, b.length);
  return [...Array(len)].map((_, i: number) => [a[i], b[i]]);
}

export const identity = <T>(t: T): T => t;

export function dupingZip<A, B>(
  a: A[],
  b: B[],
  mapperA: (a: A) => A = identity,
  mapperB: (b: B) => B = identity,
): [A, B][] {
  if (a.length === b.length) {
    return zip(a, b);
  }

  const len: number = Math.max(a.length, b.length);
  const at = <T>(arr: T[], i: number, mapper: (t: T) => T): T =>
    i >= arr.length ? mapper(arr[arr.length - 1]) : arr[i];
  return [...Array(len)].map((_, i: number) => [at(a, i, mapperA), at(b, i, mapperB)]);
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

export const keys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];
export const entries = Object.entries as <K extends string | number, T>(o: {
  [key: string]: T;
}) => Extract<K, keyof T>[];
