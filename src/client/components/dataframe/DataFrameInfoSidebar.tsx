import { DataFrameContainer } from '../../store/project';
import { Sidebar } from '../misc/Sidebar';
import { Box, Flex } from 'reflexbox';
import { LightText } from '../misc/LightText';
import React from 'react';
import { WideForm } from '../chartcreator/PropsEditor/PropsEditorGroups';
import { PropEditor, PropType } from '../chartcreator/PropsEditor/PropEditor';
import { Formik } from 'formik';
import { AutoSubmit } from '../misc/AutoSubmit';
import { Button } from 'rebass/styled-components';

export interface DataFrameInfoSidebarProps {
  dataFrameContainer: DataFrameContainer;
  update: (newDF: DataFrameContainer) => void;
  onDownloadClick: () => void;
  onSaveClick: () => void;
}

export function DataFrameInfoSidebar(props: DataFrameInfoSidebarProps) {
  const { dataFrameContainer, update, onDownloadClick, onSaveClick } = props;
  return (
    <Sidebar bgColor={'palePink'}>
      <Flex flexDirection={'column'} pt={2}>
        <Flex justifyContent={'center'} mb={4}>
          <LightText fontSize={4}>Properties</LightText>
        </Flex>

        <Box mx={2}>
          <Formik initialValues={dataFrameContainer} onSubmit={update}>
            {props => (
              <WideForm onSubmit={props.handleSubmit}>
                <PropEditor
                  name={'Name'}
                  field={'dataFrame.name'}
                  handleChange={props.handleChange}
                  type={PropType.STRING}
                  value={props.values.dataFrame.name}
                />
                <PropEditor
                  name={'Source'}
                  field={'source'}
                  handleChange={props.handleChange}
                  type={PropType.STRING}
                  value={props.values.source}
                />
                <AutoSubmit />
              </WideForm>
            )}
          </Formik>
          <Flex my={4} justifyContent={'space-evenly'}>
            <Button onClick={onDownloadClick}>Download</Button>
            <Button onClick={onSaveClick}>Save</Button>
          </Flex>
        </Box>
      </Flex>
    </Sidebar>
  );
}
