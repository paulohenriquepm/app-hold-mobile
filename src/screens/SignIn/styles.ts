import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  padding: ${RFValue(48)}px ${RFValue(40)}px ${RFValue(32)}px ${RFValue(40)}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})``;

export const LogoAndFormContainer = styled.View`
  flex: 1;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${RFValue(16)}px;
`;

export const FormContainer = styled.View`
  flex: 1;
  align-items: flex-start;

  width: 100%;
`;

export const TitleFormContainer = styled.View`
  margin-bottom: ${RFValue(8)}px;
`;

export const TitleFormEmailContainer = styled.View`
  margin-bottom: ${RFValue(8)}px;
`;

export const TitleFormPasswordContainer = styled.View`
  margin-bottom: ${RFValue(8)}px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${RFValue(8)}px;
  margin-bottom: ${RFValue(32)}px;
`;

export const SignUpContainer = styled.View`
  margin-top: ${RFValue(48)}px;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

export const NewToAppHoldText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const SignUpText = styled.Text`
  margin-left: ${RFValue(4)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
