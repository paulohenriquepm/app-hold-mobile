import React from 'react';
import Modal from 'react-native-modal';

import { Container } from './styles';

interface FilterProps {
  isVisible: boolean;
  toggleModal: () => void;
}

const Filter = ({ isVisible, toggleModal }: FilterProps) => {
  return (
    <Modal isVisible={isVisible} propagateSwipe onBackdropPress={toggleModal}>
      <Container />
    </Modal>
  );
};

export { Filter };
