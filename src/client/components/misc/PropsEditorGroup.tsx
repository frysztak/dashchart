import React, { ReactElement, useState } from 'react';
import { Flex } from 'reflexbox';
import { Text } from 'rebass';
import { Icon } from './Icon';
import { ChevronRight } from '@styled-icons/boxicons-regular';

export interface PropsEditorGroupProps {
  groupName: string;
  collapsed?: boolean;
  children: ReactElement | ReactElement[];
  className?: string;
}

const Chevron = Icon(ChevronRight);

export function PropsEditorGroup(props: PropsEditorGroupProps) {
  const { groupName, children } = props;

  const [expanded, setExpanded] = useState(!props.collapsed);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <Flex flexDirection={'column'} className={props.className}>
      <Flex alignItems={'center'}>
        <Chevron size={20} rotated={expanded} onClick={toggleExpand} />
        <Text ml={2} fontWeight={'bold'} fontSize={3}>
          {groupName}
        </Text>
      </Flex>
      <Flex flexDirection={'column'}>{expanded && children}</Flex>
    </Flex>
  );
}
