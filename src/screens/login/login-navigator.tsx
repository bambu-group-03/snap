import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { RecoverPasswordScreen } from './recover-password-screen';
import Login from '.';

export type LoginStackParamList = {
  Login: undefined;
  RecoverPasswordScreen: { email: string };
};

const Stack = createNativeStackNavigator<LoginStackParamList>();

export const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
