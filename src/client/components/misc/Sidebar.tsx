import { styled, ThemeColors } from '../../config/Theme';
import React, { ReactElement } from 'react';

export interface SidebarProps {
  bgColor: ThemeColors;
  children: ReactElement;
}

const Background = styled.div<{ bgColor: ThemeColors }>`
  background-color: ${p => p.theme.colors[p.bgColor]};
  min-width: 275px;
  width: 15vw;
  height: 100%;
  overflow-y: auto;
`;

export function Sidebar(props: SidebarProps) {
  const { bgColor, children } = props;
  return <Background bgColor={bgColor}>{children}</Background>;
}
