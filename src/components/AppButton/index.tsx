import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, ButtonText, AccessibilityContainer } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  title: string;
  accessibilityLabel?: string;
  loading?: boolean;
  background?: string;
  selected?: boolean;
}

const AppButton = ({
  children,
  loading,
  background = '#0066FF',
  selected = true,
  accessibilityLabel = 'botão',
  ...rest
}: ButtonProps) => {
  const { colors } = useTheme();

  return (
    <Container backgroundColor={background} selected={selected} {...rest}>
      <AccessibilityContainer accessibilityLabel={accessibilityLabel}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.background} />
        ) : (
          <ButtonText selected={selected}>{children}</ButtonText>
        )}
      </AccessibilityContainer>
    </Container>
  );
};

export { AppButton };
