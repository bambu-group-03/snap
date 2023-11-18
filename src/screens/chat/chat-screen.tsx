// Displays the chat

import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { View } from '@/ui';

import ChatBody from './chat-body';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import type { ChatBase } from './chat-list-screen';
import type { ChatStackParamList } from './chat-navigator';

// export type ChatUser = {
//   id: number;
//   name: string;
//   email: string;
//   last_message: string;
//   imageSource: string;
//   unread_messages: boolean;
// };

const ChatScreen = () => {
  const route = useRoute<RouteProp<ChatStackParamList, 'ChatScreen'>>();
  const params: ChatBase = route.params?.chat;
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
