import { withKnobs } from '@storybook/addon-knobs';
import { ColumnType, DataFrame } from 'shared/DataFrame/index';
import React from 'react';
import { DataFrameSidebarProps, DataFrameSidebar } from './DataFrameSidebar';

export default { title: 'DataFrame Sidebar', decorators: [withKnobs] };

export const DataFrameSidebarStory = () => {
  const frame: DataFrame = {
    id: 1,
    name: 'My DF',
    columns: {
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
    },
  };

  const props: DataFrameSidebarProps = {
    dataFrames: [frame, frame, frame, frame],
  };

  return <DataFrameSidebar {...props} />;
};
