import React, { useEffect, useState, useCallback } from 'react';
import {
  Alert,
  RefreshControl,
  ListRenderItemInfo,
  ActivityIndicator,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { api } from '../../api/api';
import { AssetItem } from '../../components/AssetItem';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Title } from '../../components/Title';
import { waitPromise } from '../../utils/waitPromise';
import { SearchInput } from '../../components/SearchInput';
import { Icon } from '../../components/Icon';
import { LoadingScreen } from '../../components/LoadingScreen';

import { Filter } from './Filter';
import { Sort } from './Sort';
import {
  Container,
  Content,
  Header,
  FilterContainer,
  AssetListContainer,
  AssetFlatList,
  FilterInputContainer,
  FilterIconContainer,
  ResetFilterText,
  FilterCountResults,
  FilterTextsContainer,
} from './styles';

export interface IAsset {
  id: number;
  name: string;
  b3_ticket: string;
  sector: string;
  industry?: string;
  logo: string;
  last_12_months_dividends: number;
  total_stocks: number;
  price: number;
}

export interface IFilterAsset {
  sector?: string;
  industry?: string;
}
export interface ISortAsset {
  orderByField: string;
  orderByDirection: string;
}

const AssetList = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [returnedEmptyFromFiltering, setReturnedEmptyFromFiltering] =
    useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [assetList, setAssetList] = useState<IAsset[]>([] as IAsset[]);
  const [filters, setFilters] = useState<IFilterAsset>({} as IFilterAsset);
  const [sortOptions, setSortOptions] = useState<ISortAsset>({
    orderByField: 'market_value',
    orderByDirection: 'desc',
  });

  const [nextCursorId, setNextCursorId] = useState('');

  const [assetsTotalCount, setAssetsTotalCount] = useState(0);

  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    async function filterAssets() {
      try {
        setLoading(true);
        setAssetList([]);

        const response = await api.get('/assets', {
          params: {
            sector: filters.sector,
            industry: filters.industry,
            orderByField: sortOptions.orderByField,
            orderByDirection: sortOptions.orderByDirection,
          },
        });

        const mappedAssetList = response.data.assets.map((asset: IAsset) => ({
          id: asset.id,
          name: asset.name,
          b3_ticket: asset.b3_ticket,
          sector: asset.sector,
          industry: asset.industry,
          logo: asset.logo,
        })) as IAsset[];

        setAssetList(mappedAssetList);
        setNextCursorId(response.data.nextCursorId);
        setAssetsTotalCount(response.data.totalCount);
        setReturnedEmptyFromFiltering(
          Object.keys(filters).length > 0 && response.data.assets.length === 0,
        );
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

    filterAssets();
  }, [filters, sortOptions]);

  async function loadInfiniteAssets() {
    try {
      if (!nextCursorId) return;

      setLoading(true);

      const response = await api.get('/assets', {
        params: {
          nextCursor: nextCursorId,
          sector: filters.sector,
        },
      });

      const mappedAssetList = response.data.assets.map((asset: IAsset) => ({
        id: asset.id,
        name: asset.name,
        b3_ticket: asset.b3_ticket,
        sector: asset.sector,
        logo: asset.logo,
      })) as IAsset[];

      setAssetList(prevState => [...prevState, ...mappedAssetList]);
      setNextCursorId(response.data.nextCursorId);
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

  const onRefresh = useCallback(() => {
    setFilters({} as IFilterAsset);
    setRefreshing(true);
    waitPromise(1000).then(() => setRefreshing(false));
  }, []);

  const handleNavigateToAssetDetails = useCallback(
    (asset_id: number) => {
      navigation.navigate('AssetDetails', { assetId: asset_id });
    },
    [navigation],
  );

  const handleToggleShowFilterModal = useCallback(() => {
    setShowFilterModal(!showFilterModal);
  }, [showFilterModal]);

  const handleToggleShowOrderModal = useCallback(() => {
    setShowOrderModal(!showOrderModal);
  }, [showOrderModal]);

  if (loading && assetList.length === 0) {
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
        <Header>
          <Title>Ativos</Title>
          <FilterContainer>
            <FilterInputContainer>
              <SearchInput
                accessibilityLabel="buscar por ativo por nome ou ticket"
                setFilteredAssets={setAssetList}
                shouldClearOnEmpty={false}
              />
            </FilterInputContainer>

            <FilterIconContainer
              accessibilityLabel="ordernar ativos"
              onPress={handleToggleShowOrderModal}
            >
              <Icon name="sort" />
            </FilterIconContainer>
            <FilterIconContainer
              accessibilityLabel="filtrar ativos"
              onPress={handleToggleShowFilterModal}
            >
              <Icon name="filter-alt" />
            </FilterIconContainer>
          </FilterContainer>

          <FilterTextsContainer>
            <FilterCountResults>
              {assetsTotalCount} resultados
            </FilterCountResults>
            {Object.keys(filters).length > 0 && (
              <ResetFilterText onPress={onRefresh}>
                Remover filtros
              </ResetFilterText>
            )}
          </FilterTextsContainer>
        </Header>

        <AssetListContainer>
          <AssetFlatList
            showsVerticalScrollIndicator={false}
            data={assetList}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => loadInfiniteAssets()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              <LoadingAssetListFoot loading={loading} color={colors.primary} />
            }
            renderItem={({ item }: ListRenderItemInfo<IAsset>) => (
              <AssetItem
                accessibilityLabel={item.name}
                key={item.id}
                onPress={() => handleNavigateToAssetDetails(item.id)}
                title={item.name}
                asset={item}
              />
            )}
          />
        </AssetListContainer>
      </Content>

      {(assetList.length > 0 || returnedEmptyFromFiltering) && (
        <>
          <Filter
            isVisible={showFilterModal}
            currentFilter={filters}
            setFilters={setFilters}
            toggleModal={handleToggleShowFilterModal}
          />
          <Sort
            isVisible={showOrderModal}
            currentSort={sortOptions}
            setSort={setSortOptions}
            toggleModal={handleToggleShowOrderModal}
          />
        </>
      )}
    </Container>
  );
};

type loadingAssetListFooterType = {
  loading: boolean;
  color: string;
};

const LoadingAssetListFoot = ({
  loading,
  color,
}: loadingAssetListFooterType) => {
  if (!loading) return null;

  return (
    <View>
      <ActivityIndicator size="small" color={color} />
    </View>
  );
};

export { AssetList };
