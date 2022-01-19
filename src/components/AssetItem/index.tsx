import React from 'react';
import { ButtonProps } from 'react-native';

import { Asset, AssetInfo, AssetName, AssetSector, AssetLogo } from './styles';

interface IAsset {
  name: string;
  b3_ticket: string;
  sector: string;
  industry?: string;
  logo: string;
}

interface IAssetItemProps extends ButtonProps {
  asset: IAsset;
  style?: {
    borderWidth: number;
    marginBottom: number;
  };
}

const AssetItem = ({
  asset,
  style,
  ...rest
}: IAssetItemProps): React.ReactElement => {
  return (
    <Asset style={style} {...rest}>
      <AssetInfo>
        <AssetName>
          {asset.name} - {asset.b3_ticket}
        </AssetName>
        <AssetSector>Setor: {asset.sector}</AssetSector>
        {asset?.industry && (
          <AssetSector>Indústria: {asset.industry}</AssetSector>
        )}
      </AssetInfo>
      {asset.logo !== '' && <AssetLogo source={{ uri: asset.logo }} />}
    </Asset>
  );
};

export { AssetItem };
