import React from 'react';

import { useThemeContext } from '../../context/theme';
import { Icon } from '../Icon';

import { Container } from './style';

const ThemeSwitcher = () => {
  const { handleToggleTheme, currentTheme } = useThemeContext();

  return (
    <Container
      onPress={handleToggleTheme}
      accessibilityLabel={
        currentTheme.title === 'light'
          ? 'Trocar para tema escuro'
          : 'Trocar para tema claro'
      }
    >
      <Icon
        color={currentTheme.colors.themeSwitcher}
        name={currentTheme.title === 'light' ? 'wb-sunny' : 'nightlight-round'}
      />
    </Container>
  );
};

export { ThemeSwitcher };
