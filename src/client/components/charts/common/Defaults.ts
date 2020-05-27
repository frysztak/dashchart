import { AxisScale, AxisStyle, ChartType, UserEditableChartProps } from './Props';

export const DefaultAxisStyle: AxisStyle<any> = {
  tickSize: 6,
  tickPadding: 3,
  barPadding: 0.5,
};

export const DefaultChartProps: UserEditableChartProps = {
  type: ChartType.LINE,
  dimensions: {
    width: 600,
    height: 400,
    margin: {
      top: 40,
      left: 40,
      right: 80,
      bottom: 80,
    },
  },
  data: {
    x: {
      scale: AxisScale.LINEAR,
      style: DefaultAxisStyle,
    },
    y: {
      scale: AxisScale.LINEAR,
      style: DefaultAxisStyle,
    },
  },
};
