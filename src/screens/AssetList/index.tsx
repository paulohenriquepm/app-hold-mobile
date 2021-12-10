import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { api } from '../../api/api';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Title } from '../../components/Title';

import {
  Container,
  Content,
  Header,
  AssetListContainer,
  Asset,
  AssetInfo,
  AssetName,
  AssetSector,
  AssetLogo,
} from './styles';

interface IAsset {
  name: string;
  b3_ticket: string;
  sector: string;
  logo: string;
}

const AssetList = () => {
  const [assetList, setAssetList] = useState<IAsset[]>([] as IAsset[]);
  const [loading, setLoading] = useState(false);

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
            'Falha ao listar os ativos, tente novamente',
        );
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

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
            <Asset>
              <AssetInfo>
                <AssetName>
                  {asset.name} - {asset.b3_ticket}
                </AssetName>
                <AssetSector>{asset.sector}</AssetSector>
              </AssetInfo>
              <AssetLogo source={{ uri: asset.logo }} />
            </Asset>
          ))}
        </AssetListContainer>
      </Content>
    </Container>
  );
};

export { AssetList };
