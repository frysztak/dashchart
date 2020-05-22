import React from 'react';
import { Flex } from 'reflexbox/styled-components';
import { DropZoneBackground, DropZone } from './DropZone';
import { DragAndDropItemType, DropZoneLocation, DropZoneValues } from './DragNDrop';
import { LightText } from '../misc/LightText';
import { ColumnId } from 'shared/DataFrame';
import { useDrop } from 'react-dnd';
import { styled } from '../../config/Theme';

export interface ChartCreatorProps {
  isDragging?: boolean;
  activeDropZone?: DropZoneLocation;
  currentColumns: DropZoneValues<ColumnId>;
}

const RelativeFlex = styled(Flex)`
  position: relative;
`;

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
    <RelativeFlex minHeight={'100%'} minWidth={'100%'} ref={drop}>
      {isDragging || isOver || hasDroppedColumns ? (
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
    </RelativeFlex>
  );
}
