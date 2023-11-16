// Displays the chat

import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { View } from '@/ui';

import ChatBody from './chat-body';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import type { ChatBase } from './chat-list-screen';

// export type ChatUser = {
//   id: number;
//   name: string;
//   email: string;
//   last_message: string;
//   imageSource: string;
//   unread_messages: boolean;
// };

const ChatScreen = () => {
  const params: ChatBase = useRoute().params?.chat;

  return (
    <View className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
      <ScrollView>
        <ChatHeader chatUser={params} />
        <ChatBody chatUser={params} />
      </ScrollView>
      <ChatInput />
    </View>
  );
};

export default ChatScreen;
