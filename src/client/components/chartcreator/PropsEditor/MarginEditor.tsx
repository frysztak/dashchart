import { ChartMargin } from '../../charts/common/Props';
import { Formik } from 'formik';
import { FormikWrapper, Group, PropEditorGroups, WideForm } from './PropsEditorGroups';
import { PropEditor, PropType } from './PropEditor';
import React from 'react';
import { AutoSubmit } from '../../misc/AutoSubmit';

export interface MarginEditorProps {
  margins: ChartMargin;
  updateMargins: (newMargins: ChartMargin) => void;
}

export function MarginsEditor(props: MarginEditorProps) {
  const { margins, updateMargins } = props;

  return (
    <FormikWrapper>
      <Formik initialValues={margins} onSubmit={updateMargins}>
        {props => (
          <WideForm onSubmit={props.handleSubmit}>
            <PropEditorGroups>
              <Group groupName={'Margins'} collapsed={true}>
                <PropEditor
                  name={'Top'}
                  field={'top'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.top}
                  min={0}
                />

                <PropEditor
                  name={'Right'}
                  field={'right'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.right}
                  min={0}
                />

                <PropEditor
                  name={'Bottom'}
                  field={'bottom'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.bottom}
                  min={0}
                />
                <PropEditor
                  name={'Left'}
                  field={'left'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.left}
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
