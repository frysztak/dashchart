import React, { ReactElement } from 'react';
import { styled } from '../../config/Theme';
import { BottomBoxShadow, RightBoxShadow } from '../misc/BoxShadow';
import { LightText } from '../misc/LightText';
import { Flex } from 'reflexbox';
import { ChartState, Project } from '../../store/project';
import { AggregateChart } from './AggregateChart';
import { AxisPosition, ChartProps } from './common/Props';
import produce from 'immer';
import { Ok } from 'shared/utils';
import { synchroniseAndApplyUserProps } from './AggregateChartMapper';
import { chain, fold, map } from 'fp-ts/es6/Either';
import { ErrorMessage } from '../misc/ErrorMessage';
import { DataFrame } from 'shared/DataFrame';
import { useDataFrames, useProject } from '../../store/selectors';
import { pipe } from 'fp-ts/es6/pipeable';
import { Text } from 'rebass';

const width = 350;
const height = 200;
const nbsp = '\u00A0';

const Background = styled.div`
  width: ${width}px;
  height: ${height}px;
  background-color: ${p => p.theme.colors.almostWhite};
  border: 1px ${p => p.theme.colors.lightGrey} solid;
  border-radius: 8px;
  cursor: pointer;
`;

function Base({ children, title, onClick }: { children: ReactElement; title: string; onClick?: () => void }) {
  return (
    <Flex flexDirection={'column'} onClick={onClick}>
      <Text fontSize={3} marginBottom={2} marginLeft={4}>
        {title || nbsp}
      </Text>
      <Background>
        <BottomBoxShadow>
          <RightBoxShadow>{children}</RightBoxShadow>
        </BottomBoxShadow>
      </Background>
    </Flex>
  );
}

interface BaseProps {
  onClick: () => void;
}

export type CreateNewChartProps = BaseProps;

export function CreateNewChart(props: CreateNewChartProps) {
  return (
    <Base title={''}>
      <Flex justifyContent={'center'} height={'100%'} alignItems={'center'} onClick={props.onClick}>
        <LightText fontSize={3}>Create new chart...</LightText>
      </Flex>
    </Base>
  );
}

export type ChartPreviewProps = ChartState & {
  projectId: number;
  onClick: () => void;
};

export function ChartPreview(props: ChartPreviewProps) {
  const project: Project | null = useProject(props.projectId);
  const dataFrames: DataFrame[] = useDataFrames(project);

  const mappedChartProps = pipe(
    synchroniseAndApplyUserProps(dataFrames, props.columns, props.userProps),
    chain(([_, chartProps]) => Ok(chartProps)),
    map((p: ChartProps[]) =>
      p.map(chartProp =>
        produce(chartProp, draft => {
          draft.data.x.position = AxisPosition.HIDDEN;
          draft.data.y.position = AxisPosition.HIDDEN;
          draft.dimensions = {
            width,
            height,
            margin: {
              top: 8,
              right: 16,
              bottom: 16,
              left: 8,
            },
          };
        }),
      ),
    ),
  );
  return fold(
    (e: Error) => <ErrorMessage message={e.message} />,
    (chartProps: ChartProps[]) => (
      <Base title={props.name} onClick={props.onClick}>
        <AggregateChart chartProps={chartProps} />
      </Base>
    ),
  )(mappedChartProps);
}
