import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import AppProvider from './src/context';

export default function App() {
  return (
    <AppProvider>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </AppProvider>
  );
}
