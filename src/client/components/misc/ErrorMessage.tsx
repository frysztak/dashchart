import { Flex, Box } from 'reflexbox';
import React from 'react';
import { ErrorCircle } from '@styled-icons/boxicons-regular';
import { Icon } from './Icon';

export interface ErrorMessageProps {
  message: string;
}

const ErrorIcon = Icon(ErrorCircle);

export function ErrorMessage(props: ErrorMessageProps) {
  const { message } = props;

  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <Box>
        <ErrorIcon size={48} color={'red'} />
      </Box>

      <Box>
        <h3>{message}</h3>
      </Box>
    </Flex>
  );
}
