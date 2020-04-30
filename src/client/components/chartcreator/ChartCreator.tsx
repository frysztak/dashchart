import React from 'react';
import { Flex } from 'reflexbox';
import { DropZoneH, DropZoneV, DropZoneBackground } from './DropZone';

export enum ActiveDropZone {
  NONE = 'NONE',
  LEFT = 'LEFT',
  TOP = 'TOP',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
}

export interface ChartCreatorProps {
  isDragging: boolean;
  activeDropZone: ActiveDropZone;
}

export function ChartCreator(props: ChartCreatorProps) {
  const { isDragging, activeDropZone } = props;

  return (
    <Flex minHeight={'100%'} minWidth={'100%'}>
      {isDragging ? (
        <>
          <DropZoneBackground />
          <DropZoneH top active={activeDropZone === ActiveDropZone.TOP} />
          <DropZoneH bottom active={activeDropZone === ActiveDropZone.BOTTOM} />
          <DropZoneV left active={activeDropZone === ActiveDropZone.LEFT} />
          <DropZoneV right active={activeDropZone === ActiveDropZone.RIGHT} />
        </>
      ) : (
        <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <h2>Drag Data Frame columns here</h2>
        </Flex>
      )}
    </Flex>
  );
}
