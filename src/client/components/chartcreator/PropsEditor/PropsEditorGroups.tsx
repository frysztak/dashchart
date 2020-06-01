import { styled } from '../../../config/Theme';
import { PropsEditorGroup } from './PropsEditorGroup';
import { Flex } from 'reflexbox';

export const FormikWrapper = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

export const Group = styled(PropsEditorGroup)`
  & + & {
    margin-top: 16px;
  }
  & & {
    margin-left: 16px;
  }
`;

export const PropEditorGroups = styled(Flex)`
  flex-direction: column;
`;

export const WideForm = styled.form`
  width: 100%;
`;
