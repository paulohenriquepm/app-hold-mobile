import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import NumericInput from 'react-native-numeric-input';

export const Container = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;

  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFValue(8)}px;
`;

export const Content = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
})``;

export const CloseModalButton = styled.TouchableOpacity`
  position: absolute;
  top: ${RFValue(16)}px;
  right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const AssetName = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: ${RFValue(8)}px;
`;

export const QuantityContainer = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const Quantity = styled(NumericInput)``;
