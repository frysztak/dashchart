import React from 'react';
import { Box, Flex } from 'reflexbox';
import { Circle } from '@styled-icons/boxicons-solid';
import { Label, Select, Input } from '@rebass/forms';
import { keys } from 'shared/utils/Collection';
import { FormErrorMessage } from './FormErrorMessage';

export enum PropType {
  ENUM = 'ENUM',
  NUMBER = 'NUMBER',
  STRING = 'STRING',
}

type BaseEditorProps = {
  name: string;
  field: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errorMessage?: string;
};

export type PropEditorProps =
  | (BaseEditorProps & {
      type: PropType.ENUM;
      value: string;
      enum: any; // sadly, TypeScript doesn't allow checking for generic enum type
      enumMap: Record<any, string>;
    })
  | (BaseEditorProps & {
      type: PropType.NUMBER;
      value: number;
      min?: number;
      max?: number;
    })
  | (BaseEditorProps & {
      type: PropType.STRING;
      value: string;
    });

export function PropEditor(props: PropEditorProps) {
  const { name, field, handleChange, errorMessage } = props;

  const valueInput = () => {
    switch (props.type) {
      case PropType.ENUM:
        return (
          <Select
            id={field}
            name={field}
            value={props.value}
            onChange={handleChange}
            css={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            paddingRight={3}
          >
            {keys(props.enum).map(enumValue => (
              <option value={enumValue} key={enumValue}>
                {props.enumMap[enumValue]}
              </option>
            ))}
          </Select>
        );
      case PropType.NUMBER:
        return (
          <Input
            id={field}
            name={field}
            type='number'
            value={props.value}
            min={props.min}
            max={props.max}
            required={true}
            onChange={handleChange}
          />
        );
      case PropType.STRING:
        return (
          <Input id={field} name={field} type='text' value={props.value} required={true} onChange={handleChange} />
        );
    }
  };

  return (
    <Flex flexGrow={1} mt={2} alignItems={'center'}>
      <Flex size={20} justifyContent={'center'} alignItems={'center'}>
        <Circle size={8} />
      </Flex>

      <Box width={1 / 2}>
        <Label ml={2} htmlFor={field} maxWidth={'calc(100% - 8px)'}>
          {name}
        </Label>
      </Box>

      <Box width={1 / 2}>
        {valueInput()}
        <FormErrorMessage message={errorMessage} />
      </Box>
    </Flex>
  );
}
