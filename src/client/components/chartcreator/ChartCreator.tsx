import React from 'react';
import { Flex } from 'reflexbox/styled-components';
import { DropZoneBackground, DropZone } from './DropZone';
import { Dictionary } from 'shared/utils/Dictionary';
import { DraggedColumnData } from './DragNDrop';

export enum DropZoneLocation {
  LEFT = 'LEFT',
  TOP = 'TOP',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
}

export function isHorizontal(location: DropZoneLocation): boolean {
  return location === DropZoneLocation.TOP || location === DropZoneLocation.BOTTOM;
}

export interface ChartCreatorProps {
  isDragging: boolean;
  activeDropZone?: DropZoneLocation;
  currentColumns: Dictionary<DraggedColumnData>;
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
          <h2>Drag Data Frame columns here</h2>
        </Flex>
      )}
    </Flex>
  );
}
