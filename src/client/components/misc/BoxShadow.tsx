import { styled } from '../../config/Theme';

export interface BoxShadowProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Base = styled.div<BoxShadowProps>`
  height: ${p => p.height || '100%'};
  width: ${p => p.width || '100%'};
  border-radius: ${p => p.borderRadius || ''};
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
