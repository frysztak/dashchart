import { DropZoneLocation, DropZoneValues, isHorizontal } from '../chartcreator/DragNDrop';
import {
  Axis,
  AxisDataType,
  AxisPosition,
  ChartDimensions,
  ChartProps,
  PositionalAxisData,
  PositionalChartData,
  UserEditableChartProps,
} from './common/Props';
import { DistributivePick, dupingZip, entries, Ok, Result, zip } from 'shared/utils';
import { Column, ColumnId, ColumnType, DataFrame, resolveColumnId } from 'shared/DataFrame';
import { chain, either, filterOrElse } from 'fp-ts/es6/Either';
import { array } from 'fp-ts/es6/Array';
import { sequenceT } from 'fp-ts/es6/Apply';
import { pipe } from 'fp-ts/es6/pipeable';
import { tupled } from 'fp-ts/es6/function';
import { DefaultChartProps } from './common/Defaults';
import { getColour } from './ColourScheme';

interface MappedAxes {
  xAxes: PositionalAxisData[];
  yAxes: PositionalAxisData[];
}

type ColumnEntry = [DropZoneLocation, ColumnId];

function mapColumnValues(column: Column): DistributivePick<Axis, 'dataType' | 'data'> {
  switch (column.type) {
    case ColumnType.NUMBER:
      return {
        dataType: AxisDataType.NUMBER,
        data: column.values,
      };
    case ColumnType.STRING:
      return {
        dataType: AxisDataType.STRING,
        data: column.values,
      };
  }
}

function mapColumnEntryToAxis(dataFrames: DataFrame[], [loc, colId]: ColumnEntry): Result<PositionalAxisData> {
  const column: Result<Column> = resolveColumnId(dataFrames, colId);
  const mapColumn = (col: Column): Result<PositionalAxisData> =>
    Ok({
      position:
        loc === DropZoneLocation.BOTTOM || loc === DropZoneLocation.LEFT
          ? AxisPosition.PRIMARY
          : AxisPosition.SECONDARY,
      ...mapColumnValues(col)!,
    });

  // prettier-ignore
  return pipe(
    column,
    chain(mapColumn),
  );
}

function mapColumnsToAxes(dataFrames: DataFrame[], droppedColumns: DropZoneValues<ColumnId>): Result<MappedAxes> {
  const columns: ColumnEntry[] = entries(droppedColumns);
  const mapArrays = (arrays: Result<PositionalAxisData>[]): Result<PositionalAxisData[]> =>
    array.sequence(either)(arrays);

  const xAxes: Result<PositionalAxisData[]> = mapArrays(
    columns
      .filter(([loc, colId]: ColumnEntry) => isHorizontal(loc))
      .map((col: ColumnEntry) => mapColumnEntryToAxis(dataFrames, col)),
  );
  const yAxes: Result<PositionalAxisData[]> = mapArrays(
    columns
      .filter(([loc, colId]: ColumnEntry) => !isHorizontal(loc))
      .map((col: ColumnEntry) => mapColumnEntryToAxis(dataFrames, col)),
  );

  const mapAxes = (xAxes: PositionalAxisData[], yAxes: PositionalAxisData[]): Result<MappedAxes> =>
    Ok({ xAxes, yAxes });

  // prettier-ignore
  return pipe(
    sequenceT(either)(xAxes, yAxes),
    chain(tupled(mapAxes)),
  );
}

export function mapDroppedColumns(
  dataFrames: DataFrame[],
  droppedColumns: DropZoneValues<ColumnId>,
): Result<PositionalChartData[]> {
  const axes: Result<MappedAxes> = mapColumnsToAxes(dataFrames, droppedColumns);

  const mapDupedAxis = (axis: PositionalAxisData): PositionalAxisData => ({
    ...axis,
    position: AxisPosition.HIDDEN,
  });

  const mapToChartData = ({ xAxes, yAxes }: MappedAxes): Result<PositionalChartData[]> =>
    Ok(
      dupingZip(xAxes, yAxes, mapDupedAxis, mapDupedAxis).map(
        ([xAxis, yAxis]: [PositionalAxisData, PositionalAxisData]) => ({
          x: xAxis,
          y: yAxis,
        }),
      ),
    );

  return pipe(
    axes,
    filterOrElse(
      ({ xAxes, yAxes }: MappedAxes): boolean => xAxes.length > 0,
      _ => new Error('There must be at least one X axis.'),
    ),
    filterOrElse(
      ({ xAxes, yAxes }: MappedAxes): boolean => yAxes.length > 0,
      _ => new Error('There must be at least one Y axis.'),
    ),
    chain(mapToChartData),
  );
}

export function applyUserProps(
  chartDataR: Result<PositionalChartData[]>,
  chartProps: UserEditableChartProps[],
): Result<ChartProps[]> {
  const mapToChartProps = (dimensions: ChartDimensions) => (chartData: PositionalChartData[]): Result<ChartProps[]> =>
    Ok(
      zip(chartData, chartProps).map(
        ([data, userProps]: [PositionalChartData, UserEditableChartProps], index: number): ChartProps =>
          <ChartProps>{
            ...userProps,
            dimensions: dimensions,
            colour: getColour(userProps.colourScheme, index),
            data: {
              x: {
                ...userProps.data.x,
                ...data.x,
              },
              y: {
                ...userProps.data.y,
                ...data.y,
              },
            },
          },
      ),
    );

  const dimensions: ChartDimensions = chartProps.length ? chartProps[0].dimensions : DefaultChartProps.dimensions;

  return pipe(
    chartDataR,
    filterOrElse(
      (chartData: PositionalChartData[]) => chartData.length === chartProps.length,
      _ => new Error(`Axis data has different length than chart props`),
    ),
    chain(mapToChartProps(dimensions)),
  );
}

export const synchroniseUserProps = (userProps: UserEditableChartProps[]) => (
  chartData: PositionalChartData[],
): UserEditableChartProps[] => {
  const n: number = chartData.length - userProps.length;
  if (n > 0) {
    const colourScheme = userProps.length ? userProps[0].colourScheme : DefaultChartProps.colourScheme;
    return [...userProps, ...Array(n).fill({ ...DefaultChartProps, colourScheme })];
  }
  if (n < 0) {
    return userProps.slice(0, chartData.length);
  }
  return userProps;
};

export function synchroniseAndApplyUserProps(
  dataFrames: DataFrame[],
  columns: DropZoneValues<ColumnId>,
  userProps: UserEditableChartProps[],
): Result<[UserEditableChartProps[], ChartProps[]]> {
  const positionalChartDataR: Result<PositionalChartData[]> = mapDroppedColumns(dataFrames, columns);
  return pipe(
    positionalChartDataR,
    chain((positionalChartData: PositionalChartData[]) => {
      const newUserProps: UserEditableChartProps[] = synchroniseUserProps(userProps)(positionalChartData);
      const chartProps: Result<ChartProps[]> = applyUserProps(positionalChartDataR, newUserProps);
      return sequenceT(either)(Ok(newUserProps), chartProps);
    }),
  );
}
