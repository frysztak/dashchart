import React from 'react';
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
import { PreviewCard } from '../misc/PreviewCard';
import { Theme, useTheme } from '../../config/Theme';

export type ChartPreviewProps = ChartState & {
  projectId: number;
  onClick: () => void;
};

export function ChartPreview(props: ChartPreviewProps) {
  const project: Project | null = useProject(props.projectId);
  const dataFrames: DataFrame[] = useDataFrames(project);
  const theme: Theme = useTheme();

  const mappedChartProps = pipe(
    synchroniseAndApplyUserProps(dataFrames, props.columns, props.userProps),
    chain(([_, chartProps]) => Ok(chartProps)),
    map((p: ChartProps[]) =>
      p.map(chartProp =>
        produce(chartProp, draft => {
          draft.data.x.position = AxisPosition.HIDDEN;
          draft.data.y.position = AxisPosition.HIDDEN;
          draft.dimensions = {
            width: theme.previewCard.width,
            height: theme.previewCard.height,
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
      <PreviewCard title={props.name} onClick={props.onClick}>
        <AggregateChart chartProps={chartProps} />
      </PreviewCard>
    ),
  )(mappedChartProps);
}
