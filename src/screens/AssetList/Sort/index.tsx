import React, { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';

import { Icon } from '../../../components/Icon';
import { Title } from '../../../components/Title';
import { AppButtonOpacity } from '../../../components/AppButtonOpacity';
import { useThemeContext } from '../../../context/theme';

import {
  Container,
  CloseModalButton,
  Content,
  Header,
  SortOptionsContainer,
  SortTitle,
  SortItem,
  PickerContainer,
  OrderDirectionsContainer,
  OrderDirectionItem,
  OrderDirectionItemTextContainer,
  OrderDirectionItemText,
} from './styles';

import { ISortAsset } from '..';

interface FilterProps {
  isVisible: boolean;
  toggleModal: () => void;
  currentSort: ISortAsset;
  setSort: Dispatch<SetStateAction<ISortAsset>>;
}

interface ISortOptions {
  label: string;
  value: string;
}

const sortOptions = [
  { label: 'Nome', value: 'name' },
  { label: 'Valor de Mercado', value: 'market_value' },
] as ISortOptions[];

const Sort = ({
  isVisible,
  toggleModal,
  currentSort,
  setSort,
}: FilterProps) => {
  const [selectedOrderByField, setSelectedOrderByField] = useState(
    currentSort.orderByField ?? sortOptions[0].value,
  );
  const [selectedOrderByDirection, setSelectedOrderByDirection] = useState(
    currentSort.orderByDirection,
  );

  const deviceHeight = Dimensions.get('screen').height;

  const { currentTheme } = useThemeContext();

  const handleSort = useCallback(() => {
    setSort({
      orderByField: selectedOrderByField,
      orderByDirection: selectedOrderByDirection,
    });
    toggleModal();
  }, [selectedOrderByField, selectedOrderByDirection, setSort, toggleModal]);

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
          <SortOptionsContainer>
            <Header>
              <Title>Ordenar Ativos</Title>
            </Header>

            <SortItem>
              <SortTitle>Ordernar por</SortTitle>
              <PickerContainer
                selectedValue={selectedOrderByField}
                onValueChange={(value: string) =>
                  setSelectedOrderByField(value)
                }
              >
                {sortOptions.map((option: ISortOptions) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </PickerContainer>
            </SortItem>
            <SortItem>
              <SortTitle>Ordernar de forma</SortTitle>
              <OrderDirectionsContainer>
                <OrderDirectionItem
                  onPress={() => setSelectedOrderByDirection('asc')}
                >
                  <Icon
                    name={
                      selectedOrderByDirection === 'asc'
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    color={currentTheme.colors.text}
                  />
                  <OrderDirectionItemTextContainer>
                    <OrderDirectionItemText>Crescente</OrderDirectionItemText>
                    <Icon name="north" color={currentTheme.colors.text} />
                  </OrderDirectionItemTextContainer>
                </OrderDirectionItem>
                <OrderDirectionItem
                  onPress={() => setSelectedOrderByDirection('desc')}
                >
                  <Icon
                    name={
                      selectedOrderByDirection === 'desc'
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    color={currentTheme.colors.text}
                  />
                  <OrderDirectionItemTextContainer>
                    <OrderDirectionItemText>Decrescente</OrderDirectionItemText>
                    <Icon name="south" color={currentTheme.colors.text} />
                  </OrderDirectionItemTextContainer>
                </OrderDirectionItem>
              </OrderDirectionsContainer>
            </SortItem>
          </SortOptionsContainer>

          <AppButtonOpacity title="ordernar" onPress={handleSort}>
            Aplicar ordenação
          </AppButtonOpacity>
        </Content>
      </Container>
    </Modal>
  );
};

export { Sort };
