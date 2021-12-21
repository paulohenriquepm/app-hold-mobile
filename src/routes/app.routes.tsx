import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Icon } from '../components/Icon';
import { useThemeContext } from '../context/theme';
import { AssetList } from '../screens/AssetList';
import { AssetDetails } from '../screens/AssetDetails';
import { Calculator } from '../screens/Calculator';
import { Profile } from '../screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AssetListRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AssetList" component={AssetList} />
      <Stack.Screen name="AssetDetails" component={AssetDetails} />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  const { currentTheme } = useThemeContext();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="AssetList"
    >
      <Tab.Screen
        name="Ativos"
        component={AssetListRoutes}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="list"
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
      <Tab.Screen
        name="Calculadora"
        component={Calculator}
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
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="user"
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
    </Tab.Navigator>
  );
};

export { AppRoutes };
