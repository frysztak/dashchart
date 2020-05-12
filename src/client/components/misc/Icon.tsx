import { styled } from '../../config/Theme';
import { StyledIcon, StyledIconProps } from '@styled-icons/styled-icon';
import React from 'react';

export type IconProps = StyledIconProps & {
  readonly rotated: boolean;
};

export function Icon(styledIcon: StyledIcon) {
  const StyledIcon = styled(styledIcon)<IconProps>`
    width: ${props => (typeof props.size === 'number' ? `${props.size}px` : props.size)};
    height: ${props => (typeof props.size === 'number' ? `${props.size}px` : props.size)};
    transition: all 0.3s ease-out;
    transform: ${props => (props.rotated ? `rotate(90deg)` : '')};
  `;
  return (props: IconProps) => <StyledIcon {...props} />;
}
