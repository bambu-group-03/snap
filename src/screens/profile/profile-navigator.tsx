import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import ProfileScreen from './profile-screen';
import { UserType } from '@/core/auth/utils';

export type ChatStackParamList = {
  UserProfile: UserType;
};

const Stack = createNativeStackNavigator<ChatStackParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
