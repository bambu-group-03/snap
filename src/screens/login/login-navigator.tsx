import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { FormType, RecoverPasswordScreen } from './recover-password-screen';
import Login from '.';
import { SubmitHandler } from 'react-hook-form';

export type LoginStackParamList = {
  Login: undefined;
  RecoverPasswordScreen: {
    email: string;
  };
};

const Stack = createNativeStackNavigator<LoginStackParamList>();

export const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
