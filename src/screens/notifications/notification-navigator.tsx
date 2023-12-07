import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { Snap as SnapType } from '@/api';
import type { UserType } from '@/core/auth/utils';
import { Snap } from '@/screens';

import type { Chat } from '../chat/chat-list-screen';
import ChatScreen from '../chat/chat-screen';
import ProfileScreen from '../profile/profile-screen';
import NotionficationScreen from './notification-screen';

export type NotificationStackParamList = {
  Notifications: {};
  Snap: { snap: SnapType };
  Profile: { user: UserType };
  Chat: {
    chat: Chat | undefined;
    user: UserType;
  };
};

const Stack = createNativeStackNavigator<NotificationStackParamList>();

export const NotificationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={NotionficationScreen} />
      <Stack.Screen name="Snap" component={Snap} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
