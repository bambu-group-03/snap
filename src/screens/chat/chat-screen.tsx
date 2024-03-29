import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { client } from '@/api/common';
import { getUserState } from '@/core';
import { View } from '@/ui';

import ChatBody from './chat-body';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import type { Chat } from './chat-list-screen';
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
  const route = useRoute<RouteProp<ChatStackParamList, 'Chat'>>();
  const { chat, user } = route.params;
  const [chatId, setChatId] = useState(chat?.chat_id);

  const [messages, setMessages] = useState<Message[]>([]);
  console.log(messages);

  if (!chatId) {
    try {
      client.identity
        .get(`/api/chat/get_chats_by_user/${chat?.owner_id}`)
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          response.find((chat_rev: Chat) => {
            if (
              chat_rev.owner_id === chat?.owner_id &&
              chat_rev.other_id === chat?.other_id
            ) {
              setChatId(chat_rev.chat_id);
            }
          });
        });
    } catch (error) {
      console.error('Error fetching userChat:', error);
    }
  }

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) {
        setMessages([]);
        return;
      }

      try {
        const response = await client.identity.get(
          `api/chat/get_messages_by_chat/${chatId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000); // Refresh every 5 seconds
    return () => clearInterval(intervalId); // Clear interval on component unmount or chat change
  }, [chat, chatId]);

  // Function to add a new message to the state
  const addNewMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
  const handleNewChatCreated = (newChatId: string) => {
    setChatId(newChatId);
  };
  return (
    <View className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
      <ScrollView>
        <ChatHeader chatUser={user} />
        <ChatBody messages={messages} chatUser={user} />
      </ScrollView>
      <ChatInput
        fromId={chat?.owner_id || getUserState()!.id}
        toId={user.id}
        addNewMessage={addNewMessage}
        onNewChatCreated={handleNewChatCreated}
      />
    </View>
  );
};

export default ChatScreen;
