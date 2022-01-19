import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { ViewProps, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { api } from '../../api/api';
import { IAsset } from '../../screens/AssetList';
import { Icon } from '../Icon';

import { SearchInputContainer, TextInputField } from './styles';

interface IFilterAssetResponse {
  data: {
    assets: IAsset[];
  };
}

interface IAssetSearchInputFieldProps extends ViewProps {
  setFilteredAssets: Dispatch<SetStateAction<IAsset[]>>;
  shouldClearOnEmpty?: boolean;
  onlyAssetsThatCanCalculateDividend?: number;
}

const SearchInput = ({
  setFilteredAssets,
  shouldClearOnEmpty = true,
  onlyAssetsThatCanCalculateDividend = 0,
  ...rest
}: IAssetSearchInputFieldProps) => {
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();

  const filterAssets = useCallback(
    async (nameOrTicket: string) => {
      if (nameOrTicket === '' && shouldClearOnEmpty) {
        setFilteredAssets([]);

        return;
      }

      setLoading(true);

      const response = (await api.get('/assets', {
        params: {
          nameOrTicket,
          onlyAssetsThatCanCalculateDividend,
        },
      })) as IFilterAssetResponse;

      const mappedFilteredAssets = response.data.assets.map(asset => {
        return {
          id: asset.id,
          name: asset.name,
          b3_ticket: asset.b3_ticket,
          sector: asset.sector,
          industry: asset.industry,
          logo: asset.logo,
          last_12_months_dividends: asset.last_12_months_dividends,
          total_stocks: asset.total_stocks,
          price: asset.price,
        };
      });

      setFilteredAssets(mappedFilteredAssets);
      setLoading(false);
    },
    [setFilteredAssets, shouldClearOnEmpty, onlyAssetsThatCanCalculateDividend],
  );

  return (
    <SearchInputContainer {...rest}>
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
  );
};

export { SearchInput };
