import React from 'react';
import { ActivityIndicator, ButtonProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, ButtonText, AccessibilityContainer } from './styles';

interface AppButtonProps extends ButtonProps {
  children: string;
  title: string;
  accessibilityLabel?: string;
  loading?: boolean;
  background?: string;
  selected?: boolean;
}

const AppButtonOpacity = ({
  children,
  loading,
  background = '#0066FF',
  selected = true,
  accessibilityLabel = 'botão',
  ...rest
}: AppButtonProps) => {
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

export { AppButtonOpacity };
