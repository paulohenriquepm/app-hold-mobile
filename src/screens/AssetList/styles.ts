import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  padding: ${RFValue(48)}px ${RFValue(40)}px ${RFValue(32)}px ${RFValue(40)}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
})``;

export const Header = styled.View`
  margin-bottom: ${RFValue(24)}px;
`;

export const FilterContainer = styled.View`
  margin-top: ${RFValue(16)}px;
  flex-direction: row;
  align-items: center;
`;

export const FilterInputContainer = styled.View`
  width: 90%;
  margin-right: ${RFValue(8)}px;
`;

export const FilterIconContainer = styled.TouchableOpacity`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
`;

export const ResetFilterText = styled.Text`
  margin-top: ${RFValue(4)}px;
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const AssetListContainer = styled.ScrollView``;
