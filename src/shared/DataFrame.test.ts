import { enableMapSet } from 'immer';
import { ColumnType, DataFrame } from './DataFrame';

describe('DataFrame', () => {
  let frame: DataFrame;

  beforeAll(() => {
    enableMapSet();
  });

  beforeEach(() => {
    frame = new DataFrame({
      id: {
        type: ColumnType.STRING,
        values: ['1', '2', '3', '4', '5'],
      },
      first_name: {
        type: ColumnType.STRING,
        values: ['Prentiss', 'Bessie', 'Tybi', 'Felix', 'Gay'],
      },
      last_name: {
        type: ColumnType.STRING,
        values: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee'],
      },
      email: {
        type: ColumnType.STRING,
        values: [
          'ppassey0@amazonaws.com',
          'bdocker1@pagesperso-orange.fr',
          'tfantini2@reference.com',
          'ffreak3@google.nl',
          'gcutchee4@ifeng.com',
        ],
      },
      numbers: {
        type: ColumnType.NUMBER,
        values: [10, 20, 30, 40, 50],
      },
    });
  });

  test('returns name of columns', () => {
    const names: string[] = frame.columnNames();
    expect(names).toEqual(['id', 'first_name', 'last_name', 'email', 'numbers']);
  });

  test('infers type of numeric columns', () => {
    frame.inferColumnTypes();
    expect(frame.column('id')?.inferredType).toEqual(ColumnType.NUMBER);
    expect(frame.column('first_name')?.inferredType).toEqual(ColumnType.STRING);
    expect(frame.column('last_name')?.inferredType).toEqual(ColumnType.STRING);
    expect(frame.column('email')?.inferredType).toEqual(ColumnType.STRING);
  });

  test('converts strings to numbers', () => {
    frame.inferColumnType('id');
    frame.convertColumn('id', ColumnType.NUMBER);
    expect(frame.column('id')?.type).toEqual(ColumnType.NUMBER);
    expect(frame.column('id')?.inferredType).toEqual(ColumnType.NUMBER);
    expect(frame.column('id')?.values).toEqual([1, 2, 3, 4, 5]);
  });

  test('converts numbers to strings', () => {
    frame.convertColumn('numbers', ColumnType.STRING);
    expect(frame.column('numbers')?.type).toEqual(ColumnType.STRING);
    expect(frame.column('numbers')?.values).toEqual(['10', '20', '30', '40', '50']);
  });
});
