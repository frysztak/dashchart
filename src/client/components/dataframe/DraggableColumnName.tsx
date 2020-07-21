import { Flex, Text } from 'rebass';
import { Circle } from '@styled-icons/boxicons-solid';
import React from 'react';
import { Column, mapColumnType } from 'shared/DataFrame';
import { ColumnType } from 'shared/DataFrame/index';
import { useDrag } from 'react-dnd';
import { DragAndDropItemType } from '../chartcreator/DragNDrop';
import { DraggedColumn } from '../chartcreator/DropZone';

export interface DraggableColumnNameProps {
  columnName: string;
  dataFrameId: number;
  dataFrameName: string;
  column: Column;
}

export function DraggableColumnName(props: DraggableColumnNameProps) {
  const { columnName, dataFrameId, dataFrameName, column } = props;

  const [, drag] = useDrag({
    item: {
      type: DragAndDropItemType.COLUMN,
      dataFrameId: dataFrameId,
      dataFrameName: dataFrameName,
      columnName: columnName,
    } as DraggedColumn,
  });

  return (
    <Flex mt={2}>
      <Flex size={20} justifyContent={'center'} alignItems={'center'}>
        <Circle size={8} />
      </Flex>
      <Text ml={2} ref={drag} css={{ cursor: 'move', userSelect: 'none' }}>
        {columnName} :: {mapColumnType(column.type)}
      </Text>
    </Flex>
  );
}
