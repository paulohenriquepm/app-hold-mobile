import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Icon } from '../Icon';

export const Container = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
`;

export const LinkingText = styled.Text`
  height: 100%;
  margin-right: ${RFValue(4)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const LinkingIcon = styled(Icon)`
  height: 90%;
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.title};
`;
