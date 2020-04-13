import { ChartData, ChartProps } from './Props';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { AxisRanges, AxisScalers, AxesTransforms, getAxisScalers, getAxisTransforms, getRanges } from './Axis';
import { Result, Ok } from '../../../utils';

export function useAxesScalers(props: ChartProps): Result<AxisScalers> {
  const chart: ChartData = props.data;
  const axisRanges: AxisRanges = useMemo(() => getRanges(props.dimensions), [props.dimensions]);
  const scalers: Result<AxisScalers> = useMemo(() => getAxisScalers(chart, axisRanges), [chart, axisRanges]);
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
