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

export const FormInputContainer = styled.View`
  margin-bottom: ${RFValue(8)}px;
`;

export const SignInContainer = styled.View`
  margin-top: ${RFValue(48)}px;
  flex-direction: row;
  height: ${RFValue(48)}px;

  align-items: center;
  justify-content: center;
`;

export const AlreadyOnAppHoldText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const SignInTextContainer = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  margin-left: ${RFValue(4)}px;
`;

export const SignInText = styled.Text`
  margin-left: ${RFValue(4)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
