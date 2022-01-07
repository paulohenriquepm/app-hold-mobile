import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';

import { AppButton } from '../../components/AppButton';
import GoBackButton from '../../components/GoBackButton';
import { LinkingComponent } from '../../components/Linking';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { api } from '../../api/api';
import { useAuth } from '../../context/auth';
import { LoadingScreen } from '../../components/LoadingScreen';

import {
  Container,
  Content,
  Header,
  AssetInfo,
  AssetImage,
  AssetInfoName,
  AssetInfoTicket,
  AssetDetailsInfo,
  AssetProfileContainer,
  AssetFinancialScrollView,
  AssetFinancialContainer,
  Field,
  FieldTitle,
  FieldValue,
  SeasonalityContainer,
  PickerWrapper,
  PickerContainer,
  AddToWalletContainer,
  ObsAboutAmountValueText,
} from './styles';

interface IRouteParams {
  assetId: string;
}

interface IAssetData {
  id: number;
  revenue: number;
  net_income: number;
  dividends_paid: number;
  fco: number;
  fcf: number;
  ebit: number;
  cash: number;
  equity: number;
  net_margin: number;
  roe: number;
  payout: number;
  year: number;
  quarter: number;
}

interface IAsset {
  id: number;
  name: string;
  logo: string;
  b3_ticket: string;
  sector: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  website: string;
  employees: number;
  ceo: string;
  price: number;
  AssetData: IAssetData[];
  annually: IAssetData[];
  quarterly: IAssetData[];
}

interface IFilterPeriod {
  value: string;
  label: string;
}

const formatValueInMillions = (value: number): number => {
  const formattedValue = new Intl.NumberFormat('pt-BR').format(value);
  const findIndexToCut = formattedValue.indexOf('.');

  return Number(formattedValue.substring(0, findIndexToCut + 4));
};

const formatAssetDataValuesInMillions = (asset: IAssetData) => {
  return {
    equity: formatValueInMillions(asset.equity),
    revenue: formatValueInMillions(asset.revenue),
    ebit: formatValueInMillions(asset.ebit),
    net_income: formatValueInMillions(asset.net_income),
    cash: formatValueInMillions(asset.cash),
    fco: formatValueInMillions(asset.fco),
    fcf: formatValueInMillions(asset.fcf),
    dividends_paid: formatValueInMillions(asset.dividends_paid),
  };
};

