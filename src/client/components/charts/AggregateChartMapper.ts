import { DropZoneLocation, DropZoneValues, isHorizontal } from '../chartcreator/DragNDrop';
import { Axis, AxisDataType, AxisPosition, ChartData } from './common/Props';
import { DistributivePick, dupingZip, entries, Ok, Result } from 'shared/utils';
import { Column, ColumnId, ColumnType, DataFrame, resolveColumnId } from 'shared/DataFrame';
import { chain, either, filterOrElse } from 'fp-ts/es6/Either';
import { array } from 'fp-ts/es6/Array';
import { sequenceT } from 'fp-ts/es6/Apply';
import { pipe } from 'fp-ts/es6/pipeable';
import { tupled } from 'fp-ts/es6/function';

interface MappedAxes {
  xAxes: Axis[];
  yAxes: Axis[];
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

function mapColumnEntryToAxis(dataFrames: DataFrame[], [loc, colId]: ColumnEntry): Result<Axis> {
  const column: Result<Column> = resolveColumnId(dataFrames, colId);
  const mapColumn = (col: Column): Result<Axis> =>
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
  const mapArrays = (arrays: Result<Axis>[]): Result<Axis[]> => array.sequence(either)(arrays);

  const xAxes: Result<Axis[]> = mapArrays(
    columns
      .filter(([loc, colId]: ColumnEntry) => isHorizontal(loc))
      .map((col: ColumnEntry) => mapColumnEntryToAxis(dataFrames, col)),
  );
  const yAxes: Result<Axis[]> = mapArrays(
    columns
      .filter(([loc, colId]: ColumnEntry) => !isHorizontal(loc))
      .map((col: ColumnEntry) => mapColumnEntryToAxis(dataFrames, col)),
  );

  const mapAxes = (xAxes: Axis[], yAxes: Axis[]): Result<MappedAxes> => Ok({ xAxes, yAxes });

  // prettier-ignore
  return pipe(
    sequenceT(either)(xAxes, yAxes),
    chain(tupled(mapAxes)),
  );
}

export function mapDroppedColumns(
  dataFrames: DataFrame[],
  droppedColumns: DropZoneValues<ColumnId>,
): Result<ChartData[]> {
  const axes: Result<MappedAxes> = mapColumnsToAxes(dataFrames, droppedColumns);

  const mapDupedAxis = (axis: Axis): Axis => ({
    ...axis,
    position: AxisPosition.HIDDEN,
  });

  const mapToChartData = ({ xAxes, yAxes }: MappedAxes): Result<ChartData[]> =>
    Ok(
      dupingZip(xAxes, yAxes, mapDupedAxis, mapDupedAxis).map(([xAxis, yAxis]: [Axis, Axis]) => ({
        x: xAxis,
        y: yAxis,
      })),
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
