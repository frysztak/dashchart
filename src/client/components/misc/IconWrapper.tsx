import React, { ReactElement } from 'react';
import { styled } from '../../config/Theme';
import { BoxShadow } from './BoxShadow';
import { Flex } from 'reflexbox';

export interface IconWrapperProps {
  children: ReactElement;
  size: number;
}

const Wrapper = styled.div<{ size: number }>`
  background-color: ${p => p.theme.colors.almostWhite};
  border-radius: 8px;
  width: ${p => `${p.size}px`};
  height: ${p => `${p.size}px`};
`;

export function IconWrapper(props: IconWrapperProps) {
  const { size, children } = props;
  return (
    <Wrapper size={size}>
      <BoxShadow borderRadius={'6px'}>
        <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
          {children}
        </Flex>
      </BoxShadow>
    </Wrapper>
  );
}
