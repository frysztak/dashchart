import { CSVLoader } from './CSV';
import { Column, ColumnType, DataFrame, getColumn } from '../DataFrame';
import { Dictionary, Result, takeRight } from '../utils';
import { isRight } from 'fp-ts/es6/Either';
import fetchMock from 'fetch-mock';

describe('CSV loader', () => {
  let loader: CSVLoader;

  const sampleCSV: string = `id,first_name,last_name,email
1,Prentiss,Passey,ppassey0@amazonaws.com
2,Bessie,Docker,bdocker1@pagesperso-orange.fr
3,Tybi,Fantini,tfantini2@reference.com
4,Felix,Freak,ffreak3@google.nl
5,Gay,Cutchee,gcutchee4@ifeng.com
`;

  beforeEach(() => {
    loader = new CSVLoader();
  });

  describe('loadString', () => {
    test('CSV with column names', async () => {
      const result: Result<DataFrame> = await loader.loadString(sampleCSV)();

      const columns: Dictionary<Column> = {
        id: {
          type: ColumnType.STRING,
          inferredType: ColumnType.NUMBER,
          values: ['1', '2', '3', '4', '5'],
        },
        first_name: {
          type: ColumnType.STRING,
          inferredType: ColumnType.STRING,
          values: ['Prentiss', 'Bessie', 'Tybi', 'Felix', 'Gay'],
        },
        last_name: {
          type: ColumnType.STRING,
          inferredType: ColumnType.STRING,
          values: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee'],
        },
        email: {
          type: ColumnType.STRING,
          inferredType: ColumnType.STRING,
          values: [
            'ppassey0@amazonaws.com',
            'bdocker1@pagesperso-orange.fr',
            'tfantini2@reference.com',
            'ffreak3@google.nl',
            'gcutchee4@ifeng.com',
          ],
        },
      };

      expect(isRight(result)).toBe(true);
      const frame = takeRight(result);

      for (const [name, expectedColumn] of Object.entries(columns)) {
        const actualColumn: Result<Column> = getColumn(frame, name);
        expect(isRight(actualColumn)).toBe(true);
        expect(takeRight(actualColumn)).toEqual(expectedColumn);
      }
    });
  });

  describe('loadUrl', () => {
    beforeAll(() => {
      fetchMock.mock('myCSV.com/1.csv', { status: 200, body: sampleCSV });
    });

    test('CSV with column names', async () => {
      const result: Result<DataFrame> = await loader.loadUrl('myCSV.com/1.csv')();

      const columns: Dictionary<Column> = {
        id: {
          type: ColumnType.STRING,
          inferredType: ColumnType.NUMBER,
          values: ['1', '2', '3', '4', '5'],
        },
        first_name: {
          type: ColumnType.STRING,
          inferredType: ColumnType.STRING,
          values: ['Prentiss', 'Bessie', 'Tybi', 'Felix', 'Gay'],
        },
        last_name: {
          type: ColumnType.STRING,
          inferredType: ColumnType.STRING,
          values: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee'],
        },
        email: {
          type: ColumnType.STRING,
          inferredType: ColumnType.STRING,
          values: [
            'ppassey0@amazonaws.com',
            'bdocker1@pagesperso-orange.fr',
            'tfantini2@reference.com',
            'ffreak3@google.nl',
            'gcutchee4@ifeng.com',
          ],
        },
      };

      expect(isRight(result)).toBe(true);
      const frame = takeRight(result);

      for (const [name, expectedColumn] of Object.entries(columns)) {
        const actualColumn: Result<Column> = getColumn(frame, name);
        expect(isRight(actualColumn)).toBe(true);
        expect(takeRight(actualColumn)).toEqual(expectedColumn);
      }
    });
  });
});
