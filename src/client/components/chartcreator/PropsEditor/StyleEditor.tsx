import { AxisFontFamily, AxisFontFamilyMap, AxisFontStyle, ChartStyle } from '../../charts/common/Props';
import { Formik } from 'formik';
import { FormikWrapper, Group, PropEditorGroups, WideForm } from './PropsEditorGroups';
import { PropEditor, PropType } from './PropEditor';
import React from 'react';
import { AutoSubmit } from '../../misc/AutoSubmit';
import { ColourScheme, ColourSchemeMap } from '../../charts/ColourScheme';

export interface StyleEditorProps {
  style: ChartStyle;
  update: (newStyle: ChartStyle) => void;
}

export function StyleEditor(props: StyleEditorProps) {
  const { style, update } = props;

  return (
    <FormikWrapper>
      <Formik initialValues={style} onSubmit={update}>
        {props => (
          <WideForm onSubmit={props.handleSubmit}>
            <PropEditorGroups>
              <Group groupName={'Style'} collapsed={true}>
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

                <PropEditor
                  name={'Colour scheme'}
                  field={'colourScheme'}
                  handleChange={props.handleChange}
                  type={PropType.ENUM}
                  value={props.values.colourScheme}
                  enum={ColourScheme}
                  enumMap={ColourSchemeMap}
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
