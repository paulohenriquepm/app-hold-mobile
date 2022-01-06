import React, { useEffect, useState, useCallback } from 'react';
import { Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { api } from '../../api/api';
import { AssetItem } from '../../components/AssetItem';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Title } from '../../components/Title';
import { waitPromise } from '../../utils/waitPromise';
import { SearchInput } from '../../components/SearchInput';
import { Icon } from '../../components/Icon';

import {
  Container,
  Content,
  Header,
  FilterContainer,
  AssetListContainer,
  FilterInputContainer,
} from './styles';

export interface IAsset {
  id: number;
  name: string;
  b3_ticket: string;
  sector: string;
  logo: string;
  last_12_months_dividends: number;
  total_stocks: number;
  price: number;
}

const AssetList = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [assetList, setAssetList] = useState<IAsset[]>([] as IAsset[]);

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
          id: asset.id,
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    waitPromise(1000).then(() => setRefreshing(false));
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

      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header>
          <Title>Ativos</Title>
          <FilterContainer>
            <FilterInputContainer>
              <SearchInput
                setFilteredAssets={setAssetList}
                shouldClearOnEmpty={false}
              />
            </FilterInputContainer>

            <Icon name="filter" />
          </FilterContainer>
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
