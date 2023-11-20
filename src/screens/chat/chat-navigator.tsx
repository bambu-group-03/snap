import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Chat as ChatListScreen } from '@/screens';

import type { Chat } from './chat-list-screen';
import ChatScreen from './chat-screen';

export type ChatStackParamList = {
  Chats: undefined;
  ChatMessagesScreen: {
    chat: Chat | undefined;
    user: UserType;
  };
};

const Stack = createNativeStackNavigator<ChatStackParamList>();

export const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chats" component={ChatListScreen} />
      <Stack.Screen name="ChatMessagesScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};
