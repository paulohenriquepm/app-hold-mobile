import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  title: string;
  loading?: boolean;
  background?: string;
}

const AppButton = ({
  children,
  loading,
  background = '#0066FF',
  ...rest
}: ButtonProps) => {
  const { colors } = useTheme();

  return (
    <Container backgroundColor={background} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.background} />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </Container>
  );
};

export default AppButton;
