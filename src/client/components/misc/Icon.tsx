import { styled, ThemeColors } from '../../config/Theme';
import { StyledIcon, StyledIconProps } from '@styled-icons/styled-icon';
import React from 'react';

export type IconProps = StyledIconProps & {
  readonly color?: ThemeColors;
  readonly rotated?: boolean;
};

export function Icon(styledIcon: StyledIcon) {
  const StyledIcon = styled(styledIcon)<IconProps>`
    width: ${props => (typeof props.size === 'number' ? `${props.size}px` : props.size)};
    height: ${props => (typeof props.size === 'number' ? `${props.size}px` : props.size)};
    transition: all 0.3s ease-out;
    transform: ${props => (props.rotated ? `rotate(90deg)` : '')};
    color: ${props => (props.color ? props.theme.colors[props.color] : '')};
  `;
  return (props: IconProps) => <StyledIcon {...props} />;
}
