import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '../context/auth';
import { useThemeContext } from '../context/theme';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

const Routes = () => {
  const { user, loading } = useAuth();
  const { currentTheme } = useThemeContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={currentTheme.colors.background}
        style={currentTheme.title === 'light' ? 'dark' : 'light'}
      />

      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export { Routes };
