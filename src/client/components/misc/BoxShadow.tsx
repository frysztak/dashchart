import { styled } from '../../config/Theme';

export const TopBoxShadow = styled.div`
  box-shadow: 0 -${p => p.theme.boxShadow.offsetY} ${p => p.theme.boxShadow.blur} -${p => p.theme.boxShadow.spread}
    ${p => p.theme.boxShadow.color};
`;

export const RightBoxShadow = styled.div`
  box-shadow: ${p => p.theme.boxShadow.offsetX} 0 ${p => p.theme.boxShadow.blur} -${p => p.theme.boxShadow.spread} ${p => p.theme.boxShadow.color};
`;

export const BottomBoxShadow = styled.div`
  box-shadow: 0 ${p => p.theme.boxShadow.offsetY} ${p => p.theme.boxShadow.blur} -${p => p.theme.boxShadow.spread} ${p => p.theme.boxShadow.color};
`;

export const LeftBoxShadow = styled.div`
  box-shadow: -${p => p.theme.boxShadow.offsetY} 0 ${p => p.theme.boxShadow.blur} -${p => p.theme.boxShadow.spread}
    ${p => p.theme.boxShadow.color};
`;

export const BoxShadow = styled.div`
  box-shadow: 0 0 ${p => p.theme.boxShadow.blur} ${p => p.theme.boxShadow.color};
`;
