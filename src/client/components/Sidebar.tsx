import { styled, ThemeColors } from '../config/Theme';
import React, { ReactElement } from 'react';

export interface SidebarProps {
  bgColor: ThemeColors;
  children: ReactElement;
}

const Background = styled.div<{ bgColor: ThemeColors }>`
  background-color: ${p => p.theme.colors[p.bgColor]};
  width: 250px;
  height: 100%;
  overflow-y: auto;
`;

export function Sidebar(props: SidebarProps) {
  const { bgColor, children } = props;
  return <Background bgColor={bgColor}>{children}</Background>;
}
