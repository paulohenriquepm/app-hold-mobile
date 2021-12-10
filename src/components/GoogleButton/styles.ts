import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${RFValue(40)}px;

  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFValue(8)}px;
  border-color: ${({ theme }) => theme.colors.buttonGreyBorderColor};
  border-width: ${RFValue(1)}px;
`;

export const Button = styled(RectButton)`
  width: 100%;
`;
