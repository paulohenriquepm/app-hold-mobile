import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import CurrencyInput from 'react-native-currency-input';

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
    position: 'relative',
    flexGrow: 1,
  },
})``;

export const Header = styled.View`
  margin-bottom: ${RFValue(120)}px;
`;

export const DividendWantedContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const DividendWantedValueInputField = styled(CurrencyInput)`
  width: 50%;
  margin-top: ${RFValue(16)}px;
  text-align: center;

  padding: ${RFValue(8)}px ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.buttonGreyBorderColor};
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(24)}px;
`;

export const DividendWantedResultContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const DividendWantedResultMoney = styled.Text`
  width: 50%;
  margin-top: ${RFValue(16)}px;
  text-align: center;

  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.buttonGreyBorderColor};
  border-radius: ${RFValue(8)}px;
`;

export const OrText = styled.Text`
  margin: ${RFValue(8)}px 0;
  font-size: ${RFValue(16)}px;
`;

export const StockCount = styled.Text`
  text-align: center;

  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.buttonGreyBorderColor};
  border-radius: ${RFValue(8)}px;
`;

export const ExplanationText = styled.Text`
  position: absolute;
  bottom: 0;

  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;
