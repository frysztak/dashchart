import styled, { keyframes } from 'styled-components';

const dropZoneHeight: string = '16px';
const dropZoneWidth: string = '60%';
const dropZoneMargin: string = '56px';

interface DropZoneProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

const opacity = keyframes`
  from {
  opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const DropZoneH = styled.div<DropZoneProps>`
  position: absolute;
  width: ${dropZoneWidth};
  height: ${dropZoneHeight};
  background-color: ${props => props.theme.colors.pink};
  border-radius: 16px;
  top: ${props => (props.top ? dropZoneMargin : '')};
  bottom: ${props => (props.bottom ? dropZoneMargin : '')};
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  animation: ${opacity} 0.25s ease-out;
`;

export const DropZoneV = styled.div<DropZoneProps>`
  position: absolute;
  width: ${dropZoneHeight};
  height: ${dropZoneWidth};
  background-color: ${props => props.theme.colors.pink};
  border-radius: 16px;
  left: ${props => (props.left ? dropZoneMargin : '')};
  right: ${props => (props.right ? dropZoneMargin : '')};
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  animation: ${opacity} 0.25s ease-out;
`;
