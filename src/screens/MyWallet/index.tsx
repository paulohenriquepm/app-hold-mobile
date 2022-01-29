import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { AppButton } from '../../components/AppButton';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Title } from '../../components/Title';
import { api } from '../../api/api';
import { useAuth } from '../../context/auth';
import { waitPromise } from '../../utils/waitPromise';
import { LoadingScreen } from '../../components/LoadingScreen';

import { AddToWallet } from './AddToWallet';
import { EditWalletQuantity } from './EditWalletQuantity';
import {
  Container,
  Content,
  Header,
  WalletAssetsListContainer,
  WalletAssetsListHeader,
  WalletAssetListHeaderAssetText,
  WalletAssetListHeaderQuantityText,
  WalletAssetListHeaderPatrimonyText,
  WalletAssetListHeaderTotalText,
  WalletAssetsListBody,
  WalletAssetsListBodyItem,
  WalletAssetListBodyItemAssetText,
  WalletAssetListBodyItemQuantityContainer,
  WalletAssetListBodyItemQuantityText,
  WalletAssetListBodyItemPatrimonyText,
  WalletAssetListBodyItemTotalText,
  TrashIconContainer,
  TrashIcon,
  EditIcon,
} from './styles';

interface IAsset {
  price: number;
  name: string;
  b3_ticket: string;
}

export interface IWalletAsset {
  id: number;
  quantity: number;
  assetId: number;
  userWalletId: number;
  asset: IAsset;
  patrimony: string;
  patrimonyInPercentage: string;
}

const calculatePatrimonyInPercentage = (
  wallet: IWalletAsset[],
  assetToCalculate: IWalletAsset,
): string => {
  const totalPatrimony = wallet.reduce(
    (total: number, item: IWalletAsset) =>
      total + item.quantity * item.asset.price,
    0,
  );

  return `${(
    (assetToCalculate.quantity * assetToCalculate.asset.price * 100) /
    totalPatrimony
  ).toFixed(2)}%`;
};

