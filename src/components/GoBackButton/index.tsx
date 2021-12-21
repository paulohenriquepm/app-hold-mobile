import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Icon } from '../Icon';

import { Container } from './styles';

const GoBackButton: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container onPress={handleNavigateBack}>
      <Icon name="chevron-left" />
    </Container>
  );
};

export default GoBackButton;
