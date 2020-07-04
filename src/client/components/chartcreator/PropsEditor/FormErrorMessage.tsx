import { Text } from 'rebass/styled-components';
import { styled } from '../../../config/Theme';
import React from 'react';

const Message = styled(Text)`
  color: ${p => p.theme.colors.red};
  font-size: 14px;
`;

export function FormErrorMessage({ message }: { message?: string }) {
  return message ? <Message mt={1}>{message}</Message> : null;
}
