import React from 'react';

import { Title } from '../../components/atoms/Title';
import { ThemeSwitcher } from '../../components/molecules/ThemeSwitcher';

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

const AssetList = () => {
  return (
    <Container>
      <ThemeSwitcher />

      <Content>
        <Header>
          <Title>Ativos</Title>
        </Header>

        <AssetListContainer>
          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>

          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>
          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>
          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>
          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>
          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>
          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>
          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>
          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>
          <Asset>
            <AssetInfo>
              <AssetName>WEG - WEGE3</AssetName>
              <AssetSector>Motores e Compressores</AssetSector>
            </AssetInfo>
            <AssetLogo source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Asset>
        </AssetListContainer>
      </Content>
    </Container>
  );
};

export { AssetList };
