import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Chat, ChatBase } from '@/screens';

import ChatScreen from './chat-screen';

export type ChatStackParamList = {
  Chats: undefined;
  ChatScreen: {
    chat: ChatBase;
  };
};

const Stack = createNativeStackNavigator<ChatStackParamList>();

export const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chats" component={Chat} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};
