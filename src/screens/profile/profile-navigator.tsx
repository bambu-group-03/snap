import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import ProfileScreen from './profile-screen';
import { UserType } from '@/core/auth/utils';
import InteractionsScreen from './interaction-view';

export type ProfileStackParamList = {
  UserProfile: { user: UserType };
  Followers: { users: UserType[] | undefined };
  Following: { users: UserType[] | undefined };
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
      <Stack.Screen name="Followers" component={InteractionsScreen} />
      <Stack.Screen name="Following" component={InteractionsScreen} />
    </Stack.Navigator>
  );
};
