import { styled } from '../../../config/Theme';
import { keyframes } from 'styled-components';

const PulsateKeyframes = keyframes`
/* ----------------------------------------------
 * Generated by Animista on 2020-5-14 20:38:48
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation pulsate-fwd
 * ----------------------------------------
 */
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }

`;

export const Pulsate = styled.div`
  &:hover {
    animation: ${PulsateKeyframes} 0.5s ease-in-out both;
  }
`;
