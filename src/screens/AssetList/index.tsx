import React, { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { api } from '../../api/api';
import { AssetItem } from '../../components/AssetItem';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Title } from '../../components/Title';

import { Container, Content, Header, AssetListContainer } from './styles';

interface IAsset {
  id: number;
  name: string;
  b3_ticket: string;
  sector: string;
  logo: string;
}

const AssetList = () => {
  const [assetList, setAssetList] = useState<IAsset[]>([] as IAsset[]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadAssets() {
      try {
        setLoading(true);

        const response = await api.get('/assets', {
          params: {
            includeAssetData: 'false',
          },
        });

        const mappedAssetList = response.data.map((asset: IAsset) => ({
          name: asset.name,
          b3_ticket: asset.b3_ticket,
          sector: asset.sector,
          logo: asset.logo,
        })) as IAsset[];

        setAssetList(mappedAssetList);
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao listar ativos',
          error?.response?.data?.message ||
            'Ocorreu um erro ao listar os ativos, por favor, tente novamente',
        );
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  const handleNavigateToAssetDetails = useCallback(
    (asset_id: number) => {
      navigation.navigate('AssetDetails', { assetId: asset_id });
    },
    [navigation],
  );

  if (loading) {
    return <Title>Loading...</Title>;
  }

  return (
    <Container>
      <ThemeSwitcher />

      <Content>
        <Header>
          <Title>Ativos</Title>
        </Header>

        <AssetListContainer>
          {assetList.map(asset => (
            <AssetItem
              key={asset.id}
              onPress={() => handleNavigateToAssetDetails(asset.id)}
              title={asset.name}
              asset={asset}
            />
          ))}
        </AssetListContainer>
      </Content>
    </Container>
  );
};

export { AssetList };
