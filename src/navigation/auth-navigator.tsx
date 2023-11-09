import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { useAuth } from '@/core';
import { Login } from '@/screens';
import { Pressable, Text } from '@/ui';

export const GoToLogout = () => {
  const status = useAuth.use.status();
  if (status === 'signOut') {
    return null;
  }
  const signOut = useAuth.use.signOut();
  return (
    <Pressable onPress={() => signOut()} className="p-2">
      <Text className="text-red-600">Logout</Text>
    </Pressable>
  );
};

export type AuthStackParamList = {
  Login: undefined;
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
    </Stack.Navigator>
  );
};
