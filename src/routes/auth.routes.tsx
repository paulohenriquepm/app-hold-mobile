import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { ForgotPassword } from '../screens/ForgotPassword';
import { InformResetPasswordToken } from '../screens/InformResetPasswordToken';
import { ResetPassword } from '../screens/ResetPassword';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen
        name="InformResetPasswordToken"
        component={InformResetPasswordToken}
      />
      <Screen name="ResetPassword" component={ResetPassword} />
    </Navigator>
  );
};

export { AuthRoutes };
