import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { ViewProps, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { api } from '../../api/api';
import { IFilterAsset } from '../../screens/Calculator';
import { AssetItem } from '../AssetItem';
import { Icon } from '../Icon';

import {
  Container,
  SearchInputContainer,
  TextInputField,
  ResultsContainer,
  ResultsList,
} from './styles';

interface IFilterAssetResponse {
  data: IFilterAsset[];
}

interface IAssetSearchInputFieldProps extends ViewProps {
  setSelectedAsset: Dispatch<SetStateAction<IFilterAsset>>;
}

const AssetsSearchInputField = ({
  setSelectedAsset,
  ...rest
}: IAssetSearchInputFieldProps) => {
  const [filteredAssets, setFilteredAssets] = useState<IFilterAsset[]>([]);
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();

  const filterAssets = useCallback(async (searchAsset: string) => {
    if (searchAsset === '') {
      setFilteredAssets([]);

      return;
    }

    setLoading(true);

    const response = (await api.get('/assets', {
      params: {
        searchAsset,
        includeAssetData: false,
      },
    })) as IFilterAssetResponse;

    const mappedFilteredAssets = response.data.map(asset => {
      return {
        name: asset.name,
        b3_ticket: asset.b3_ticket,
        sector: asset.sector,
        logo: asset.logo,
        last_12_months_dividends: asset.last_12_months_dividends,
        total_stocks: asset.total_stocks,
        price: asset.price,
      };
    });

    setFilteredAssets(mappedFilteredAssets);
    setLoading(false);
  }, []);

  const handleSelectAsset = useCallback(
    (asset: IFilterAsset) => {
      setSelectedAsset(asset);

      setFilteredAssets([]);
    },
    [setSelectedAsset],
  );

  return (
    <Container {...rest}>
      <SearchInputContainer>
        <TextInputField
          minLength={1}
          onChangeText={(value: string) => filterAssets(value)}
          delayTimeout={500}
          placeholder="Ex: Weg ou WEGE3"
        />
        {loading ? (
          <ActivityIndicator size="small" color={colors.background} />
        ) : (
          <Icon name="search" />
        )}
      </SearchInputContainer>
      {filteredAssets.length > 0 && (
        <ResultsContainer>
          <ResultsList>
            {filteredAssets.map(asset => (
              <AssetItem
                key={asset.b3_ticket}
                title={asset.b3_ticket}
                asset={asset}
                style={styles.assetItem}
                onPress={() => handleSelectAsset(asset)}
              />
            ))}
          </ResultsList>
        </ResultsContainer>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  assetItem: {
    borderWidth: 0,
    marginBottom: 0,
  },
});

export { AssetsSearchInputField };
