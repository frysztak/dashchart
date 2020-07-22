import { ChartDimensions, ChartMargin } from '../../charts/common/Props';
import { Formik } from 'formik';
import { FormikWrapper, Group, PropEditorGroups, WideForm } from '../../misc/PropsEditorGroups';
import { PropEditor, PropType } from './PropEditor';
import React from 'react';
import { AutoSubmit } from '../../misc/AutoSubmit';

export interface GeneralPropsEditorProps {
  chartName: string;
  updateName: (newName: string) => void;

  dimensions: ChartDimensions;
  margins: ChartMargin;
  updateDimensions: (newDimensions: ChartDimensions) => void;
}

export function GeneralPropsEditor(props: GeneralPropsEditorProps) {
  const { chartName, updateName, margins, dimensions, updateDimensions } = props;

  const initialValues = {
    chartName,
    dimensions,
    margins,
  };

  const onSubmit = (newValues: typeof initialValues) => {
    const { margins, dimensions, chartName } = newValues;
    updateName(chartName);
    updateDimensions({
      ...dimensions,
      margin: margins,
    });
  };

  return (
    <FormikWrapper>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {props => (
          <WideForm onSubmit={props.handleSubmit}>
            <PropEditorGroups>
              <Group groupName={'General'} collapsed={true}>
                <PropEditor
                  name={'Chart name'}
                  field={'chartName'}
                  handleChange={props.handleChange}
                  type={PropType.STRING}
                  value={props.values.chartName}
                />

                <PropEditor
                  name={'Width'}
                  field={'dimensions.width'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.dimensions.width}
                  min={0}
                />

                <PropEditor
                  name={'Height'}
                  field={'dimensions.height'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.dimensions.height}
                  min={0}
                />

                <PropEditor
                  name={'Margin top'}
                  field={'margins.top'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.margins.top}
                  min={0}
                />

                <PropEditor
                  name={'Margin right'}
                  field={'margins.right'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.margins.right}
                  min={0}
                />

                <PropEditor
                  name={'Margin bottom'}
                  field={'margins.bottom'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.margins.bottom}
                  min={0}
                />
                <PropEditor
                  name={'Margin left'}
                  field={'margins.left'}
                  handleChange={props.handleChange}
                  type={PropType.NUMBER}
                  value={props.values.margins.left}
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
