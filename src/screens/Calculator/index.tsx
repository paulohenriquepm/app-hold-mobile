import React, { useState, useCallback } from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Title } from '../../components/Title';
import { AssetsSearchInputField } from '../../components/AssetsSearchInputField';
import { SubTitle } from '../../components/SubTitle';
import { IAsset } from '../AssetList';

import {
  Container,
  Content,
  Header,
  DividendWantedContainer,
  DividendWantedValueInputField,
  DividendWantedResultContainer,
  DividendWantedResultMoney,
  OrText,
  StockCount,
  ExplanationText,
} from './styles';

const Calculator = () => {
  const [dividendWantedValue, setDividendWantedValue] = useState(0);
  const [totalAmountToBuy, setTotalAmountToBuy] = useState('');
  const [totalAmountToBuyInStocks, setTotalAmountToBuyInStocks] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<IAsset>({} as IAsset);

  const calculateAmount = useCallback(
    (dividendValue: number, asset: IAsset) => {
      const dividendPerStock =
        selectedAsset.last_12_months_dividends /
        12 /
        selectedAsset.total_stocks;

      const numberOfStocksToBuy = dividendValue / dividendPerStock;
      const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(asset.price);
      setTotalAmountToBuyInStocks(
        `${Math.round(numberOfStocksToBuy)} ações à ${formattedPrice}`,
      );

      const amountToBuy = numberOfStocksToBuy * asset.price;
      const formattedAmountToBuy = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amountToBuy);

      setTotalAmountToBuy(formattedAmountToBuy);
    },
    [selectedAsset],
  );

  const handleDividendWanted = useCallback(
    dividendValue => {
      setDividendWantedValue(dividendValue);
      calculateAmount(dividendValue, selectedAsset);
    },
    [selectedAsset, calculateAmount],
  );

  return (
    <Container>
      <ThemeSwitcher />

      <Content>
        <Header>
          <Title>Calculadora de dividendos</Title>
        </Header>

        <AssetsSearchInputField
          top={100}
          setSelectedAsset={setSelectedAsset}
          onlyAssetsThatCanCalculateDividend={1}
        />

        {Object.keys(selectedAsset).length > 0 && (
          <>
            <DividendWantedContainer>
              <SubTitle>
                Dividendos mensais de {selectedAsset.name} que desejo receber:
              </SubTitle>
              <DividendWantedValueInputField
                value={dividendWantedValue}
                onChangeValue={handleDividendWanted}
                unit="R$"
                delimiter=","
                separator="."
                precision={2}
              />
            </DividendWantedContainer>

            {totalAmountToBuy !== '' && totalAmountToBuy !== '' && (
              <DividendWantedResultContainer>
                <SubTitle>Você irá precisar investir cerca de:</SubTitle>
                <DividendWantedResultMoney>
                  {totalAmountToBuy}
                </DividendWantedResultMoney>
                <OrText>Ou</OrText>
                <StockCount>{totalAmountToBuyInStocks}</StockCount>
              </DividendWantedResultContainer>
            )}
          </>
        )}

        <ExplanationText>
          * Os cálculos são baseados nos dividendos distribuídos nos últimos 12
          meses, sendo apenas uma estimativa.
        </ExplanationText>
      </Content>
    </Container>
  );
};

export { Calculator };
