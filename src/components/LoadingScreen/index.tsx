import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { Container } from './styles';

const LoadingScreen = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  );
};

export { LoadingScreen };
