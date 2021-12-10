import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AssetList } from '../screens/AssetList';
import { Icon } from '../components/atoms/Icon';
import { useThemeContext } from '../context/theme';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes = () => {
  const { currentTheme } = useThemeContext();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName="AssetList"
    >
      <Screen
        name="Ativos"
        component={AssetList}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="dollar-sign"
                size={24}
                color={
                  focused
                    ? currentTheme.colors.primary
                    : currentTheme.colors.themeSwitcher
                }
              />
            );
          },
        }}
      />
    </Navigator>
  );
};

export { AppRoutes };
