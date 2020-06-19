import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { PropsEditor } from './PropsEditor';
import { UserEditableChartProps } from '../../charts/common/Props';
import { styled } from '../../../config/Theme';
import { DefaultChartProps } from '../../charts/common/Defaults';

export default { title: 'PropsEditor', decorators: [withKnobs] };

const Wrapper = styled.div`
  width: 250px;
`;

export const SinglePropsEditor = () => {
  let userProps: UserEditableChartProps = {
    ...DefaultChartProps,
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

export const DoublePropsEditor = () => {
  let userProps: UserEditableChartProps = {
    ...DefaultChartProps,
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
