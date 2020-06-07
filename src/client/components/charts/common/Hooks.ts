import { AxisFontFamily, AxisStyle, ChartData, ChartProps } from './Props';
import { CSSProperties, RefObject, useEffect, useMemo, useState } from 'react';
import { AxisRanges, AxisScalers, AxesTransforms, getAxisScalers, getAxisTransforms, getRanges } from './Axis';
import { Result, Ok } from 'shared/utils';

export function useAxesScalers(props: ChartProps): Result<AxisScalers> {
  const chart: ChartData = props.data;
  const axisRanges: AxisRanges = useMemo(() => getRanges(props.dimensions), [props.dimensions]);
  const scalers: Result<AxisScalers> = useMemo(() => getAxisScalers(chart, props.type, axisRanges), [
    chart,
    axisRanges,
  ]);
  return scalers;
}

export function useAxesTransforms(
  xAxisRef: RefObject<SVGGElement | null>,
  yAxisRef: RefObject<SVGGElement | null>,
  props: ChartProps,
  scalers: Result<AxisScalers>,
): Result<AxesTransforms> {
  const [axisTransforms, setAxisTransforms] = useState<Result<AxesTransforms>>(Ok({ x: '', y: '' }));

  useEffect(() => {
    setAxisTransforms(getAxisTransforms(xAxisRef, yAxisRef, props.data, scalers, props.dimensions));
  }, [xAxisRef, yAxisRef, props.data, scalers, props.dimensions]);

  return axisTransforms;
}

export interface AxisStyles {
  x: CSSProperties;
  y: CSSProperties;
}

export function useAxesStyles(props: ChartProps): AxisStyles {
  const fontFamilies: Record<AxisFontFamily, string> = {
    [AxisFontFamily.SIGNIKA]: `'Signika'`,
    [AxisFontFamily.SIGNIKA_LIGHT]: `'Signika Light'`,
    [AxisFontFamily.SERIF]: `serif`,
    [AxisFontFamily.SANS_SERIF]: `sans-serif`,
    [AxisFontFamily.MONOSPACE]: `monospace`,
  };
  const mapToCSS = (axisStyle: AxisStyle<unknown>): CSSProperties => ({
    fontFamily: fontFamilies[axisStyle.fontFamily],
    fontSize: `${axisStyle.fontSize}px`,
  });

  return {
    x: mapToCSS(props.data.x.style),
    y: mapToCSS(props.data.y.style),
  };
}
