import { useTheme } from '../../config/Theme';
import { DoubleBounce } from 'styled-spinkit';
import { Flex } from 'reflexbox';

export function Spinner() {
  const theme = useTheme();
  return (
    <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <DoubleBounce size={80} color={theme.colors.paleBlue} />
    </Flex>
  );
}
