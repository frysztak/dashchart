import { styled } from '../../config/Theme';
import { Text } from 'rebass';

export const LightText = styled(Text)`
  font-family: ${props => props.theme.fonts.light};
`;

export const TruncatedText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
