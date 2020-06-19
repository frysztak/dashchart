import { AxisFontFamily, AxisScale, AxisStyle, ChartType, UserEditableChartProps } from './Props';
import { ColourScheme } from '../ColourScheme';

export const DefaultAxisStyle: AxisStyle<any> = {
  fontFamily: AxisFontFamily.SIGNIKA_LIGHT,
  fontSize: 16,

  tickSize: 6,
  tickPadding: 3,
  barPadding: 0.5,
};

export const DefaultChartProps: UserEditableChartProps = {
  type: ChartType.LINE,
  dimensions: {
    width: 800,
    height: 600,
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
  colourScheme: ColourScheme.Ocean,
};
