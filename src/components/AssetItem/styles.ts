import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import SvgUri from 'expo-svg-uri';

export const Asset = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${RFValue(10)}px;
  padding: ${RFValue(8)}px;
  border-width: ${RFValue(1)}px;
  border-color: ${({ theme }) => theme.colors.buttonGreyBorderColor};
  border-radius: ${RFValue(8)}px;
`;

export const AssetInfo = styled.View``;

export const AssetName = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const AssetSector = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const AssetLogo = styled(SvgUri)`
  width: ${RFValue(48)}px;
  height: ${RFValue(32)}px;
`;
