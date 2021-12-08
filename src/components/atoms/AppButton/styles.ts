import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${RFValue(40)}px;

  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${RFValue(8)}px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.buttonText};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
`;
