import { styled } from '../../config/Theme';

const Base = styled.div`
  height: 100%;
  width: 100%;
`;

export const TopBoxShadow = styled(Base)`
  box-shadow: 0 -${p => p.theme.boxShadow.offsetY} ${p => p.theme.boxShadow.blur} -${p => p.theme.boxShadow.spread}
    ${p => p.theme.boxShadow.color};
`;

export const RightBoxShadow = styled(Base)`
  box-shadow: ${p => p.theme.boxShadow.offsetX} 0 ${p => p.theme.boxShadow.blur} -${p => p.theme.boxShadow.spread} ${p => p.theme.boxShadow.color};
`;

export const BottomBoxShadow = styled(Base)`
  box-shadow: 0 ${p => p.theme.boxShadow.offsetY} ${p => p.theme.boxShadow.blur} -${p => p.theme.boxShadow.spread} ${p => p.theme.boxShadow.color};
`;

export const LeftBoxShadow = styled(Base)`
  box-shadow: -${p => p.theme.boxShadow.offsetY} 0 ${p => p.theme.boxShadow.blur} -${p => p.theme.boxShadow.spread}
    ${p => p.theme.boxShadow.color};
`;

export const BoxShadow = styled(Base)`
  box-shadow: 0 0 ${p => p.theme.boxShadow.blur} ${p => p.theme.boxShadow.color};
`;
