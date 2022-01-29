import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import NumericInput from 'react-native-numeric-input';

export const Container = styled.View`
  width: 100%;
  height: 50%;
  padding: ${RFValue(24)}px;

  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFValue(8)}px;
`;

export const Content = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})``;

export const CloseModalButton = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(8)}px;
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  margin-top: ${RFValue(16)}px;
`;

export const AssetName = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: ${RFValue(8)}px;
`;

export const QuantityContainer = styled.View``;

export const Quantity = styled(NumericInput)``;