const AssetDetails = () => {
  const [loading, setLoading] = useState(false);
  const [addAssetLoading, setAddAssetLoading] = useState(false);
  const [asset, setAsset] = useState<IAsset>({} as IAsset);
  const [selectedPeriod, setSelectedPeriod] = useState({
    annually: true,
    quarterly: false,
    period: '2020',
  });
  const [filteredAssetData, setFilteredAssetData] = useState<
    IAssetData | undefined
  >({} as IAssetData);
  const [filterYearPeriods, setFilterYearPeriods] = useState<IFilterPeriod[]>(
    [],
  );
  const [filterQuarterPeriods, setFilterQuarterPeriods] = useState<
    IFilterPeriod[]
  >([]);

  const route = useRoute();
  const routeParams = route.params as IRouteParams;

  const { user } = useAuth();

  useEffect(() => {
    async function loadAsset() {
      try {
        setLoading(true);

        const response = await api.get(`assets/${routeParams.assetId}`);

        const formattedAsset = {
          ...response.data,
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(response.data.price),
          annually: response.data.AssetData.reduce(
            (prev: IAssetData[], current: IAssetData) => {
              if (current.quarter === null) {
                const formatted = {
                  ...current,
                  ...formatAssetDataValuesInMillions(current),
                };

                prev.push(formatted);
              }

              return prev;
            },
            [],
          ),
          quarterly: response.data.AssetData.reduce(
            (prev: IAssetData[], current: IAssetData) => {
              if (current.quarter) {
                const formatted = {
                  ...current,
                  ...formatAssetDataValuesInMillions(current),
                };

                prev.push(formatted);
              }

              return prev;
            },
            [],
          ),
        } as IAsset;

        setFilterYearPeriods(
          formattedAsset.annually.map((assetToGetYear: IAssetData) => {
            return {
              value: assetToGetYear.year.toString(),
              label: assetToGetYear.year.toString(),
            };
          }),
        );
        setFilterQuarterPeriods(
          formattedAsset.quarterly.map((assetToGetQuarter: IAssetData) => {
            return {
              value: `${assetToGetQuarter.quarter.toString()}/${assetToGetQuarter?.year.toString()}`,
              label: `${assetToGetQuarter.quarter
                .toString()
                .padStart(2, '0')}/${assetToGetQuarter?.year.toString()}`,
            };
          }),
        );
        setAsset(formattedAsset);
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao listar ativo',
          error?.response?.data?.message ||
            'Ocorreu um erro ao listar o ativo, por favor, tente novamente',
        );
      } finally {
        setLoading(false);
      }
    }

    loadAsset();
  }, [routeParams.assetId]);

  useEffect(() => {
    if (Object.keys(asset).length === 0) return;

    if (selectedPeriod.annually) {
      setFilteredAssetData(
        asset.annually?.find(
          assetToFilter =>
            assetToFilter.year.toString() === selectedPeriod.period,
        ),
      );

      return;
    }

    const quarter = selectedPeriod.period.split('/')[0];
    const year = selectedPeriod.period.split('/')[1];

    setFilteredAssetData(
      asset.quarterly?.find(
        assetToFilter =>
          assetToFilter.year.toString() === year &&
          assetToFilter.quarter.toString() === quarter,
      ),
    );
  }, [selectedPeriod, asset]);

  const addToWallet = useCallback(async () => {
    try {
      setAddAssetLoading(true);

      await api.post('/users-wallet-assets', {
        assetId: routeParams.assetId,
        userWalletId: user.wallet.id,
        quantity: 1,
      });

      Alert.alert(
        'Ativo adicionado com sucesso!',
        `${asset.name} foi adicionado com sucesso à sua carteira!`,
      );
    } catch (error: unknown) {
      console.log(error);
      Alert.alert(
        'Erro ao adicionar ativo',
        error?.response?.data?.message ||
          'Ocorreu um erro ao adicionar o ativo à sua carteira, por favor, tente novamente',
      );
    } finally {
      setAddAssetLoading(false);
    }
  }, [asset.name, routeParams.assetId, user.wallet.id]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <GoBackButton />
      <ThemeSwitcher />

      <Content>
        <AssetDetailsInfo>
          <Header>
            <AssetInfo>
              <AssetInfoName>{asset.name}</AssetInfoName>
              <AssetInfoTicket>{asset.b3_ticket}</AssetInfoTicket>
            </AssetInfo>

            <AssetImage source={{ uri: asset.logo }} />
          </Header>

          <AssetProfileContainer>
            <Field>
              <View>
                <FieldTitle>Setor</FieldTitle>
                <FieldValue>{asset.sector}</FieldValue>
              </View>

              <LinkingComponent
                linking_text="Site"
                linking_url={asset.website}
              />
            </Field>
            <Field>
              <View>
                <FieldTitle>Sede</FieldTitle>
                <FieldValue>
                  {asset.city}, {asset.state}
                </FieldValue>
              </View>
            </Field>
            <Field>
              <View>
                <FieldTitle>CEO</FieldTitle>
                <FieldValue>{asset.ceo}</FieldValue>
              </View>
            </Field>
            <Field>
              <View>
                <FieldTitle>Nº de funcionários</FieldTitle>
                <FieldValue>{asset.employees}</FieldValue>
              </View>

              <View>
                <FieldTitle>Cotação</FieldTitle>
                <FieldValue>{asset.price}</FieldValue>
              </View>
            </Field>
          </AssetProfileContainer>

          <SeasonalityContainer>
            <AppButton
              title="anual"
              style={styles.seasonalityButton}
              selected={selectedPeriod.annually}
              onPress={() =>
                setSelectedPeriod({
                  annually: true,
                  quarterly: false,
                  period: filterYearPeriods[0].value,
                })
              }
            >
              Anual
            </AppButton>
            <AppButton
              title="semestral"
              selected={selectedPeriod.quarterly}
              onPress={() =>
                setSelectedPeriod({
                  annually: false,
                  quarterly: true,
                  period: filterQuarterPeriods[0].value,
                })
              }
              style={styles.seasonalityButton}
            >
              Trimestral
            </AppButton>
          </SeasonalityContainer>

          <PickerWrapper>
            <PickerContainer
              selectedValue={selectedPeriod.period}
              onValueChange={(value: IFilterPeriod) =>
                setSelectedPeriod({
                  ...selectedPeriod,
                  period: value,
                })
              }
            >
              {(selectedPeriod.annually
                ? filterYearPeriods
                : filterQuarterPeriods
              ).map((filterPeriod: IFilterPeriod) => (
                <Picker.Item
                  key={filterPeriod.value}
                  label={filterPeriod.label}
                  value={filterPeriod.value}
                />
              ))}
            </PickerContainer>
          </PickerWrapper>

          <AssetFinancialContainer>
            <AssetFinancialScrollView>
              <Field>
                <FieldTitle>Patrimônio Liq.</FieldTitle>
                <FieldValue>{filteredAssetData?.equity}</FieldValue>
              </Field>
              <Field>
                <FieldTitle>Receita Liq.</FieldTitle>
                <FieldValue>{filteredAssetData?.revenue}</FieldValue>
              </Field>
              <Field>
                <FieldTitle>EBIT</FieldTitle>
                <FieldValue>{filteredAssetData?.ebit}</FieldValue>
              </Field>
              <Field>
                <FieldTitle>Lucro Liq.</FieldTitle>
                <FieldValue>{filteredAssetData?.net_income}</FieldValue>
              </Field>
              <Field>
                <FieldTitle>Margem Liq.</FieldTitle>
                <FieldValue>{filteredAssetData?.net_margin}%</FieldValue>
              </Field>
              {selectedPeriod.annually && (
                <Field>
                  <FieldTitle>ROE</FieldTitle>
                  <FieldValue>{filteredAssetData?.roe}%</FieldValue>
                </Field>
              )}
              <Field>
                <FieldTitle>Caixa</FieldTitle>
                <FieldValue>{filteredAssetData?.cash}</FieldValue>
              </Field>
              <Field>
                <FieldTitle>FCO</FieldTitle>
                <FieldValue>{filteredAssetData?.fco}</FieldValue>
              </Field>
              <Field>
                <FieldTitle>FCO</FieldTitle>
                <FieldValue>{filteredAssetData?.fco}</FieldValue>
              </Field>
              <Field>
                <FieldTitle>Dividendos</FieldTitle>
                <FieldValue>{filteredAssetData?.dividends_paid}</FieldValue>
              </Field>
              {selectedPeriod.annually && (
                <Field>
                  <FieldTitle>Payout</FieldTitle>
                  <FieldValue>{filteredAssetData?.payout}%</FieldValue>
                </Field>
              )}
            </AssetFinancialScrollView>
          </AssetFinancialContainer>
        </AssetDetailsInfo>

        <AddToWalletContainer>
          <ObsAboutAmountValueText>
            * Valores em BRL e na escala de milhões
          </ObsAboutAmountValueText>
          <AppButton
            title="adicionar"
            onPress={addToWallet}
            loading={addAssetLoading}
          >
            Adicionar a carteira
          </AppButton>
        </AddToWalletContainer>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  seasonalityButton: {
    width: '48%',
  },
});

export { AssetDetails };
