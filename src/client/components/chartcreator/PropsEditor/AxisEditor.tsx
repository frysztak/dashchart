import { AxisFontFamily, AxisFontFamilyMap, AxisFontStyle } from '../../charts/common/Props';
import { Formik } from 'formik';
import { FormikWrapper, Group, PropEditorGroups, WideForm } from './PropsEditorGroups';
import { PropEditor, PropType } from './PropEditor';
import React from 'react';
import { AutoSubmit } from '../../misc/AutoSubmit';

export interface AxisEditorProps {
  axisStyle: AxisFontStyle;
  update: (newStyle: AxisFontStyle) => void;
}

export function AxisEditor(props: AxisEditorProps) {
  const { axisStyle, update } = props;

  return (
    <FormikWrapper>
      <Formik initialValues={axisStyle} onSubmit={update}>
        {props => (
          <WideForm onSubmit={props.handleSubmit}>
            <PropEditorGroups>
              <Group groupName={'Axis Style'} collapsed={true}>
                <PropEditor
                  name={'Font'}
                  field={'fontFamily'}
                  handleChange={props.handleChange}
                  type={PropType.ENUM}
                  value={props.values.fontFamily}
                  enum={AxisFontFamily}
                  enumMap={AxisFontFamilyMap}
                />

                <PropEditor
                  name={'Font size'}
                  field={'fontSize'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.fontSize}
                  min={0}
                />
              </Group>
            </PropEditorGroups>
            <AutoSubmit />
          </WideForm>
        )}
      </Formik>
    </FormikWrapper>
  );
}
