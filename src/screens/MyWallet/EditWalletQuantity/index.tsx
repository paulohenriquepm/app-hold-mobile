import React, { useEffect, useState } from 'react';
import NumericInput from 'react-native-numeric-input';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { api } from '../../../api/api';
import { useAuth } from '../../../context/auth';
import { Icon } from '../../../components/Icon';
import { Title } from '../../../components/Title';
import { AppButton } from '../../../components/AppButton';

import { IWalletAsset } from '..';

import {
  CloseModalButton,
  Container,
  Content,
  Header,
  AssetName,
  QuantityContainer,
  Quantity,
  UpdateQuantityButton,
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
  const { user } = useAuth();

  return (
    <Modal
      isVisible={isVisible}
      propagateSwipe
      onBackdropPress={toggleModal}
      coverScreen={false}
    >
      <Container>
        <CloseModalButton onPress={toggleModal}>
          <Icon name="x" />
        </CloseModalButton>
        <Content>
          <Header>
            <Title>Alterar Quantidade</Title>
          </Header>

          <AssetName>{assetToEdit.asset.b3_ticket}</AssetName>

          <QuantityContainer>
            <Quantity
              minValue={1}
              value={newQuantity}
              onChange={value => setNewQuantity(value)}
              rounded
              totalHeight={48}
              iconSize={16}
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
