import { ChartProps, ChartType } from './common/Props';
import React, { useRef } from 'react';
import { AxesTransforms, AxisScalers } from './common/Axis';
import { genBarPoints, PointCoords, useSecondaryDateAxis } from './common/Generators';
import { useAxesScalers, useAxesTransforms } from './common/Hooks';
import { Result } from 'shared/utils';
import { sequenceT } from 'fp-ts/es6/Apply';
import { either, fold } from 'fp-ts/es6/Either';
import { getBandWidth } from './common/Scaler';

export function BarChart(props: ChartProps) {
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);
  const { width, height, margin } = props.dimensions;

  const barAxis: 'x' | 'y' = props.type === ChartType.BAR_HORIZONTAL ? 'y' : 'x';
  const useSecondaryAxis: boolean = useSecondaryDateAxis(props.data, barAxis);
  const barScalersR: Result<AxisScalers> = useAxesScalers(props);
  const scatterScalersR: Result<AxisScalers> = useAxesScalers({
    ...props,
    type: ChartType.SCATTER,
  });
  const transformsR: Result<AxesTransforms> = useAxesTransforms(
    xAxisRef,
    yAxisRef,
    props,
    useSecondaryAxis ? scatterScalersR : barScalersR,
  );
  const bandwidthR: Result<number> = getBandWidth(barScalersR, barAxis);
  const pointsR: Result<PointCoords> = genBarPoints(
    props.data,
    barAxis,
    barScalersR,
    scatterScalersR,
    bandwidthR,
    useSecondaryAxis,
  );
  const results: Result<[AxisScalers, AxisScalers, AxesTransforms, PointCoords, number]> = sequenceT(either)(
    barScalersR,
    scatterScalersR,
    transformsR,
    pointsR,
    bandwidthR,
  );

  return fold(
    (e: Error) => {
      throw e;
    },
    ([_, __, transforms, points, bandwidth]: [AxisScalers, AxisScalers, AxesTransforms, PointCoords, number]) => (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={xAxisRef} transform={transforms.x} />
          <g ref={yAxisRef} transform={transforms.y} />
          {points.map(([x, y]: [number, number], i: number) =>
            props.type === ChartType.BAR_VERTICAL ? (
              <rect key={i} x={x} y={y} height={height - margin.bottom - y} width={bandwidth} />
            ) : (
              <rect key={i} x={margin.left} y={y} width={x} height={bandwidth} />
            ),
          )}
        </g>
      </svg>
    ),
  )(results);
}
