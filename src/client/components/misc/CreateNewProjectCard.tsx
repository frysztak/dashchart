import React, { useRef, useState } from 'react';
import { CreateNewCard } from './PreviewCard';
import { Box, Flex } from 'reflexbox';
import { styled } from '../../config/Theme';
import { Formik } from 'formik';
import { Input } from '@rebass/forms';
import { object, string } from 'yup';
import { Button } from 'rebass/styled-components';
import { LoadingState } from '../../store/project';
import { ThreeBounce } from 'styled-spinkit';
import { Icon } from './Icon';
import { ErrorCircle } from '@styled-icons/boxicons-regular';
import useOnClickOutside from 'use-onclickoutside';

export interface CreateNewProjectCardProps {
  state: LoadingState;
  submit: (name: string) => void;
}

const ParentWrapper = styled.div`
  position: relative;
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 16px;
  top: 100%;
  background-color: ${p => p.theme.colors.almostWhite};
`;

const ErrorIcon = Icon(ErrorCircle);

const StyledInput = styled(Input)`
  height: 40px;
`;

const StyledButton = styled(Button)`
  height: 40px;
  width: 80px;
`;

const StyledLoader = styled(ThreeBounce)`
  height: 40px;
  margin-top: 0;
  margin-bottom: 0;
`;

export function CreateNewProjectCard(props: CreateNewProjectCardProps) {
  const { submit, state } = props;

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((value: boolean) => !value);
  const onSubmit = ({ name }: { name: string }) => submit(name);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowModal(false));

  const validationSchema = object().shape({
    name: string().required('Please enter name'),
  });

  const buttonContent = () => {
    switch (state) {
      case LoadingState.IDLE:
        return <>Create</>;
      case LoadingState.LOADING:
        return <StyledLoader size={24} color={'black'} />;
      case LoadingState.ERROR:
        return <ErrorIcon size={24} color={'red'} />;
    }
  };
  return (
    <ParentWrapper ref={ref}>
      <CreateNewCard label={'Create new project...'} onClick={toggleModal} />
      {showModal && (
        <ModalWrapper>
          <Formik
            initialValues={{ name: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount={true}
          >
            {({ values, handleChange, isValid, submitForm }) => (
              <Flex justifyContent={'space-evenly'} alignItems={'center'}>
                <Box>
                  <StyledInput
                    id={'name'}
                    name={'name'}
                    type='text'
                    value={values.name}
                    required={true}
                    onChange={handleChange}
                    placeholder={'Project name...'}
                  />
                </Box>
                <Box>
                  <StyledButton
                    type={'submit'}
                    disabled={!isValid || state === LoadingState.LOADING}
                    onClick={submitForm}
                  >
                    <Flex alignItems={'center'} justifyContent={'center'}>
                      {buttonContent()}
                    </Flex>
                  </StyledButton>
                </Box>
              </Flex>
            )}
          </Formik>
        </ModalWrapper>
      )}
    </ParentWrapper>
  );
}
