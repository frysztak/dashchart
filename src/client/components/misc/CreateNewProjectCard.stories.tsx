import { select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { CreateNewProjectCard, CreateNewProjectCardProps } from './CreateNewProjectCard';
import { LoadingState } from '../../store/project';

export default { title: 'CreateNewProjectCard', decorators: [withKnobs] };

export const CreateNewProjectCardStory = () => {
  const props: CreateNewProjectCardProps = {
    submit: (name: string) => {
      console.log('submit', name);
    },
    state: select('state', LoadingState, LoadingState.IDLE),
  };

  return (
    <div style={{ width: `350px` }}>
      <CreateNewProjectCard {...props} />
    </div>
  );
};
