import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Icon } from '../Icon';
import { useThemeContext } from '../../context/theme';

import { Container } from './styles';

const GoBackButton: React.FC = () => {
  const navigation = useNavigation();
  const { currentTheme } = useThemeContext();

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container onPress={handleNavigateBack}>
      <Icon name="chevron-left" color={currentTheme.colors.themeSwitcher} />
    </Container>
  );
};

export default GoBackButton;
