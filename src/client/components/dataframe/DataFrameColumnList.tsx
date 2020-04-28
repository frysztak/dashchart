import { DataFrame, Column, ColumnType } from 'shared/DataFrame';
import React, { useState } from 'react';
import { ChevronRight } from '@styled-icons/boxicons-regular';
import { Circle } from '@styled-icons/boxicons-solid';
import { Text, Flex } from 'rebass';
import styled from 'styled-components';

export interface DataFrameColumnListProps {
  dataFrame: DataFrame;
}

interface ChevronProps {
  readonly rotated: boolean;
  readonly size: number;
}

const Chevron = styled(ChevronRight)<ChevronProps>`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  transition: all 0.3s ease-out;
  transform: ${props => (props.rotated ? `rotate(90deg)` : '')};
`;

function mapColumnType(type: ColumnType): string {
  switch (type) {
    case ColumnType.NUMBER:
      return 'number';
    case ColumnType.STRING:
      return 'string';
    default:
      return type;
  }
}

export function DataFrameColumnList(props: DataFrameColumnListProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const { dataFrame } = props;

  return (
    <Flex flexDirection={'column'}>
      <Flex alignItems={'center'}>
        <Chevron size={20} rotated={expanded} onClick={toggleExpand} />
        <Text ml={2} fontWeight={'bold'} fontSize={3}>
          {dataFrame.name()}
        </Text>
      </Flex>
      {expanded
        ? Array.from(dataFrame.columns()).map(([name, col]: [string, Column]) => (
            <Flex mt={2}>
              <Flex size={20} justifyContent={'center'} alignItems={'center'}>
                <Circle size={8} />
              </Flex>
              <Text ml={2}>
                {name} :: {mapColumnType(col.type)}
              </Text>
            </Flex>
          ))
        : null}
    </Flex>
  );
}
