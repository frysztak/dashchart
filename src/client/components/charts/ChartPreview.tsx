import React, { ReactElement } from 'react';
import { styled } from '../../config/Theme';
import { BottomBoxShadow, RightBoxShadow } from '../misc/BoxShadow';
import { LightText } from '../misc/LightText';
import { Flex } from 'reflexbox';

const Background = styled.div`
  width: 350px;
  height: 200px;
  background-color: ${p => p.theme.colors.almostWhite};
  border-radius: 8px;
  cursor: pointer;
`;

function Base({ children }: { children: ReactElement }) {
  return (
    <Background>
      <BottomBoxShadow>
        <RightBoxShadow>{children}</RightBoxShadow>
      </BottomBoxShadow>
    </Background>
  );
}

interface BaseProps {
  onClick: () => void;
}

export type CreateNewChartProps = BaseProps;

export function CreateNewChart(props: CreateNewChartProps) {
  return (
    <Base>
      <Flex justifyContent={'center'} height={'100%'} alignItems={'center'} onClick={props.onClick}>
        <LightText fontSize={3}>Create new chart...</LightText>
      </Flex>
    </Base>
  );
}