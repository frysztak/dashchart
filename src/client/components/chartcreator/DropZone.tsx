import { keyframes } from 'styled-components';
import { styled } from '../../config/Theme';
import { DragAndDropItemType, DropZoneLocation, DropZoneValues, isHorizontal } from './DragNDrop';
import { Box, Flex } from 'reflexbox/styled-components';
import React from 'react';
import { Table } from '@styled-icons/boxicons-regular';
import { Icon } from '../misc/Icon';
import { LightText } from '../misc/LightText';
import { ColumnId, formatColumnData } from 'shared/DataFrame';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { dropColumn } from '../../store/chartCreator';

const opacity = keyframes`
  from {
  opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

type StyledDropZoneProps = DropZoneProps & {
  active: boolean;
};

export const DropZoneContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
`;

const DropZoneCommon = styled(Flex)`
  border-radius: ${props => props.theme.dropZone.borderRadius};
  animation: ${opacity} ${props => props.theme.dropZone.animTime} ease-out;
  transition: background-color ${props => props.theme.dropZone.animTime} ease-out;
`;

const StyledDropZone = styled(DropZoneCommon)<StyledDropZoneProps>`
  grid-column: ${p => (isHorizontal(p.location) ? '3/11' : p.location === DropZoneLocation.LEFT ? 2 : 11)};
  grid-row: ${p => (isHorizontal(p.location) ? (p.location === DropZoneLocation.TOP ? 2 : 11) : '4/10')};
  width: ${p => (isHorizontal(p.location) ? '' : p.theme.dropZone.height)};
  height: ${p => (isHorizontal(p.location) ? p.theme.dropZone.height : '')};
  background-color: ${props => (props.active ? props.theme.colors.darkPink : props.theme.colors.pink)};
  align-self: ${p => (p.location === DropZoneLocation.BOTTOM ? 'end' : '')};
  justify-self: ${p => (p.location === DropZoneLocation.RIGHT ? 'end' : '')};
`;

export const DropZoneBackground = styled(DropZoneCommon)`
  grid-column: 1/13;
  grid-row: 1/13;
  background-color: ${props => props.theme.colors.palePink};
`;

const ColumnNameContainer = styled(Flex)<{ location: DropZoneLocation }>`
  height: ${props => (isHorizontal(props.location) ? props.theme.dropZone.height : '')};
  width: ${props => (isHorizontal(props.location) ? '' : props.theme.dropZone.height)};
  writing-mode: ${props => (isHorizontal(props.location) ? '' : 'vertical-lr')};
`;

export interface DropZoneProps {
  location: DropZoneLocation;
  activeDropZone?: DropZoneLocation;
  currentColumns?: DropZoneValues<ColumnId>;
}

const TableIcon = Icon(Table);

const MoveFlex = styled(Flex)`
  cursor: move;
`;

const NoSelectLightText = styled(LightText)`
  user-select: none;
`;

function ColumnName(props: DropZoneProps) {
  const { activeDropZone, currentColumns, location } = props;
  const formattedColumnName: string = formatColumnData(currentColumns ? currentColumns[location] : undefined);

  const column: ColumnId | undefined = currentColumns ? currentColumns[location] : undefined;
  const [, drag] = useDrag({
    item: {
      type: DragAndDropItemType.COLUMN,
      dataFrameName: column?.dataFrameName,
      columnName: column?.columnName,
      fromLocation: location,
    } as DraggedColumn,
  });

  if (!formattedColumnName) {
    return null;
  }

  const horizontal: boolean = isHorizontal(location);
  return (
    <ColumnNameContainer location={location} justifyContent={'center'} alignItems={'center'} flexGrow={1}>
      <MoveFlex ref={drag}>
        <TableIcon size={16} rotated={!horizontal} />
        <NoSelectLightText ml={horizontal ? 2 : 0} mt={horizontal ? 0 : 2}>
          {formattedColumnName}
        </NoSelectLightText>
      </MoveFlex>
    </ColumnNameContainer>
  );
}

export interface DraggedColumn {
  type: DragAndDropItemType;
  columnName: string;
  dataFrameName: string;
  fromLocation?: DropZoneLocation;
}

export type DroppedColumn = Omit<DraggedColumn, 'type'> & { toLocation: DropZoneLocation };

export function DropZone(props: DropZoneProps) {
  const { activeDropZone, currentColumns, location } = props;
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: DragAndDropItemType.COLUMN,
    drop: (item: DraggedColumn) => {
      dispatch(
        dropColumn({
          columnName: item.columnName,
          dataFrameName: item.dataFrameName,
          fromLocation: item.fromLocation,
          toLocation: location,
        }),
      );
    },
    collect: mon => ({
      isOver: mon.isOver({ shallow: true }),
    }),
  });

  return (
    <StyledDropZone location={location} active={activeDropZone === location || isOver} ref={drop}>
      <ColumnName {...props} />
    </StyledDropZone>
  );
}
