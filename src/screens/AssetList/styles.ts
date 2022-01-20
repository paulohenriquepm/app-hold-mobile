import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  padding: ${RFValue(48)}px ${RFValue(40)}px ${RFValue(32)}px ${RFValue(40)}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View``;

export const Header = styled.View`
  margin-bottom: ${RFValue(24)}px;
`;

export const FilterContainer = styled.View`
  margin-top: ${RFValue(16)}px;
  flex-direction: row;
  align-items: center;
`;

export const FilterInputContainer = styled.View`
  height: ${RFValue(48)}px;
  width: 60%;
  margin-right: ${RFValue(8)}px;
`;

export const FilterIconContainer = styled.TouchableOpacity`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterTextsContainer = styled.View`
  margin-top: ${RFValue(4)}px;
  padding: 0 ${RFValue(4)}px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const FilterCountResults = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.placeholder};
`;

export const ResetFilterText = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const AssetListContainer = styled.View``;

export const AssetFlatList = styled.FlatList`
  height: 80%;
`;
