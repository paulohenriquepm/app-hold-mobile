import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  padding: ${RFValue(48)}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
})``;

export const Header = styled.View`
  margin-bottom: ${RFValue(32)}px;
`;

export const AssetListContainer = styled.ScrollView``;
