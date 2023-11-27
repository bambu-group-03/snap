import React, { useCallback, useEffect, useState } from 'react';

import { client } from '@/api/common';
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
  const currentUser = getUserState();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = useCallback(async () => {
    setLoading(true);
    try {
      // Replace with your API call to fetch chats
      const response = await client.identity.get(
        `/api/chat/get_chats_by_user/${currentUser?.id}`
      );
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
    setLoading(false);
  }, [currentUser?.id]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <View className="flex-1">
      <ChatListBody chats={chats} onRefresh={fetchChats} loading={loading} />
    </View>
  );
};

export default ChatListScreen;
