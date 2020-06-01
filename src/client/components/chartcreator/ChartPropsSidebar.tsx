import { Sidebar } from '../misc/Sidebar';
import { Box, Flex } from 'reflexbox';
import { LightText } from '../misc/LightText';
import React from 'react';
import { ChartDimensions, ChartMargin, UserEditableChartProps } from '../charts/common/Props';
import { PropsEditor } from './PropsEditor/PropsEditor';
import { DimensionsEditor } from './PropsEditor/DimensionsEditor';
import { MarginsEditor } from './PropsEditor/MarginEditor';
import produce, { Draft } from 'immer';
import { styled } from '../../config/Theme';

export interface PropsSidebarProps {
  chartProps: UserEditableChartProps[];
  updateProps: (newProps: UserEditableChartProps, idx: number) => void;
}

const Spacer = styled.div`
  height: 50px;
  width: 100%;
`;

export function ChartPropsSidebar(props: PropsSidebarProps) {
  const { chartProps, updateProps } = props;
  const onUpdateProps = (idx: number) => (newProps: UserEditableChartProps) => updateProps(newProps, idx);

  const updateEachChart = <T,>(mapper: (draft: Draft<UserEditableChartProps>, value: T) => UserEditableChartProps) => (
    newValue: T,
  ) => {
    chartProps.forEach((p: UserEditableChartProps, index: number) => {
      const newProps: UserEditableChartProps = mapper(p, newValue);
      updateProps(newProps, index);
    });
  };
  const onUpdateDimensions = updateEachChart(
    produce((prop: UserEditableChartProps, dim: ChartDimensions) => {
      prop.dimensions = dim;
    }),
  );
  const onUpdateMargins = updateEachChart(
    produce((prop: UserEditableChartProps, margin: ChartMargin) => {
      prop.dimensions.margin = margin;
    }),
  );

  return (
    <Sidebar bgColor={'palePink'}>
      <Flex flexDirection={'column'} pt={2}>
        <Flex justifyContent={'center'} mb={4}>
          <LightText fontSize={4}>Chart Props</LightText>
        </Flex>

        <Box mx={2}>
          {chartProps.length ? (
            <>
              <DimensionsEditor dimensions={chartProps[0].dimensions} updateDimensions={onUpdateDimensions} />
              <MarginsEditor margins={chartProps[0].dimensions.margin} updateMargins={onUpdateMargins} />
              {chartProps.map((chartProps: UserEditableChartProps, idx: number) => (
                <PropsEditor
                  key={idx}
                  chartName={`Chart #${idx + 1}`}
                  chartProps={chartProps}
                  updateProps={onUpdateProps(idx)}
                />
              ))}
              <Spacer />
            </>
          ) : (
            <LightText fontSize={3} textAlign={'center'}>
              No charts were added yet.
            </LightText>
          )}
        </Box>
      </Flex>
    </Sidebar>
  );
}
