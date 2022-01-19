import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Picker } from '@react-native-picker/picker';

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

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: ${RFValue(16)}px;
`;

export const AssetInfo = styled.View``;

export const AssetInfoName = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(24)}px;
`;

export const AssetInfoTicket = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;

export const AssetImage = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(32)}px;
`;

export const AssetDetailsInfo = styled.View``;

export const AssetProfileContainer = styled.View`
  padding: ${RFValue(4)}px ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const Field = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(4)}px;
  justify-content: space-between;
`;

export const FieldTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const FieldValue = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;

export const AssetFinancialScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const AssetFinancialContainer = styled.View`
  padding: ${RFValue(4)}px ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const SeasonalityContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${RFValue(8)}px;
`;

export const PickerWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFValue(4)}px;
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const PickerContainer = styled(Picker)`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFValue(40)}px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.buttonText};
`;

export const AddToWalletContainer = styled.View``;
