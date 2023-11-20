import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Image, Text, TouchableOpacity, View } from '@/ui';

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
  console.log('users', users);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const usersData: { [key: string]: UserType } = {};
      for (const chat of chats) {
        try {
          const user = await getUserFromChat(chat.other_id);
          usersData[chat.other_id] = user; // Store using `other_id`
        } catch (error) {
          console.error('Error fetching user for chat:', chat.chat_id, error);
        }
      }
      setUsers(usersData);
    };

    fetchUsers();
  }, [chats]);

  return (
    <View className="flex-1">
      {chats.map((chat) => {
        const user = users[chat.other_id];
        console.log(`user for chat ${chat.chat_id}`, user);
        return (
          <View key={chat.chat_id} className="border-b border-gray-200 py-3">
            <TouchableOpacity
              onPress={() => navigate('ChatMessagesScreen', { chat, user })}
            >
              <View className="flex-row items-center">
                <Image
                  className="mr-4 h-12 w-12 rounded-full"
                  source={{
                    uri: user?.profile_photo_id || 'https://i.pravatar.cc/300',
                  }}
                />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800">
                    {user?.first_name} {user?.last_name}
                  </Text>
                  {/* Uncomment if you want to display the last message */}
                  {/* <Text className="text-base text-gray-600">{chat.last_message}</Text> */}
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
