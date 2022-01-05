import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { ViewProps, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

import { api } from '../../api/api';
import { IFilterAsset } from '../../screens/Calculator';
import { AssetItem } from '../AssetItem';
import { SearchInput } from '../SearchInput';

import { Container, ResultsContainer, ResultsList } from './styles';

interface IFilterAssetResponse {
  data: IFilterAsset[];
}

interface IAssetSearchInputFieldProps extends ViewProps {
  setSelectedAsset: Dispatch<SetStateAction<IFilterAsset>>;
  top: number;
  functionToExecute?: () => void;
}

const AssetsSearchInputField = ({
  setSelectedAsset,
  top,
  functionToExecute,
  ...rest
}: IAssetSearchInputFieldProps) => {
  const [filteredAssets, setFilteredAssets] = useState<IFilterAsset[]>([]);

  const handleSelectAsset = useCallback(
    (asset: IFilterAsset) => {
      setSelectedAsset(asset);

      setFilteredAssets([]);
      if (functionToExecute) {
        functionToExecute();
      }
    },
    [setSelectedAsset, functionToExecute],
  );

  return (
    <Container top={top} {...rest}>
      <SearchInput setFilteredAssets={setFilteredAssets} />
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
