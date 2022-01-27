import React, {
  useEffect,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Alert, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';

import { Icon } from '../../../components/Icon';
import { Title } from '../../../components/Title';
import { api } from '../../../api/api';
import { LoadingScreen } from '../../../components/LoadingScreen';
import { AppButtonOpacity } from '../../../components/AppButtonOpacity';
import { useThemeContext } from '../../../context/theme';

import {
  Container,
  CloseModalButton,
  Content,
  Header,
  FiltersContainer,
  FilterTitle,
  FilterItem,
  PickerContainer,
} from './styles';

import { IFilterAsset } from '..';

interface FilterProps {
  isVisible: boolean;
  toggleModal: () => void;
  currentFilter: IFilterAsset;
  setFilters: Dispatch<SetStateAction<IFilterAsset>>;
}

const Filter = ({
  isVisible,
  toggleModal,
  currentFilter,
  setFilters,
}: FilterProps) => {
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] =
    useState<IFilterAsset>(currentFilter);

  const deviceHeight = Dimensions.get('screen').height;

  const { currentTheme } = useThemeContext();

  useEffect(() => {
    async function loadFilters() {
      try {
        setLoading(true);

        const response = await api.get('/assets/filter/all-options');

        setSectors(response.data.sectors);
        setIndustries(response.data.industries);
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao buscar filtros',
          error?.response?.data?.message ||
            'Ocorreu um erro ao buscar as opções de filtros, por favor, tente novamente',
        );
      } finally {
        setLoading(false);
      }
    }

    loadFilters();
  }, []);

  const handleFilter = useCallback(() => {
    toggleModal();
    setFilters({ ...selectedFilters });
  }, [selectedFilters, setFilters, toggleModal]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Modal
      isVisible={isVisible}
      propagateSwipe
      onBackdropPress={toggleModal}
      deviceHeight={deviceHeight}
      onBackButtonPress={toggleModal}
    >
      <Container>
        <CloseModalButton onPress={toggleModal}>
          <Icon name="close" color={currentTheme.colors.themeSwitcher} />
        </CloseModalButton>
        <Content>
          <FiltersContainer>
            <Header>
              <Title>Filtrar Ativos</Title>
            </Header>

            <FilterItem>
              <FilterTitle>Setor</FilterTitle>
              <PickerContainer
                selectedValue={selectedFilters.sector}
                onValueChange={(value: string) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    sector: value,
                  })
                }
              >
                <Picker.Item
                  key="placeholder"
                  label="Selecione um setor"
                  value=""
                />
                {sectors.map((sector: string) => (
                  <Picker.Item key={sector} label={sector} value={sector} />
                ))}
              </PickerContainer>
            </FilterItem>

            <FilterItem>
              <FilterTitle>Indústria</FilterTitle>
              <PickerContainer
                selectedValue={selectedFilters.industry}
                onValueChange={(value: string) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    industry: value,
                  })
                }
              >
                <Picker.Item
                  key="placeholder"
                  label="Selecione uma indústria"
                  value=""
                />
                {industries.map((industry: string) => (
                  <Picker.Item
                    key={industry}
                    label={industry}
                    value={industry}
                  />
                ))}
              </PickerContainer>
            </FilterItem>
          </FiltersContainer>

          <AppButtonOpacity title="filtrar" onPress={handleFilter}>
            Aplicar filtros
          </AppButtonOpacity>
        </Content>
      </Container>
    </Modal>
  );
};

export { Filter };
