import React from 'react';
import { Flex } from 'reflexbox/styled-components';
import { DropZoneBackground, DropZone, DropZoneContainer } from './DropZone';
import { DragAndDropItemType, DropZoneLocation, DropZoneValues } from './DragNDrop';
import { LightText } from '../misc/LightText';
import { ColumnId } from 'shared/DataFrame';
import { useDrop } from 'react-dnd';

export interface ChartCreatorProps {
  isDragging?: boolean;
  activeDropZone?: DropZoneLocation;
  currentColumns: DropZoneValues<ColumnId>;
}

export function ChartCreator(props: ChartCreatorProps) {
  const { isDragging, activeDropZone, currentColumns } = props;
  const [{ isOver }, drop] = useDrop({
    accept: DragAndDropItemType.COLUMN,
    collect: mon => ({
      isOver: mon.isOver(),
    }),
  });
  const hasDroppedColumns = Object.entries(currentColumns).length > 0;

  return (
    <Flex height={'100%'} width={'100%'} alignItems={'center'} justifyContent={'center'} ref={drop}>
      {isDragging || isOver || hasDroppedColumns ? (
        <DropZoneContainer width={['100%', '75%', '65%']} height={['100%', '75%', '65%']}>
          <DropZoneBackground />
          <DropZone location={DropZoneLocation.TOP} activeDropZone={activeDropZone} currentColumns={currentColumns} />
          <DropZone location={DropZoneLocation.RIGHT} activeDropZone={activeDropZone} currentColumns={currentColumns} />
          <DropZone
            location={DropZoneLocation.BOTTOM}
            activeDropZone={activeDropZone}
            currentColumns={currentColumns}
          />
          <DropZone location={DropZoneLocation.LEFT} activeDropZone={activeDropZone} currentColumns={currentColumns} />
        </DropZoneContainer>
      ) : (
        <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <LightText fontSize={4}>Drag Data Frame columns here</LightText>
        </Flex>
      )}
    </Flex>
  );
}
