import { ChartProps } from './common/Props';
import React from 'react';
import { Chart } from './Chart';
import { styled } from '../../config/Theme';

export interface AggregateChartProps {
  chartProps: ChartProps[];
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
  const { chartProps } = props;

  return (
    <Wrapper>
      {chartProps.map((data: ChartProps, idx: number) => (
        <Cell column={1} row={1}>
          <Chart {...data} key={idx} />
        </Cell>
      ))}
    </Wrapper>
  );
}
