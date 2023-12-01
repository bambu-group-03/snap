import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { useAuth } from '@/core';
import { Login } from '@/screens';
import { Pressable, View } from '@/ui';
import { RecoverPasswordScreen } from '@/screens/login/recover-password-screen';

export const GoToLogout = () => {
  const status = useAuth.use.status();
  if (status === 'signOut') {
    return null;
  }
  const signOut = useAuth.use.signOut();
  return (
    <Pressable onPress={() => signOut()} className="p-2">
      <View className="ml-auto">
        <FontAwesomeIcon icon={faRightFromBracket} />
      </View>
    </Pressable>
  );
};

export type AuthStackParamList = {
  Login: undefined;
  RecoverPasswordScreen: { email: string };
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecoverPasswordScreen"
        component={RecoverPasswordScreen}
      />
    </Stack.Navigator>
  );
};
