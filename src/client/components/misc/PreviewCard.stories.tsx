import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { CreateNewCard } from './PreviewCard';

export default { title: 'PreviewCard', decorators: [withKnobs] };

export const CreateNewCardStory = () => {
  const props = {
    label: text('label', 'Create new smth...'),
    onClick: () => console.log('clicked'),
  };
  return <CreateNewCard {...props} />;
};
