import React, { useState } from 'react';
import Modal from 'react-native-modal';

import { Icon } from '../../../components/Icon';
import { Title } from '../../../components/Title';
import { AppButton } from '../../../components/AppButton';
import { useThemeContext } from '../../../context/theme';

import { IWalletAsset } from '..';

import {
  CloseModalButton,
  Container,
  Content,
  Header,
  AssetName,
  QuantityContainer,
  Quantity,
} from './styles';

interface EditWalletQuantityProps {
  isVisible: boolean;
  toggleModal: () => void;
  assetToEdit: IWalletAsset;
  handleEditAssetQuantity: (wallet_asset_id: number, quantity: number) => void;
}

const EditWalletQuantity: React.FC<EditWalletQuantityProps> = ({
  isVisible,
  toggleModal,
  assetToEdit,
  handleEditAssetQuantity,
}) => {
  const [newQuantity, setNewQuantity] = useState(assetToEdit.quantity);

  const { currentTheme } = useThemeContext();

  return (
    <Modal
      isVisible={isVisible}
      propagateSwipe
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      coverScreen={false}
    >
      <Container>
        <CloseModalButton onPress={toggleModal}>
          <Icon name="close" color={currentTheme.colors.themeSwitcher} />
        </CloseModalButton>
        <Content>
          <Header>
            <Title>Alterar Quantidade</Title>
          </Header>

          <QuantityContainer>
            <AssetName>{assetToEdit.asset.b3_ticket}</AssetName>
            <Quantity
              minValue={1}
              value={newQuantity}
              onChange={value => setNewQuantity(value)}
              rounded
              totalHeight={48}
              iconSize={16}
              textColor={currentTheme.colors.themeSwitcher}
            />
          </QuantityContainer>
          <AppButton
            title="alterar quantidade"
            onPress={() => handleEditAssetQuantity(assetToEdit.id, newQuantity)}
          >
            Alterar quantidade
          </AppButton>
        </Content>
      </Container>
    </Modal>
  );
};

export { EditWalletQuantity };
