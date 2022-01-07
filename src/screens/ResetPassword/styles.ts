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
`;

export const FormContainer = styled.View`
  flex: 1;
  align-items: flex-start;

  width: 100%;
`;

export const TitleFormContainer = styled.View`
  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(24)}px;
`;

export const FormNewPasswordContainer = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const FormConfirmNewPasswordContainer = styled.View`
  margin-bottom: ${RFValue(32)}px;
`;

export const InfoText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${RFValue(24)}px;
  font-size: ${RFValue(14)}px;
  text-align: left;
`;
