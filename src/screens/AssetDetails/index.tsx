import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { AppButton } from '../../components/AppButton';
import GoBackButton from '../../components/GoBackButton';
import { LinkingComponent } from '../../components/Linking';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';

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

const AssetDetails = () => {
  return (
    <Container>
      <GoBackButton />
      <ThemeSwitcher />

      <Content>
        <AssetDetailsInfo>
          <Header>
            <AssetInfo>
              <AssetInfoName>Weg</AssetInfoName>
              <AssetInfoTicket>WEGE3</AssetInfoTicket>
            </AssetInfo>

            <AssetImage source={{ uri: 'https://i.imgur.com/GpW6oKN.png' }} />
          </Header>

          <AssetProfileContainer>
            <Field>
              <View>
                <FieldTitle>Setor</FieldTitle>
                <FieldValue>Motores e compressores</FieldValue>
              </View>

              <LinkingComponent
                linking_text="Site do RI"
                linking_url="https://www.weg.net/institutional/BR/en/"
              />
            </Field>
            <Field>
              <View>
                <FieldTitle>Setor</FieldTitle>
                <FieldValue>Motores e compressores</FieldValue>
              </View>
            </Field>
            <Field>
              <View>
                <FieldTitle>Setor</FieldTitle>
                <FieldValue>Motores e compressores</FieldValue>
              </View>
            </Field>
            <Field>
              <View>
                <FieldTitle>Setor</FieldTitle>
                <FieldValue>Motores e compressores</FieldValue>
              </View>

              <View>
                <FieldTitle>Cotação</FieldTitle>
                <FieldValue>R$ 34.71</FieldValue>
              </View>
            </Field>
          </AssetProfileContainer>

          <SeasonalityContainer>
            <AppButton title="anual" style={styles.seasonalityButton}>
              Anual
            </AppButton>
            <AppButton
              title="semestral"
              selected={false}
              style={styles.seasonalityButton}
            >
              Trimestral
            </AppButton>
          </SeasonalityContainer>

          <PickerWrapper>
            <PickerContainer>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </PickerContainer>
          </PickerWrapper>

          <AssetFinancialContainer>
            <Field>
              <FieldTitle>Setor</FieldTitle>
              <FieldValue>Motores e compressores</FieldValue>
            </Field>
            <Field>
              <FieldTitle>Setor</FieldTitle>
              <FieldValue>Motores e compressores</FieldValue>
            </Field>
            <Field>
              <FieldTitle>Setor</FieldTitle>
              <FieldValue>Motores e compressores</FieldValue>
            </Field>
            <Field>
              <FieldTitle>Setor</FieldTitle>
              <FieldValue>Motores e compressores</FieldValue>
            </Field>
            <Field>
              <FieldTitle>Setor</FieldTitle>
              <FieldValue>Motores e compressores</FieldValue>
            </Field>
            <Field>
              <FieldTitle>Setor</FieldTitle>
              <FieldValue>Motores e compressores</FieldValue>
            </Field>
            <Field>
              <FieldTitle>Setor</FieldTitle>
              <FieldValue>Motores e compressores</FieldValue>
            </Field>
          </AssetFinancialContainer>
        </AssetDetailsInfo>

        <AddToWalletContainer>
          <ObsAboutAmountValueText>
            * Valores em milhões
          </ObsAboutAmountValueText>
          <AppButton title="adicionar">Adicionar a carteira</AppButton>
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
