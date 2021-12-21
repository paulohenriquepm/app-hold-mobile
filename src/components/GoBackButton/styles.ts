import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  position: absolute;
  top: ${RFValue(32)}px;
  left: ${RFValue(16)}px;

  align-items: center;
  justify-content: center;
`;
