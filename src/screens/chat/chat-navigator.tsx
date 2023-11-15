import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Chat as ChatListScreen } from '@/screens';

import type { Chat } from './chat-list-screen';
import ChatScreen from './chat-screen';

export type ChatStackParamList = {
  Chats: undefined;
  ChatMessagesScreen: {
    chat: Chat;
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
