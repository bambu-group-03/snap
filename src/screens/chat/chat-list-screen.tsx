import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { getUserState } from '@/core';

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
    <View style={styles.container}>
      <ChatListBody chats={chats} />
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Change to your desired background color
  },
  card: {
    backgroundColor: 'white', // Change to your desired background color
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Change to your desired border color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 16,
  },
};

export default ChatListScreen;
