import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Modal from 'react-native-modal';

import { api } from '../../../api/api';
import { useAuth } from '../../../context/auth';
import { useThemeContext } from '../../../context/theme';
import { AssetsSearchInputField } from '../../../components/AssetsSearchInputField';
import { Icon } from '../../../components/Icon';
import { Title } from '../../../components/Title';
import { IAsset } from '../../AssetList';

import { CloseModalButton, Container, Content, Header } from './styles';

interface AddToWalletProps {
  isVisible: boolean;
  toggleModal: () => void;
  functionToExecute: () => void;
}

const AddToWallet: React.FC<AddToWalletProps> = ({
  isVisible,
  toggleModal,
  functionToExecute,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<IAsset>({} as IAsset);

  const { user } = useAuth();
  const { currentTheme } = useThemeContext();

  useEffect(() => {
    async function addToWallet() {
      try {
        await api.post('/users-wallet-assets', {
          assetId: selectedAsset.id,
          userWalletId: user.wallet.id,
          quantity: 1,
        });

        Alert.alert(
          'Ativo adicionado com sucesso!',
          `${selectedAsset.name} foi adicionado com sucesso à sua carteira!`,
        );

        setSelectedAsset({} as IAsset);
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao adicionar ativo',
          error?.response?.data?.message ||
            'Ocorreu um erro ao adicionar o ativo à sua carteira, por favor, tente novamente',
        );
      }
    }

    if (Object.keys(selectedAsset).length > 0) {
      addToWallet();
    }
  }, [selectedAsset, user]);

  return (
    <Modal isVisible={isVisible} propagateSwipe onBackdropPress={toggleModal}>
      <Container>
        <CloseModalButton onPress={toggleModal}>
          <Icon name="close" color={currentTheme.colors.themeSwitcher} />
        </CloseModalButton>
        <Content>
          <Header>
            <Title>Adicionar Ativo</Title>
          </Header>

          <AssetsSearchInputField
            top={64}
            setSelectedAsset={setSelectedAsset}
            functionToExecute={functionToExecute}
          />
        </Content>
      </Container>
    </Modal>
  );
};

export { AddToWallet };
