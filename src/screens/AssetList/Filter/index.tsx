import React, {
  useEffect,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';

import { Icon } from '../../../components/Icon';
import { Title } from '../../../components/Title';
import { api } from '../../../api/api';
import { LoadingScreen } from '../../../components/LoadingScreen';
import { AppButton } from '../../../components/AppButton';

import {
  Container,
  CloseModalButton,
  Content,
  Header,
  FiltersContainer,
  FilterTitle,
  FilterItem,
  PickerWrapper,
  PickerContainer,
} from './styles';

import { IFilterAsset } from '..';

interface FilterProps {
  isVisible: boolean;
  toggleModal: () => void;
  setFilters: Dispatch<SetStateAction<IFilterAsset>>;
}

const Filter = ({ isVisible, toggleModal, setFilters }: FilterProps) => {
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<IFilterAsset>(
    {} as IFilterAsset,
  );

  useEffect(() => {
    async function loadFilters() {
      try {
        setLoading(true);

        const response = await api.get('/assets/select/sectors');

        setSectors(response.data);
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
      coverScreen={false}
      onBackdropPress={toggleModal}
    >
      <Container>
        <CloseModalButton onPress={toggleModal}>
          <Icon name="x" />
        </CloseModalButton>
        <Content>
          <FiltersContainer>
            <Header>
              <Title>Filtrar Ativos</Title>
            </Header>

            <FilterItem>
              <FilterTitle>Setor</FilterTitle>
              <PickerWrapper>
                <PickerContainer
                  selectedValue={selectedFilters.sector}
                  onValueChange={(value: string) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      sector: value,
                    })
                  }
                >
                  {sectors.map((sector: string) => (
                    <Picker.Item key={sector} label={sector} value={sector} />
                  ))}
                </PickerContainer>
              </PickerWrapper>
            </FilterItem>
          </FiltersContainer>

          <AppButton title="filtrar" onPress={handleFilter}>
            Aplicar filtros
          </AppButton>
        </Content>
      </Container>
    </Modal>
  );
};

export { Filter };
