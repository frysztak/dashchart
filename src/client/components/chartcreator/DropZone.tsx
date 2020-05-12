import { keyframes } from 'styled-components';
import { styled } from '../../config/Theme';
import { DropZoneLocation, DropZoneValues, isHorizontal } from './DragNDrop';
import { Flex } from 'reflexbox/styled-components';
import React from 'react';
import { Table } from '@styled-icons/boxicons-regular';
import { Icon } from '../misc/Icon';
import { LightText } from '../misc/LightText';
import { ColumnId, formatColumnData } from 'shared/DataFrame';

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

const DropZoneCommon = styled(Flex)`
  position: absolute;
  border-radius: ${props => props.theme.dropZone.borderRadius};
  animation: ${opacity} ${props => props.theme.dropZone.animTime} ease-out;
  transition: background-color ${props => props.theme.dropZone.animTime} ease-out;
`;

const StyledDropZone = styled(DropZoneCommon)<StyledDropZoneProps>`
  width: ${p => (isHorizontal(p.location) ? p.theme.dropZone.width : p.theme.dropZone.height)};
  height: ${p => (isHorizontal(p.location) ? p.theme.dropZone.height : p.theme.dropZone.width)};
  top: ${p => (p.location === DropZoneLocation.TOP ? p.theme.dropZone.margin : isHorizontal(p.location) ? '' : 0)};
  bottom: ${p =>
    p.location === DropZoneLocation.BOTTOM ? p.theme.dropZone.margin : isHorizontal(p.location) ? '' : 0};
  left: ${p => (p.location === DropZoneLocation.LEFT ? p.theme.dropZone.margin : isHorizontal(p.location) ? 0 : '')};
  right: ${p => (p.location === DropZoneLocation.RIGHT ? p.theme.dropZone.margin : isHorizontal(p.location) ? 0 : '')};
  margin-left: ${p => (isHorizontal(p.location) ? 'auto' : '')};
  margin-right: ${p => (isHorizontal(p.location) ? 'auto' : '')};
  margin-top: ${p => (isHorizontal(p.location) ? '' : 'auto')};
  margin-bottom: ${p => (isHorizontal(p.location) ? '' : 'auto')};
  background-color: ${props => (props.active ? props.theme.colors.darkPink : props.theme.colors.pink)};
`;

export const DropZoneBackground = styled(DropZoneCommon)`
  left: ${props => props.theme.dropZone.bgMargin};
  right: ${props => props.theme.dropZone.bgMargin};
  top: ${props => props.theme.dropZone.bgMargin};
  bottom: ${props => props.theme.dropZone.bgMargin};
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

function ColumnName(props: DropZoneProps) {
  const { activeDropZone, currentColumns, location } = props;
  const formattedColumnName: string = formatColumnData(currentColumns ? currentColumns[location] : undefined);
  if (!formattedColumnName) {
    return null;
  }

  const horizontal: boolean = isHorizontal(location);

  return (
    <ColumnNameContainer location={location} justifyContent={'center'} alignItems={'center'} flexGrow={1}>
      <TableIcon size={16} rotated={!horizontal} />
      <LightText ml={horizontal ? 2 : 0} mt={horizontal ? 0 : 2}>
        {formattedColumnName}
      </LightText>
    </ColumnNameContainer>
  );
}

export function DropZone(props: DropZoneProps) {
  const { activeDropZone, currentColumns, location } = props;

  return (
    <StyledDropZone location={location} active={activeDropZone === location}>
      <ColumnName {...props} />
    </StyledDropZone>
  );
}
