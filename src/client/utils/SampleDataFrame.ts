import { ColumnType, DataFrame } from 'shared/DataFrame/index';

export const SampleDataFrame: DataFrame = {
  id: 1,
  name: 'My DF',
  columns: {
    id: {
      type: ColumnType.STRING,
      values: ['1', '2', '3', '4', '5', '6', '7'],
    },
    first_name: {
      type: ColumnType.STRING,
      values: ['Prentiss', 'Bessie', 'Tybi', 'Felix', 'Gay', 'Eh', 'Eh2'],
    },
    last_name: {
      type: ColumnType.STRING,
      values: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee', 'Dunno', 'Dunno2'],
    },
    email: {
      type: ColumnType.STRING,
      values: [
        'ppassey0@amazonaws.com',
        'bdocker1@pagesperso-orange.fr',
        'tfantini2@reference.com',
        'ffreak3@google.nl',
        'gcutchee4@ifeng.com',
        'gcutchee5@ifeng.com',
        'gcutchee6@ifeng.com',
      ],
    },
    numbers: {
      type: ColumnType.NUMBER,
      values: [10, 20, 30, 40, 50, 60, 70],
    },
  },
};
