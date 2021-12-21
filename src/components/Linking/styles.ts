import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Icon } from '../Icon';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: ${RFValue(16)}px;
`;

export const LinkingText = styled.Text`
  margin-right: ${RFValue(4)}px;
`;

export const LinkingIcon = styled(Icon)`
  font-size: ${RFValue(10)}px;
`;
