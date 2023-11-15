import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { View } from '@/ui';

import ChatBody from './chat-body';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import type { Chat } from './chat-list-screen';
import type { ChatStackParamList } from './chat-navigator';
import axios from 'axios';

export type Message = {
  msg_id: string;
  from_id: string;
  to_id: string;
  content: string;
  chat_id: string;
  created_at: string;
};
const ChatScreen = () => {
  const route = useRoute<RouteProp<ChatStackParamList, 'ChatMessagesScreen'>>();
  const current_chat: Chat = route.params.chat;
  const other_chat_user = route.params.user;
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/chat/get_messages_by_chat/${current_chat.chat_id}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [current_chat]);

  return (
    <View className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
      <ScrollView>
        <ChatHeader chatUser={other_chat_user} />
        <ChatBody messages={messages} chatUser={other_chat_user} />
      </ScrollView>
      <ChatInput />
    </View>
  );
};

export default ChatScreen;
