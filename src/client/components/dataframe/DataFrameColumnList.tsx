import { DataFrame, Column } from 'shared/DataFrame';
import React, { useState } from 'react';
import { ChevronRight } from '@styled-icons/boxicons-regular';
import { Text, Flex } from 'rebass';
import { Icon } from '../misc/Icon';
import { DraggableColumnName } from './DraggableColumnName';

export interface DataFrameColumnListProps {
  dataFrame: DataFrame;
}

const Chevron = Icon(ChevronRight);

export function DataFrameColumnList(props: DataFrameColumnListProps) {
  const [expanded, setExpanded] = useState(true);
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
            <DraggableColumnName dataFrameName={dataFrame.name()} columnName={name} column={col} key={name} />
          ))
        : null}
    </Flex>
  );
}
