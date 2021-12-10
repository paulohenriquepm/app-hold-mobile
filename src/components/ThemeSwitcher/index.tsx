import React from 'react';

import { useThemeContext } from '../../context/theme';
import { Icon } from '../Icon';

import { Container } from './style';

const ThemeSwitcher = () => {
  const { handleToggleTheme, currentTheme } = useThemeContext();

  return (
    <Container onPress={handleToggleTheme}>
      <Icon
        color={currentTheme.colors.themeSwitcher}
        name={currentTheme.title === 'light' ? 'moon' : 'sun'}
      />
    </Container>
  );
};

export { ThemeSwitcher };
