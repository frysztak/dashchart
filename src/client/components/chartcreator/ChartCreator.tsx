import React from 'react';
import { Flex } from 'reflexbox';
import { DropZoneH, DropZoneV } from './DropZone';

export interface ChartCreatorProps {
  isDragging: boolean;
}

export function ChartCreator(props: ChartCreatorProps) {
  return (
    <Flex minHeight={'100%'} minWidth={'100%'}>
      {props.isDragging ? (
        <>
          <DropZoneH top />
          <DropZoneH bottom />
          <DropZoneV left />
          <DropZoneV right />
        </>
      ) : (
        <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <h2>Drag Data Frame columns here</h2>
        </Flex>
      )}
    </Flex>
  );
}
