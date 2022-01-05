import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { ViewProps, StyleSheet } from 'react-native';

import { IAsset } from '../../screens/AssetList';
import { AssetItem } from '../AssetItem';
import { SearchInput } from '../SearchInput';

import { Container, ResultsContainer, ResultsList } from './styles';

interface IAssetSearchInputFieldProps extends ViewProps {
  setSelectedAsset: Dispatch<SetStateAction<IAsset>>;
  top: number;
  functionToExecute?: () => void;
}

const AssetsSearchInputField = ({
  setSelectedAsset,
  top,
  functionToExecute,
  ...rest
}: IAssetSearchInputFieldProps) => {
  const [filteredAssets, setFilteredAssets] = useState<IAsset[]>([]);

  const handleSelectAsset = useCallback(
    (asset: IAsset) => {
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
