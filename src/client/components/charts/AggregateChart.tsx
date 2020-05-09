import { DropZoneValues } from '../chartcreator/DragNDrop';
import { ChartData, ChartProps, ChartType } from './common/Props';
import { ColumnId, DataFrame } from 'shared/DataFrame';
import { Result } from 'shared/utils';
import { mapDroppedColumns } from './AggregateChartMapper';
import { fold } from 'fp-ts/es6/Either';
import React from 'react';
import { Chart } from './Chart';
import { styled } from '../../config/Theme';

export interface AggregateChartProps {
  dataFrames: DataFrame[];
  droppedColumns: DropZoneValues<ColumnId>;
  chartProps?: ChartProps;
}

const Wrapper = styled.div`
  display: grid;
`;

interface CellProps {
  column: number;
  row: number;
}

const Cell = styled.div<CellProps>`
  grid-column: ${p => p.column};
  grid-row: ${p => p.row};
`;

export function AggregateChart(props: AggregateChartProps) {
  const chartDataR: Result<ChartData[]> = mapDroppedColumns(props.dataFrames, props.droppedColumns);
  const dimensions = {
    height: 600,
    width: 800,
    margin: {
      top: 20,
      right: 80,
      bottom: 40,
      left: 20,
    },
  };

  return fold(
    (e: Error) => <div>{e.message}</div>,
    (chartData: ChartData[]) => (
      <Wrapper>
        {chartData.map((data: ChartData, idx: number) => (
          <Cell column={1} row={1}>
            <Chart dimensions={dimensions} type={ChartType.LINE} data={data} key={idx} />
          </Cell>
        ))}
      </Wrapper>
    ),
  )(chartDataR);
}
