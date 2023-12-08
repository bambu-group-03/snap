import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { Snap as SnapType } from '@/api';
import type { UserType } from '@/core/auth/utils';
import { SignInComplete } from '@/navigation/signin-complete';
import { Snap } from '@/screens';

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
  FavSnaps: { snaps: SnapType[] };
  EditProfile: { user: UserType | undefined };
  Chat: {
    chat: Chat | undefined;
    user: UserType;
  };
  Snap: { snap: SnapType };
  Stadistics: undefined;
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
      <Stack.Screen name="EditProfile" component={SignInComplete} />
      <Stack.Screen name="Snap" component={Snap} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Stadistics" component={StadisticsScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
    </Stack.Navigator>
  );
};