const MyWallet = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddToWalletSearching, setShowAddToWalletSearching] =
    useState(false);
  const [showEditWalletAssetQuantity, setShowEditWalletAssetQuantity] =
    useState(false);
  const [wallet, setWallet] = useState<IWalletAsset[]>([]);
  const [walletAssetToEdit, setWalletAssetToEdit] = useState<IWalletAsset>(
    {} as IWalletAsset,
  );

  const { user } = useAuth();

  useEffect(() => {
    async function loadWallet() {
      try {
        if (refreshing) return;

        setLoading(true);

        const response = await api.get(`users-wallet-assets/${user.wallet.id}`);

        const formattedWallet = response.data.map(
          (walletAsset: IWalletAsset) => ({
            ...walletAsset,
            patrimony: new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(walletAsset.quantity * walletAsset.asset.price),
            patrimonyInPercentage: calculatePatrimonyInPercentage(
              response.data,
              walletAsset,
            ),
          }),
        );

        setWallet(formattedWallet);
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao listar carteira',
          error?.response?.data?.message ||
            'Ocorreu um erro ao listar a sua carteira, por favor, tente novamente',
        );
      } finally {
        setLoading(false);
      }
    }

    loadWallet();
  }, [user, refreshing]);

  useFocusEffect(
    useCallback(() => {
      const loadWalletData = async () => {
        const response = await api.get(`users-wallet-assets/${user.wallet.id}`);

        const formattedWallet = response.data.map(
          (walletAsset: IWalletAsset) => ({
            ...walletAsset,
            patrimony: new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(walletAsset.quantity * walletAsset.asset.price),
            patrimonyInPercentage: calculatePatrimonyInPercentage(
              response.data,
              walletAsset,
            ),
          }),
        );

        setWallet(formattedWallet);
      };

      loadWalletData();
    }, [user]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    waitPromise(1000).then(() => setRefreshing(false));
  }, []);

  const handleToggleShowAddToWalletSearching = useCallback(() => {
    setShowAddToWalletSearching(!showAddToWalletSearching);
    onRefresh();
  }, [showAddToWalletSearching, onRefresh]);

  const handleToggleShowEditWalletAssetQuantity = useCallback(() => {
    setShowEditWalletAssetQuantity(!showEditWalletAssetQuantity);
    onRefresh();
  }, [showEditWalletAssetQuantity, onRefresh]);

  const handleOpenShowEditWalletQuantityModal = useCallback(
    (asset: IWalletAsset) => {
      setWalletAssetToEdit(asset);
      setShowEditWalletAssetQuantity(true);
    },
    [],
  );

  const deleteAssetFromWallet = useCallback(
    async (user_wallet_asset_id: number) => {
      try {
        await api.delete(`users-wallet-assets/${user_wallet_asset_id}`);

        Alert.alert('Ativo deletado com sucesso!');
        onRefresh();
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao deletar ativo',
          error?.response?.data?.message ||
            'Ocorreu um erro ao deletar o ativo de sua carteira, por favor, tente novamente',
        );
      }
    },
    [onRefresh],
  );

  const handleOpenDeleteAssetAlertDialog = useCallback(
    (user_wallet_asset_id: number, user_wallet_asset_ticket: string) => {
      Alert.alert(
        'Atenção!',
        `Deseja realmente excluir ${user_wallet_asset_ticket} de sua carteira?`,
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim, excluir',
            onPress: () => deleteAssetFromWallet(user_wallet_asset_id),
          },
        ],
      );
    },
    [deleteAssetFromWallet],
  );

  const handleEditAssetQuantity = useCallback(
    async (wallet_asset_id: number, quantityToUpdate: number) => {
      try {
        await api.patch(`users-wallet-assets/${wallet_asset_id}`, {
          quantity: quantityToUpdate,
        });

        Alert.alert('Quantidade atualizada com sucesso!');

        handleToggleShowEditWalletAssetQuantity();
        setWalletAssetToEdit({} as IWalletAsset);
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao atualizar quantidade',
          error?.response?.data?.message ||
            'Ocorreu um erro ao atualizar a quantidade do ativo, por favor, tente novamente',
        );
      }
    },
    [handleToggleShowEditWalletAssetQuantity],
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <ThemeSwitcher />

      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WalletAssetsListContainer>
          <Header>
            <Title>Minha carteira</Title>
          </Header>

          <WalletAssetsListHeader>
            <WalletAssetListHeaderAssetText>
              Ativo
            </WalletAssetListHeaderAssetText>
            <WalletAssetListHeaderQuantityText>
              Quant.
            </WalletAssetListHeaderQuantityText>
            <WalletAssetListHeaderPatrimonyText>
              Patrimônio
            </WalletAssetListHeaderPatrimonyText>
            <WalletAssetListHeaderTotalText>
              Total %
            </WalletAssetListHeaderTotalText>
          </WalletAssetsListHeader>

          <WalletAssetsListBody>
            {wallet.map((walletAsset: IWalletAsset) => (
              <WalletAssetsListBodyItem key={walletAsset.id}>
                <WalletAssetListBodyItemAssetText>
                  {walletAsset.asset.b3_ticket}
                </WalletAssetListBodyItemAssetText>
                <WalletAssetListBodyItemQuantityContainer
                  onPress={() =>
                    handleOpenShowEditWalletQuantityModal(walletAsset)
                  }
                >
                  <WalletAssetListBodyItemQuantityText>
                    {walletAsset.quantity}
                  </WalletAssetListBodyItemQuantityText>

                  <EditIcon name="edit" />
                </WalletAssetListBodyItemQuantityContainer>
                <WalletAssetListBodyItemPatrimonyText>
                  {walletAsset.patrimony}
                </WalletAssetListBodyItemPatrimonyText>
                <WalletAssetListBodyItemTotalText>
                  {walletAsset.patrimonyInPercentage}
                </WalletAssetListBodyItemTotalText>
                <TrashIconContainer
                  onPress={() =>
                    handleOpenDeleteAssetAlertDialog(
                      walletAsset.id,
                      walletAsset.asset.b3_ticket,
                    )
                  }
                >
                  <TrashIcon name="delete" />
                </TrashIconContainer>
              </WalletAssetsListBodyItem>
            ))}
          </WalletAssetsListBody>
        </WalletAssetsListContainer>

        <AppButton
          accessibilityLabel="botão de adicionar ativo"
          title="adicionar"
          onPress={() => setShowAddToWalletSearching(true)}
        >
          Adicionar um ativo
        </AppButton>
      </Content>

      <AddToWallet
        isVisible={showAddToWalletSearching}
        toggleModal={() => setShowAddToWalletSearching(false)}
        functionToExecute={handleToggleShowAddToWalletSearching}
      />

      {Object.keys(walletAssetToEdit).length > 0 && (
        <EditWalletQuantity
          isVisible={showEditWalletAssetQuantity}
          toggleModal={() => {
            setShowEditWalletAssetQuantity(false);
            setWalletAssetToEdit({} as IWalletAsset);
          }}
          assetToEdit={walletAssetToEdit}
          handleEditAssetQuantity={handleEditAssetQuantity}
        />
      )}
    </Container>
  );
};

export { MyWallet };
