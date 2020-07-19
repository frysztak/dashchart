import { select, text, withKnobs, date, number } from '@storybook/addon-knobs';
import React from 'react';
import { ProjectPreview, ProjectPreviewProps } from './ProjectPreview';
import { IOStatus } from '../../store/common';
import { Project } from '../../store/project';

export default { title: 'ProjectPreview', decorators: [withKnobs] };

export const ProjectPreviewStory = () => {
  const props: ProjectPreviewProps = {
    project: {
      name: text('Name', 'Project #1'),
      id: 1,
      createdAt: new Date(date('createdAt', new Date())),
      updatedAt: new Date(date('updateAt', new Date())),
    } as Project,
    stats: {
      status: select('Stats status', IOStatus, IOStatus.OK),
      values: {
        chartCount: number('Chart count', 1, { step: 1, min: 0 }),
        dataFrameCount: number('DataFrame count', 2, { step: 1, min: 0 }),
      },
    },
    onClick: () => console.log('clicked'),
  };
  return <ProjectPreview {...props} />;
};
