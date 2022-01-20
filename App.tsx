import React from 'react';
import { View } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

import AppProvider from './src/context';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View accessibilityValue={{ text: 'Tela de Carregamento' }}>
        <AppLoading />
      </View>
    );
  }

  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}
