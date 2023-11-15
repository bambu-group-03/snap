import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import type { UserType } from '@/core/auth/utils';

import type { Chat } from './chat-list-screen';

const getUserFromChat = async (id: string): Promise<UserType> => {
  try {
    const response = await axios.get(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const ChatListBody = ({ chats }: { chats: Chat[] }) => {
  const { navigate } = useNavigation();
  const [users, setUsers] = React.useState<{ [key: string]: UserType }>({});

  React.useEffect(() => {
    const fetchUsers = async () => {
      const usersData: { [key: string]: UserType } = {};
      for (const chat of chats) {
        try {
          const user = await getUserFromChat(chat.other_id); // Assuming owner_id is the key to fetch the user
          usersData[chat.owner_id] = user;
        } catch (error) {
          console.error('Error fetching user for chat:', chat.chat_id, error);
        }
      }
      console.log('usersData', usersData);
      setUsers(usersData);
    };

    fetchUsers();
  }, [chats]);

  return (
    <View style={styles.list}>
      {chats.map((chat: Chat) => {
        const user = users[chat.other_id]; // Assuming owner_id is used to map the user
        return (
          <View key={chat.chat_id} style={styles.listItem}>
            <TouchableOpacity
              onPress={() => navigate('ChatMessagesScreen', { chat, user })}
            >
              <View style={styles.itemContent}>
                <Image
                  style={styles.avatar}
                  source={{ uri: user?.profile_photo_id }}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>
                    {user?.first_name} {user?.last_name}
                  </Text>
                  {/* <Text style={styles.last_message}>{chat.last_message}</Text> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ChatListBody;

const styles = {
  list: {},
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Change to your desired border color
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Change to your desired text color
  },
  last_message: {
    fontSize: 14,
    color: '#666', // Change to your desired text color
  },
  unread_messages: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
