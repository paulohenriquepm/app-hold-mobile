import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Icon } from '../../components/Icon';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  position: relative;
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
  margin-bottom: ${RFValue(32)}px;
`;

export const WalletAssetsListContainer = styled.View``;

export const WalletAssetsListHeader = styled.View`
  flex-direction: row;
  width: 100%;

  margin-bottom: ${RFValue(16)}px;
`;

export const WalletAssetListHeaderAssetText = styled.Text`
  width: 23%;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const WalletAssetListHeaderQuantityText = styled.Text`
  width: 22%;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const WalletAssetListHeaderPatrimonyText = styled.Text`
  width: 30%;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const WalletAssetListHeaderTotalText = styled.Text`
  width: 25%;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const WalletAssetsListBody = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const WalletAssetsListBodyItem = styled.View`
  position: relative;
  flex-direction: row;
  margin-bottom: ${RFValue(8)}px;
`;

export const WalletAssetListBodyItemAssetText = styled.Text`
  width: 23%;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;

export const WalletAssetListBodyItemQuantityContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 22%;
`;

export const WalletAssetListBodyItemQuantityText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;

export const WalletAssetListBodyItemPatrimonyText = styled.Text`
  width: 30%;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;

export const WalletAssetListBodyItemTotalText = styled.Text`
  width: 25%;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;

export const TrashIconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`;

export const TrashIcon = styled(Icon)`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const EditIcon = styled(Icon)`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${RFValue(20)}px;
`;
