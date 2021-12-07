import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AssetList } from '../screens/AssetList';

const { Navigator, Screen } = createStackNavigator();

const AppRoutes = () => {
  return (
    <Navigator initialRouteName="AssetList">
      <Screen name="AssetList" component={AssetList} />
    </Navigator>
  );
};

export { AppRoutes };
