import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { UserType } from '@/core/auth/utils';
import { SignInComplete } from '@/navigation/signin-complete';

import type { Chat } from '../chat/chat-list-screen';
import ChatScreen from '../chat/chat-screen';
import InteractionsScreen from '../profile/interaction-view';
import ProfileScreen from '../profile/profile-screen';

export type UserStackParamList = {
  Profile: { user: UserType };
  Followers: { users: UserType[] | undefined };
  Following: { users: UserType[] | undefined };
  EditProfileScreen: { user: UserType | undefined };
  ChatMessagesScreen: {
    chat: Chat | undefined;
    user: UserType;
  };
};

const Stack = createNativeStackNavigator<UserStackParamList>();

export const UserNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Followers" component={InteractionsScreen} />
      <Stack.Screen name="Following" component={InteractionsScreen} />
      <Stack.Screen name="EditProfileScreen" component={SignInComplete} />
      <Stack.Screen name="ChatMessagesScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};
