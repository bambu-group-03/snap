import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { UserType } from '@/core/auth/utils';
import { SignInComplete } from '@/navigation/signin-complete';

import InteractionsScreen from './interaction-view';
import ProfileScreen from './profile-screen';

export type ProfileStackParamList = {
  UserProfile: { user: UserType };
  Followers: { users: UserType[] | undefined };
  Following: { users: UserType[] | undefined };
  EditProfileScreen: { user: UserType | undefined };
  // ChatMessagesScreen: {
  //   chat: Chat | undefined;
  //   user: UserType;
  // };
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
      <Stack.Screen name="Followers" component={InteractionsScreen} />
      <Stack.Screen name="Following" component={InteractionsScreen} />
      <Stack.Screen name="EditProfileScreen" component={SignInComplete} />
      {/* <Stack.Screen name="ChatMessagesScreen" component={ChatScreen} /> */}
    </Stack.Navigator>
  );
};
