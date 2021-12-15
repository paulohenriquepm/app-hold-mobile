import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  padding: ${RFValue(48)}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  margin-bottom: ${RFValue(64)}px;
`;

export const Content = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})``;

export const FormContainer = styled.View``;

export const FormProfileInfoContainer = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const FormPasswordInfoContainer = styled.View``;

export const FormInputContainer = styled.View`
  margin-bottom: ${RFValue(24)}px;
`;

export const ButtonsContainer = styled.View``;
