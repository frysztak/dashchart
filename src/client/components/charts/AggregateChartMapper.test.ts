import { applyUserProps, mapDroppedColumns } from './AggregateChartMapper';
import { isLeft, isRight } from 'fp-ts/es6/Either';
import { DropZoneLocation } from '../chartcreator/DragNDrop';
import { ColumnType, DataFrame } from 'shared/DataFrame';
import {
  AxisDataType,
  AxisPosition,
  AxisScale,
  ChartData,
  ChartDimensions,
  ChartProps,
  ChartType,
  UserEditableChartProps,
  PositionalChartData,
} from './common/Props';
import { Ok, Result, takeRight } from 'shared/utils';
import { DefaultAxisStyle, DefaultChartProps } from './common/Defaults';

describe('AggregateChartMapper', () => {
  describe('mapDroppedColumns', () => {
    const frame: DataFrame = {
      id: 1,
      name: 'My DF',
      columns: {
        id: {
          type: ColumnType.STRING,
          values: ['1', '2', '3', '4', '5'],
        },
        first_name: {
          type: ColumnType.STRING,
          values: ['Prentiss', 'Bessie', 'Tybi', 'Felix', 'Gay'],
        },
        last_name: {
          type: ColumnType.STRING,
          values: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee'],
        },
        email: {
          type: ColumnType.STRING,
          values: [
            'ppassey0@amazonaws.com',
            'bdocker1@pagesperso-orange.fr',
            'tfantini2@reference.com',
            'ffreak3@google.nl',
            'gcutchee4@ifeng.com',
          ],
        },
        numbers: {
          type: ColumnType.NUMBER,
          values: [10, 20, 30, 40, 50],
        },
      },
    };

    it('fails with zero columns', () => {
      const result: Result<PositionalChartData[]> = mapDroppedColumns([frame], {});
      expect(isLeft(result)).toEqual(true);
    });

    it('fails with zero X axes', () => {
      const result: Result<PositionalChartData[]> = mapDroppedColumns([frame], {
        [DropZoneLocation.LEFT]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'col1',
        },
      });
      expect(isLeft(result)).toEqual(true);
    });

    it('fails with zero Y axes', () => {
      const result: Result<PositionalChartData[]> = mapDroppedColumns([frame], {
        [DropZoneLocation.BOTTOM]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'col1',
        },
      });
      expect(isLeft(result)).toEqual(true);
    });

    it('works with simple XY chart', () => {
      const result: Result<PositionalChartData[]> = mapDroppedColumns([frame], {
        [DropZoneLocation.BOTTOM]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'id',
        },
        [DropZoneLocation.LEFT]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'numbers',
        },
      });

      expect(isRight(result)).toEqual(true);
      const chartData: PositionalChartData[] = takeRight(result);
      expect(chartData.length).toEqual(1);
      expect(chartData[0]).toEqual(<ChartData>{
        x: {
          dataType: AxisDataType.STRING,
          data: ['1', '2', '3', '4', '5'],
          position: AxisPosition.PRIMARY,
        },
        y: {
          dataType: AxisDataType.NUMBER,
          data: [10, 20, 30, 40, 50],
          position: AxisPosition.PRIMARY,
        },
      });
    });

    it('works with XYY chart', () => {
      const result: Result<PositionalChartData[]> = mapDroppedColumns([frame], {
        [DropZoneLocation.BOTTOM]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'id',
        },
        [DropZoneLocation.LEFT]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'numbers',
        },
        [DropZoneLocation.RIGHT]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'last_name',
        },
      });

      expect(isRight(result)).toEqual(true);
      const chartData: PositionalChartData[] = takeRight(result);
      expect(chartData.length).toEqual(2);
      expect(chartData[0]).toEqual(<ChartData>{
        x: {
          dataType: AxisDataType.STRING,
          data: ['1', '2', '3', '4', '5'],
          position: AxisPosition.PRIMARY,
        },
        y: {
          dataType: AxisDataType.NUMBER,
          data: [10, 20, 30, 40, 50],
          position: AxisPosition.PRIMARY,
        },
      });
      expect(chartData[1]).toEqual(<ChartData>{
        x: {
          dataType: AxisDataType.STRING,
          data: ['1', '2', '3', '4', '5'],
          position: AxisPosition.HIDDEN,
        },
        y: {
          dataType: AxisDataType.STRING,
          data: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee'],
          position: AxisPosition.SECONDARY,
        },
      });
    });

    it('works with XXY chart', () => {
      const result: Result<PositionalChartData[]> = mapDroppedColumns([frame], {
        [DropZoneLocation.BOTTOM]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'id',
        },
        [DropZoneLocation.LEFT]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'numbers',
        },
        [DropZoneLocation.TOP]: {
          dataFrameId: 1,
          dataFrameName: 'My DF',
          columnName: 'last_name',
        },
      });

      expect(isRight(result)).toEqual(true);
      const chartData: PositionalChartData[] = takeRight(result);
      expect(chartData.length).toEqual(2);
      expect(chartData[0]).toEqual(<ChartData>{
        x: {
          dataType: AxisDataType.STRING,
          data: ['1', '2', '3', '4', '5'],
          position: AxisPosition.PRIMARY,
        },
        y: {
          dataType: AxisDataType.NUMBER,
          data: [10, 20, 30, 40, 50],
          position: AxisPosition.PRIMARY,
        },
      });
      expect(chartData[1]).toEqual(<ChartData>{
        x: {
          dataType: AxisDataType.STRING,
          data: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee'],
          position: AxisPosition.SECONDARY,
        },
        y: {
          dataType: AxisDataType.NUMBER,
          data: [10, 20, 30, 40, 50],
          position: AxisPosition.HIDDEN,
        },
      });
    });
  });

  describe('applyUserProps', () => {
    it('fails with mismatched array lengths', () => {
      const result = applyUserProps(Ok([]), [{} as UserEditableChartProps]);
      expect(isLeft(result)).toEqual(true);
    });

    it('applies type, dimensions and style', () => {
      const chartData: PositionalChartData[] = [
        {
          x: {
            dataType: AxisDataType.STRING,
            data: ['1', '2', '3', '4', '5'],
            position: AxisPosition.PRIMARY,
          },
          y: {
            dataType: AxisDataType.NUMBER,
            data: [10, 20, 30, 40, 50],
            position: AxisPosition.PRIMARY,
          },
        },
      ];

      const dimensions: ChartDimensions = {
        height: 400,
        width: 300,
        margin: {
          top: 20,
          left: 30,
          right: 40,
          bottom: 50,
        },
      };

      const userProps: UserEditableChartProps[] = [
        {
          ...DefaultChartProps,
          dimensions: dimensions,
          type: ChartType.SCATTER,
          data: {
            x: { scale: AxisScale.LINEAR, style: { ...DefaultAxisStyle, tickSize: 5 } },
            y: { scale: AxisScale.LOG, style: DefaultAxisStyle },
          },
        },
      ];

      const result = applyUserProps(Ok(chartData), userProps);
      expect(isRight(result)).toEqual(true);
      const r: ChartProps[] = takeRight(result);
      expect(r.length).toEqual(1);
      expect(r[0].type).toEqual(ChartType.SCATTER);
      expect(r[0].dimensions).toEqual(dimensions);

      // properties from ChartData[]
      expect({
        dataType: r[0].data.x.dataType,
        data: r[0].data.x.data,
        position: r[0].data.x.position,
      }).toEqual(chartData[0].x);
      expect({
        dataType: r[0].data.y.dataType,
        data: r[0].data.y.data,
        position: r[0].data.y.position,
      }).toEqual(chartData[0].y);

      // properties from chart style
      expect({
        scale: r[0].data.x.scale,
        style: r[0].data.x.style,
      }).toEqual(userProps[0].data.x);
    });
  });
});
