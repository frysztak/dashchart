import { keyframes } from 'styled-components';
import { styled } from '../../config/Theme';

interface DropZoneProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  active?: boolean;
}

const opacity = keyframes`
  from {
  opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const DropZoneCommon = styled.div<DropZoneProps>`
  position: absolute;
  background-color: ${props => (props.active ? props.theme.colors.darkPink : props.theme.colors.pink)};
  border-radius: ${props => props.theme.dropZone.borderRadius};
  animation: ${opacity} ${props => props.theme.dropZone.animTime} ease-out;
  transition: background-color ${props => props.theme.dropZone.animTime} ease-out;
`;

export const DropZoneH = styled(DropZoneCommon)`
  width: ${props => props.theme.dropZone.width};
  height: ${props => props.theme.dropZone.height};
  top: ${props => (props.top ? props.theme.dropZone.margin : '')};
  bottom: ${props => (props.bottom ? props.theme.dropZone.margin : '')};
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const DropZoneV = styled(DropZoneCommon)`
  width: ${props => props.theme.dropZone.height};
  height: ${props => props.theme.dropZone.width};
  left: ${props => (props.left ? props.theme.dropZone.margin : '')};
  right: ${props => (props.right ? props.theme.dropZone.margin : '')};
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
`;

export const DropZoneBackground = styled(DropZoneCommon)`
  left: ${props => props.theme.dropZone.bgMargin};
  right: ${props => props.theme.dropZone.bgMargin};
  top: ${props => props.theme.dropZone.bgMargin};
  bottom: ${props => props.theme.dropZone.bgMargin};
  background-color: ${props => props.theme.colors.palePink};
`;
