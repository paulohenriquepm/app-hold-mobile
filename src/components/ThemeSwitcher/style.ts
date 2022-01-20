import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${RFValue(16)}px;
  right: ${RFValue(16)}px;
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
`;
