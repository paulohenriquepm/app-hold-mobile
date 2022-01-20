import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  backgroundColor: string;
  selected: boolean;
}
interface ButtonTextProps {
  selected: boolean;
}

export const AccessibilityContainer = styled.View``;

export const Container = styled(RectButton)<ContainerProps>`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${RFValue(48)}px;

  background-color: ${({ backgroundColor, selected, theme }) =>
    selected ? backgroundColor : theme.colors.secondary};
  border-radius: ${RFValue(8)}px;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({ selected, theme }) =>
    selected ? theme.colors.buttonText : theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;
