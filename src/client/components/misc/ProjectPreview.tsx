import React from 'react';
import { Project, ProjectStats } from '../../store/project';
import { PreviewCard } from './PreviewCard';
import { Flex } from 'reflexbox';
import { Text } from 'rebass';
import { LightText } from './LightText';
import { formatDistance } from 'date-fns';
import { quantify } from 'shared/utils';
import { IOStatus } from '../../store/common';
import { ThreeBounce } from 'styled-spinkit';
import { Icon } from './Icon';
import { ErrorCircle } from '@styled-icons/boxicons-regular';
import { styled } from '../../config/Theme';

export type ProjectPreviewProps = {
  project: Project;
  stats: ProjectStats | undefined;
  onClick: () => void;
};

const ErrorIcon = Icon(ErrorCircle);
const StyledLoader = styled(ThreeBounce)`
  margin-top: 0;
  margin-bottom: 0;
`;

export function ProjectPreview(props: ProjectPreviewProps) {
  const { project, stats, onClick } = props;

  const body = () => {
    if (!stats) {
      return null;
    }
    switch (stats.status) {
      case IOStatus.OK:
        return (
          <Flex flexDirection={'column'} height={'100%'} justifyContent={'center'}>
            <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'flex-end'} flexGrow={1}>
              <Text fontSize={4}>{quantify('Data Frame', stats.values.dataFrameCount)}</Text>
              <Text fontSize={4} mt={2}>
                {quantify('Chart', stats.values.chartCount)}
              </Text>
            </Flex>

            <Flex alignItems={'flex-end'} justifyContent={'flex-end'} flexGrow={1} width={'100%'}>
              <LightText fontSize={1} m={1}>
                Last edited {formatDistance(new Date(project.updatedAt), Date.now())} ago
              </LightText>
            </Flex>
          </Flex>
        );
      case IOStatus.LOADING:
        return <StyledLoader size={56} />;
      case IOStatus.ERROR:
        return (
          <Flex justifyContent={'center'} alignItems={'center'}>
            <ErrorIcon size={44} color={'red'} />
            <LightText fontSize={3} m={2}>
              Stats error
            </LightText>
          </Flex>
        );
    }
  };

  return (
    <PreviewCard title={project.name} onClick={onClick}>
      <Flex flexDirection={'column'} height={'100%'} justifyContent={'center'}>
        {body()}
      </Flex>
    </PreviewCard>
  );
}
