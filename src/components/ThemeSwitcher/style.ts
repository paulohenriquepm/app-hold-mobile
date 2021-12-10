import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  position: absolute;
  top: ${RFValue(32)}px;
  right: ${RFValue(16)}px;
`;
