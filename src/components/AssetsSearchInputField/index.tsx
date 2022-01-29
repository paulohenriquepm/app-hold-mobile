import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { ViewProps, StyleSheet } from 'react-native';

import { IAsset } from '../../screens/AssetList';
import { AssetItem } from '../AssetItem';
import { SearchInput } from '../SearchInput';

import { Container, ResultsContainer, ResultsList } from './styles';

interface IAssetSearchInputFieldProps extends ViewProps {
  setSelectedAsset: Dispatch<SetStateAction<IAsset>>;
  top: number;
  onlyAssetsThatCanCalculateDividend?: number;
  functionToExecute?: () => void;
  shouldLoadAgain?: boolean;
}

const AssetsSearchInputField = ({
  setSelectedAsset,
  top,
  functionToExecute,
  onlyAssetsThatCanCalculateDividend = 0,
  ...rest
}: IAssetSearchInputFieldProps) => {
  const [filteredAssets, setFilteredAssets] = useState<IAsset[]>([]);
  const [shouldLoadAgain, setShouldLoadAgain] = useState(true);

  const handleSelectAsset = useCallback(
    (asset: IAsset) => {
      setSelectedAsset(asset);

      setFilteredAssets([]);
      setShouldLoadAgain(false);
      if (functionToExecute) {
        functionToExecute();
      }
    },
    [setSelectedAsset, functionToExecute],
  );

  return (
    <Container top={top} {...rest}>
      <SearchInput
        setFilteredAssets={setFilteredAssets}
        onlyAssetsThatCanCalculateDividend={onlyAssetsThatCanCalculateDividend}
        shouldLoadAgain={shouldLoadAgain}
        setShouldLoadAgain={setShouldLoadAgain}
      />
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
