import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { View } from '@/ui';

import ChatBody from './chat-body';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import type { ChatStackParamList } from './chat-navigator';

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
  const { chat, user } = route.params;
  console.log(`other_chat_user: ${JSON.stringify(user)}`);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/chat/get_messages_by_chat/${chat.chat_id}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chat]);
  // Function to add a new message to the state
  const addNewMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
  return (
    <View className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
      <ScrollView>
        <ChatHeader chatUser={user} />
        <ChatBody messages={messages} chatUser={user} />
      </ScrollView>
      <ChatInput
        fromId={chat.owner_id}
        toId={user.id}
        addNewMessage={addNewMessage}
      />
    </View>
  );
};

export default ChatScreen;
