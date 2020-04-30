import styled, { keyframes } from 'styled-components';

const dropZoneHeight: string = '16px';
const dropZoneWidth: string = '60%';
const dropZoneMargin: string = '56px';
const dropZoneBgMargin: string = '32px';

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
  border-radius: 16px;
  animation: ${opacity} 0.25s ease-out;
  transition: background-color 0.25s ease-out;
`;

export const DropZoneH = styled(DropZoneCommon)`
  width: ${dropZoneWidth};
  height: ${dropZoneHeight};
  top: ${props => (props.top ? dropZoneMargin : '')};
  bottom: ${props => (props.bottom ? dropZoneMargin : '')};
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const DropZoneV = styled(DropZoneCommon)`
  width: ${dropZoneHeight};
  height: ${dropZoneWidth};
  left: ${props => (props.left ? dropZoneMargin : '')};
  right: ${props => (props.right ? dropZoneMargin : '')};
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
`;

export const DropZoneBackground = styled(DropZoneCommon)`
  left: ${dropZoneBgMargin};
  right: ${dropZoneBgMargin};
  top: ${dropZoneBgMargin};
  bottom: ${dropZoneBgMargin};
  background-color: ${props => props.theme.colors.palePink};
`;
