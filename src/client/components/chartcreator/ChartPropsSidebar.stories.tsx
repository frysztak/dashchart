import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { ChartPropsSidebar, PropsSidebarProps } from './ChartPropsSidebar';
import { DefaultChartProps } from '../charts/common/Defaults';

export default { title: 'ChartPropsSidebar', decorators: [withKnobs] };

export const ChartPropsSidebarNoCharts = () => {
  const props: PropsSidebarProps = {
    chartName: text('chartName', 'Chart 1'),
    updateName: (name: string) => {
      console.log('updateName', name);
    },
    chartProps: [],
    updateProps: (newProps, idx) => {
      console.log(idx, newProps);
      props.chartProps[idx] = newProps;
    },
  };

  return <ChartPropsSidebar {...props} />;
};

export const ChartPropsSidebarSingleChart = () => {
  const props: PropsSidebarProps = {
    chartName: text('chartName', 'Chart 1'),
    updateName: (name: string) => {
      console.log('updateName', name);
    },
    chartProps: [DefaultChartProps],
    updateProps: (newProps, idx) => {
      console.log(idx, newProps);
      props.chartProps[idx] = newProps;
    },
  };

  return <ChartPropsSidebar {...props} />;
};

export const ChartPropsSidebarDoubleChart = () => {
  const props: PropsSidebarProps = {
    chartName: text('chartName', 'Chart 1'),
    updateName: (name: string) => {
      console.log('updateName', name);
    },
    chartProps: [DefaultChartProps, DefaultChartProps],
    updateProps: (newProps, idx) => {
      console.log(idx, newProps);
      props.chartProps[idx] = newProps;
    },
  };

  return <ChartPropsSidebar {...props} />;
};
