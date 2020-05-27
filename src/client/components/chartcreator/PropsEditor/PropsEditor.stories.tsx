import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { PropsEditor } from './PropsEditor';
import { AxisScale, ChartType, UserEditableChartProps } from '../../charts/common/Props';
import { styled } from '../../../config/Theme';

export default { title: 'PropsEditor', decorators: [withKnobs] };

const Wrapper = styled.div`
  width: 250px;
`;

export const PropsEditorStory = () => {
  let userProps: UserEditableChartProps = {
    dimensions: {
      height: 600,
      width: 800,
      margin: {
        top: 20,
        right: 80,
        bottom: 40,
        left: 20,
      },
    },
    type: ChartType.LINE,
    data: {
      x: {
        scale: AxisScale.LINEAR,
      },
      y: {
        scale: AxisScale.LINEAR,
      },
    },
  };

  const handleUpdateProps = (newProps: UserEditableChartProps) => {
    console.log('new props', newProps);
    userProps = newProps;
  };

  return (
    <Wrapper>
      <PropsEditor chartName={'Chart #1'} chartProps={userProps} updateProps={handleUpdateProps} />{' '}
    </Wrapper>
  );
};
