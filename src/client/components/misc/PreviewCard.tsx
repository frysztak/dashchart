import { styled } from '../../config/Theme';
import React, { ReactElement } from 'react';
import { Flex } from 'reflexbox';
import { Text } from 'rebass';
import { BottomBoxShadow, RightBoxShadow } from './BoxShadow';
import { LightText } from './LightText';

const nbsp = '\u00A0';

const Background = styled.div`
  width: ${p => p.theme.previewCard.width}px;
  height: ${p => p.theme.previewCard.height}px;
  background-color: ${p => p.theme.colors.almostWhite};
  border: 1px ${p => p.theme.colors.lightGrey} solid;
  border-radius: 8px;
  cursor: pointer;
`;

export function PreviewCard({
  children,
  title,
  onClick,
}: {
  children: ReactElement;
  title: string;
  onClick?: () => void;
}) {
  return (
    <Flex flexDirection={'column'} onClick={onClick}>
      <Text fontSize={3} marginBottom={2} marginLeft={4}>
        {title || nbsp}
      </Text>
      <Background>
        <BottomBoxShadow>
          <RightBoxShadow>{children}</RightBoxShadow>
        </BottomBoxShadow>
      </Background>
    </Flex>
  );
}

export function CreateNewCard({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <PreviewCard title={''} onClick={onClick}>
      <Flex justifyContent={'center'} height={'100%'} alignItems={'center'}>
        <LightText fontSize={3}>{label}</LightText>
      </Flex>
    </PreviewCard>
  );
}
