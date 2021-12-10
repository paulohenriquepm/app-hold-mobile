import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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

export const Asset = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${RFValue(16)}px;
  padding: ${RFValue(8)}px;
  border-width: ${RFValue(1)}px;
  border-color: ${({ theme }) => theme.colors.buttonGreyBorderColor};
  border-radius: ${RFValue(8)}px;
`;

export const AssetInfo = styled.View``;

export const AssetName = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const AssetSector = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.subText};
`;

export const AssetLogo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(32)}px;
`;
