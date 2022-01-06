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
  margin-bottom: ${RFValue(32)}px;
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

export const AssetListContainer = styled.ScrollView``;
