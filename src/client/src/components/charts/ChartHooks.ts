import { ChartData, ChartProps } from './ChartProps';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { AxisRanges, AxisScalers, AxesTransforms, getAxisScalers, getAxisTransforms, getRanges } from './ChartCommon';

export function useAxesScalers(props: ChartProps): AxisScalers {
  const chart: ChartData = props.data;
  const axisRanges: AxisRanges = useMemo(() => getRanges(props.dimensions), [props.dimensions]);
  const scalers: AxisScalers = useMemo(() => getAxisScalers(chart, axisRanges), [chart, axisRanges]);
  return scalers;
}

export function useAxesTransforms(
  xAxisRef: RefObject<SVGGElement | null>,
  yAxisRef: RefObject<SVGGElement | null>,
  props: ChartProps,
  scalers: AxisScalers,
): AxesTransforms | undefined {
  const [axisTransforms, setAxisTransforms] = useState<AxesTransforms>();

  useEffect(() => {
    setAxisTransforms(getAxisTransforms(xAxisRef, yAxisRef, props.data, scalers, props.dimensions));
  }, [xAxisRef, yAxisRef, props.data, scalers, props.dimensions]);

  return axisTransforms;
}
