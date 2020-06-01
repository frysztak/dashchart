import { ChartDimensions } from '../../charts/common/Props';
import { Formik } from 'formik';
import { FormikWrapper, Group, PropEditorGroups, WideForm } from './PropsEditorGroups';
import { PropEditor, PropType } from './PropEditor';
import React from 'react';
import { AutoSubmit } from '../../misc/AutoSubmit';

export interface DimensionsEditorProps {
  dimensions: ChartDimensions;
  updateDimensions: (newDimensions: ChartDimensions) => void;
}

export function DimensionsEditor(props: DimensionsEditorProps) {
  const { dimensions, updateDimensions } = props;

  return (
    <FormikWrapper>
      <Formik initialValues={dimensions} onSubmit={updateDimensions}>
        {props => (
          <WideForm onSubmit={props.handleSubmit}>
            <PropEditorGroups>
              <Group groupName={'Dimensions'} collapsed={true}>
                <PropEditor
                  name={'Width'}
                  field={'width'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.width}
                  min={0}
                />

                <PropEditor
                  name={'Height'}
                  field={'height'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.height}
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
