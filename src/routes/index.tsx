import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../context/auth';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

const Routes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* <View>
        <Text>Teste</Text>
      </View> */}
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export { Routes };
