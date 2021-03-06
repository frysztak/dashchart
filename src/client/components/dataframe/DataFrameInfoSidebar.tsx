import { DataFrameContainer } from '../../store/project';
import { Sidebar } from '../misc/Sidebar';
import { Box, Flex } from 'reflexbox';
import { LightText } from '../misc/LightText';
import React from 'react';
import { WideForm } from '../misc/PropsEditorGroups';
import { PropEditor, PropType } from '../chartcreator/PropsEditor/PropEditor';
import { Formik } from 'formik';
import { AutoSubmit } from '../misc/AutoSubmit';
import { Button } from 'rebass/styled-components';
import { object, string } from 'yup';
import { FormErrorMessage } from '../chartcreator/PropsEditor/FormErrorMessage';
import { IOStatus } from '../../store/common';
import { DataFrameTypeConversions } from './DataFrameTypeConversions';
import { ColumnType } from '../../../shared/DataFrame';

export interface DataFrameInfoSidebarProps {
  dataFrameContainer: DataFrameContainer;
  update: (newDF: DataFrameContainer) => void;
  onDownloadClick: () => void;
  onSaveClick: () => void;
  onConvertType: (columnName: string, newType: ColumnType) => void;
}

export function DataFrameInfoSidebar(props: DataFrameInfoSidebarProps) {
  const { dataFrameContainer, update, onDownloadClick, onSaveClick, onConvertType } = props;

  const validationSchema = object().shape({
    dataFrame: object().shape({
      name: string().required('Please enter name'),
    }),
    source: string()
      .url('URL must be valid')
      .matches(/.+\.csv$/, 'URL must point to CSV')
      .required('Please enter URL'),
  });

  const errorMessage: string = dataFrameContainer.errorMessage
    ? `Unexpected error: ${dataFrameContainer.errorMessage}`
    : '';

  return (
    <Sidebar bgColor={'palePink'}>
      <Flex flexDirection={'column'} pt={2}>
        <Flex justifyContent={'center'} mb={4}>
          <LightText fontSize={4}>Properties</LightText>
        </Flex>

        <Box mx={2}>
          <Formik
            enableReinitialize={true}
            initialValues={dataFrameContainer}
            onSubmit={update}
            validationSchema={validationSchema}
            validateOnChange
            validateOnMount
          >
            {({ handleSubmit, handleChange, values, errors, isValid }) => (
              <WideForm onSubmit={handleSubmit}>
                <PropEditor
                  name={'Name'}
                  field={'dataFrame.name'}
                  handleChange={handleChange}
                  type={PropType.STRING}
                  value={values.dataFrame.name}
                  errorMessage={errors.dataFrame?.name}
                />
                <PropEditor
                  name={'Source'}
                  field={'source'}
                  handleChange={handleChange}
                  type={PropType.STRING}
                  value={values.source}
                  errorMessage={errors.source}
                />

                {errorMessage && (
                  <Box my={2}>
                    <FormErrorMessage message={errorMessage} />
                  </Box>
                )}
                <Flex my={4} justifyContent={'space-evenly'}>
                  <Button type={'submit'} onClick={onDownloadClick} disabled={!isValid}>
                    Download
                  </Button>
                  <Button
                    type={'submit'}
                    onClick={onSaveClick}
                    disabled={!isValid || dataFrameContainer.state !== IOStatus.OK}
                  >
                    Save
                  </Button>
                </Flex>

                <DataFrameTypeConversions dataFrame={dataFrameContainer.dataFrame} convertType={onConvertType} />
                <AutoSubmit />
              </WideForm>
            )}
          </Formik>
        </Box>
      </Flex>
    </Sidebar>
  );
}
