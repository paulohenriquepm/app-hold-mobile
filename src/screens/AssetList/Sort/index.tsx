import React, { useCallback, useState, Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';

import { Icon } from '../../../components/Icon';
import { Title } from '../../../components/Title';
import { AppButton } from '../../../components/AppButton';

import {
  Container,
  CloseModalButton,
  Content,
  Header,
  SortOptionsContainer,
  SortTitle,
  SortItem,
  PickerWrapper,
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
      coverScreen={false}
      onBackdropPress={toggleModal}
    >
      <Container>
        <CloseModalButton onPress={toggleModal}>
          <Icon name="close" />
        </CloseModalButton>
        <Content>
          <SortOptionsContainer>
            <Header>
              <Title>Ordenar Ativos</Title>
            </Header>

            <SortItem>
              <SortTitle>Ordernar por</SortTitle>
              <PickerWrapper>
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
              </PickerWrapper>
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
                  />
                  <OrderDirectionItemTextContainer>
                    <OrderDirectionItemText>Crescente</OrderDirectionItemText>
                    <Icon name="north" />
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
                  />
                  <OrderDirectionItemTextContainer>
                    <OrderDirectionItemText>Decrescente</OrderDirectionItemText>
                    <Icon name="south" />
                  </OrderDirectionItemTextContainer>
                </OrderDirectionItem>
              </OrderDirectionsContainer>
            </SortItem>
          </SortOptionsContainer>

          <AppButton title="ordernar" onPress={handleSort}>
            Aplicar ordenação
          </AppButton>
        </Content>
      </Container>
    </Modal>
  );
};

export { Sort };
