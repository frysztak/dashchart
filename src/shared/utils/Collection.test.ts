import { dupingZip, zip } from './Collection';

describe('zip', () => {
  it('works with empty arrays', () => {
    const result = zip([], []);
    expect(result).toEqual([]);
  });

  it('works with equal length arrays', () => {
    const result = zip([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
    expect(result).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [4, 'd'],
    ]);
  });

  it('works with different length arrays', () => {
    const result = zip([1, 2, 3, 4], ['a', 'b', 'c']);
    expect(result).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('works with one empty array', () => {
    const result = zip([1, 2, 3, 4], []);
    expect(result).toEqual([]);
  });
});

describe('dupingZip', () => {
  it('works with empty arrays', () => {
    const result = dupingZip([], []);
    expect(result).toEqual([]);
  });

  it('works with equal length arrays', () => {
    const result = dupingZip([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
    expect(result).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [4, 'd'],
    ]);
  });

  it('works with different length arrays', () => {
    const result = dupingZip([1, 2, 3, 4], ['a', 'b', 'c']);
    expect(result).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [4, 'c'],
    ]);
  });

  it('works with one empty array', () => {
    const result = zip([1, 2, 3, 4], []);
    expect(result).toEqual([]);
  });
});
