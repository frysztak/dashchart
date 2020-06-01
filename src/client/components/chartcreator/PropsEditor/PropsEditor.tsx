import { AxisScale, AxisScaleMap, ChartType, ChartTypeMap, UserEditableChartProps } from '../../charts/common/Props';
import React from 'react';
import { Formik } from 'formik';
import { AutoSubmit } from '../../misc/AutoSubmit';
import { PropEditor, PropType } from './PropEditor';
import { FormikWrapper, Group, PropEditorGroups, WideForm } from './PropsEditorGroups';

export interface ChartPropsEditorProps {
  chartName: string;
  chartProps: UserEditableChartProps;
  updateProps: (props: UserEditableChartProps) => void;
}

export function PropsEditor(props: ChartPropsEditorProps) {
  const { chartName, chartProps, updateProps } = props;

  return (
    <FormikWrapper>
      <Formik initialValues={chartProps} onSubmit={updateProps}>
        {props => (
          <WideForm onSubmit={props.handleSubmit}>
            <PropEditorGroups>
              <Group groupName={chartName}>
                <PropEditor
                  name={'Chart Type'}
                  field={'type'}
                  handleChange={props.handleChange}
                  type={PropType.ENUM}
                  value={props.values.type}
                  enum={ChartType}
                  enumMap={ChartTypeMap}
                />
                <Group groupName={'X axis'}>
                  <PropEditor
                    name={'Scale'}
                    field={'data.x.scale'}
                    handleChange={props.handleChange}
                    type={PropType.ENUM}
                    value={props.values.data.x.scale}
                    enum={AxisScale}
                    enumMap={AxisScaleMap}
                  />
                  <PropEditor
                    name={'Tick size'}
                    field={'data.x.style.tickSize'}
                    handleChange={props.handleChange}
                    type={PropType.NUMBER}
                    value={props.values.data.x.style.tickSize}
                  />
                </Group>
                <Group groupName={'Y axis'}>
                  <PropEditor
                    name={'Scale'}
                    field={'data.y.scale'}
                    handleChange={props.handleChange}
                    type={PropType.ENUM}
                    value={props.values.data.y.scale}
                    enum={AxisScale}
                    enumMap={AxisScaleMap}
                  />
                  <PropEditor
                    name={'Tick size'}
                    field={'data.y.style.tickSize'}
                    handleChange={props.handleChange}
                    type={PropType.NUMBER}
                    value={props.values.data.y.style.tickSize}
                  />
                </Group>
              </Group>
            </PropEditorGroups>

            <AutoSubmit />
          </WideForm>
        )}
      </Formik>
    </FormikWrapper>
  );
}
