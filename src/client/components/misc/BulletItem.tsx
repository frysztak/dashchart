import React, { ReactNode } from 'react';
import { Flex } from 'reflexbox';
import { Circle } from '@styled-icons/boxicons-solid';

export enum BulletLocation {
  TOP = 'TOP',
  CENTER = 'CENTER',
  END = 'END',
}

export function BulletItem(props: { children: ReactNode; bulletLocation?: BulletLocation }) {
  const alignItems = () => {
    switch (props.bulletLocation) {
      case BulletLocation.TOP:
        return 'flex-start';
      case BulletLocation.CENTER:
        return 'center';
      case BulletLocation.END:
        return 'flex-end';
      default:
        return 'center';
    }
  };
  return (
    <Flex flexGrow={1} mt={2} alignItems={alignItems()}>
      <Flex size={20} justifyContent={'center'} alignItems={'center'}>
        <Circle size={8} />
      </Flex>

      {props.children}
    </Flex>
  );
}
