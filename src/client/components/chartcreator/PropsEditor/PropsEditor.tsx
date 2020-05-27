import { AxisScale, AxisScaleMap, ChartType, ChartTypeMap, UserEditableChartProps } from '../../charts/common/Props';
import { Flex } from 'reflexbox';
import React from 'react';
import { Formik } from 'formik';
import { AutoSubmit } from '../../misc/AutoSubmit';
import { styled } from '../../../config/Theme';
import { PropsEditorGroup } from './PropsEditorGroup';
import { PropEditor, PropType } from './PropEditor';

export interface ChartPropsEditorProps {
  chartName: string;
  chartProps: UserEditableChartProps;
  updateProps: (props: UserEditableChartProps) => void;
}

const WideForm = styled.form`
  width: 100%;
`;

const Group = styled(PropsEditorGroup)`
  & + & {
    margin-top: 16px;
  }
  & & {
    margin-left: 16px;
  }
`;

const PropEditorGroups = styled(Flex)`
  flex-direction: column;
`;

export function PropsEditor(props: ChartPropsEditorProps) {
  const { chartName, chartProps, updateProps } = props;

  return (
    <Formik initialValues={chartProps} onSubmit={updateProps}>
      {props => (
        <WideForm onSubmit={props.handleSubmit}>
          <PropEditorGroups>
            <Group groupName={'Dimensions'} collapsed={true}>
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
            </Group>

            <Group groupName={'Margins'} collapsed={true}>
              <PropEditor
                name={'Top'}
                field={'dimensions.margin.top'}
                handleChange={props.handleChange}
                type={PropType.NUMBER}
                value={props.values.dimensions.margin.top}
                min={0}
              />

              <PropEditor
                name={'Right'}
                field={'dimensions.margin.right'}
                handleChange={props.handleChange}
                type={PropType.NUMBER}
                value={props.values.dimensions.margin.right}
                min={0}
              />

              <PropEditor
                name={'Bottom'}
                field={'dimensions.margin.bottom'}
                handleChange={props.handleChange}
                type={PropType.NUMBER}
                value={props.values.dimensions.margin.bottom}
                min={0}
              />
              <PropEditor
                name={'Left'}
                field={'dimensions.margin.left'}
                handleChange={props.handleChange}
                type={PropType.NUMBER}
                value={props.values.dimensions.margin.left}
                min={0}
              />
            </Group>

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
  );
}
