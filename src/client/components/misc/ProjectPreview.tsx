import React from 'react';
import { Project } from '../../store/project';
import { PreviewCard } from './PreviewCard';
import { Flex } from 'reflexbox';
import { Text } from 'rebass';
import { LightText } from './LightText';
import { formatDistance } from 'date-fns';
import { quantify } from 'shared/utils/Quantify';

export type ProjectPreviewProps = {
  project: Project;
  onClick: () => void;
};

export function ProjectPreview(props: ProjectPreviewProps) {
  const { project, onClick } = props;

  return (
    <PreviewCard title={project.name} onClick={onClick}>
      <Flex flexDirection={'column'} height={'100%'}>
        <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'end'} flexGrow={1}>
          <Text fontSize={4}>{quantify('Data Frame', Object.keys(project.dataFrames.data).length)}</Text>
          <Text fontSize={4} mt={2}>
            {quantify('Chart', Object.keys(project.charts.data).length)}
          </Text>
        </Flex>

        <Flex alignItems={'end'} justifyContent={'end'} flexGrow={1} width={'100%'}>
          <LightText fontSize={1} mt={2}>
            Last edited {formatDistance(new Date(project.updatedAt), Date.now())} ago
          </LightText>
        </Flex>
      </Flex>
    </PreviewCard>
  );
}
