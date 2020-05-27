import { withKnobs } from '@storybook/addon-knobs';
import { PropEditor, PropEditorProps, PropType } from './PropEditor';
import React from 'react';

export default { title: 'PropEditor', decorators: [withKnobs] };

enum MyEnum {
  FIELD1 = 'FIELD1',
  FIELD2 = 'FIELD2',
}

const MyEnumMapper: Record<MyEnum, string> = {
  [MyEnum.FIELD1]: 'Field 1',
  [MyEnum.FIELD2]: 'Field 2',
};

export const EnumPropEditor = () => {
  const props: PropEditorProps = {
    name: 'My Enum',
    field: 'myenum',
    type: PropType.ENUM,
    enum: MyEnum,
    enumMap: MyEnumMapper,
    handleChange: () => {},
    value: MyEnum.FIELD1,
  };

  return <PropEditor {...props} />;
};

export const NumberPropEditor = () => {
  const props: PropEditorProps = {
    name: 'My Number',
    field: 'mynum',
    type: PropType.NUMBER,
    handleChange: () => {},
    value: 50,
  };

  return <PropEditor {...props} />;
};
