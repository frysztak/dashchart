import React from 'react';
import { Flex } from 'reflexbox/styled-components';
import { DropZoneBackground, DropZone } from './DropZone';
import { DropZoneLocation, DropZoneValues } from './DragNDrop';
import { LightText } from '../LightText';
import { ColumnId } from 'shared/DataFrame';

export interface ChartCreatorProps {
  isDragging: boolean;
  activeDropZone?: DropZoneLocation;
  currentColumns: DropZoneValues<ColumnId>;
}

export function ChartCreator(props: ChartCreatorProps) {
  const { isDragging, activeDropZone, currentColumns } = props;

  return (
    <Flex minHeight={'100%'} minWidth={'100%'}>
      {isDragging ? (
        <>
          <DropZoneBackground />
          <DropZone location={DropZoneLocation.TOP} activeDropZone={activeDropZone} currentColumns={currentColumns} />
          <DropZone location={DropZoneLocation.RIGHT} activeDropZone={activeDropZone} currentColumns={currentColumns} />
          <DropZone
            location={DropZoneLocation.BOTTOM}
            activeDropZone={activeDropZone}
            currentColumns={currentColumns}
          />
          <DropZone location={DropZoneLocation.LEFT} activeDropZone={activeDropZone} currentColumns={currentColumns} />
        </>
      ) : (
        <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <LightText fontSize={4}>Drag Data Frame columns here</LightText>
        </Flex>
      )}
    </Flex>
  );
}
