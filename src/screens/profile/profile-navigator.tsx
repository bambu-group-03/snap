import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { Snap } from '@/api';
import type { UserType } from '@/core/auth/utils';
import { SignInComplete } from '@/navigation/signin-complete';

import type { Chat } from '../chat/chat-list-screen';
import ChatScreen from '../chat/chat-screen';
import FavoriteSnapScreen from './fav-snaps-screen';
import InteractionsScreen from './interaction-view';
import ProfileScreen from './profile-screen';
import StadisticsScreen from './stadistics-screen';
import VerifyScreen from './verify-screen';

export type ProfileStackParamList = {
  Profile: { user: UserType };
  Followers: { users: UserType[] | undefined };
  Following: { users: UserType[] | undefined };
  FavSnaps: { snaps: Snap[] };
  EditProfileScreen: { user: UserType | undefined };
  ChatMessagesScreen: {
    chat: Chat | undefined;
    user: UserType;
  };
  StadisticsScreen: undefined;
  Verify: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Followers" component={InteractionsScreen} />
      <Stack.Screen name="Following" component={InteractionsScreen} />
      <Stack.Screen name="FavSnaps" component={FavoriteSnapScreen} />
      <Stack.Screen name="EditProfileScreen" component={SignInComplete} />
      <Stack.Screen name="ChatMessagesScreen" component={ChatScreen} />
      <Stack.Screen name="StadisticsScreen" component={StadisticsScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
    </Stack.Navigator>
  );
};
