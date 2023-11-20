import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { getUserState } from '@/core';
import { View } from '@/ui';

import ChatListBody from './chat-list-body';

export type Chat = {
  chat_id: string;
  owner_id: string;
  other_id: string;
  created_at: string;
};

const ChatListScreen = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const currentUser = getUserState(); // Assume this returns the current user

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/chat/get_chats_by_user/${currentUser?.id}`
        );
        console.log(`chats from user ${currentUser?.id}`, response.data); // Assuming this returns the chats for the current user
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [currentUser?.id]);

  return (
    <View className="flex-1 p-4">
      <ChatListBody chats={chats} />
    </View>
  );
};

export default ChatListScreen;
