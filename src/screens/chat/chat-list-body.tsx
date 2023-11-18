import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Image, Text, TouchableOpacity, View } from '@/ui';

import type { ChatBase } from './chat-list-screen';

const ChatListHeader = ({ chats }: { chats: ChatBase[] }) => {
  const { navigate } = useNavigation();
  return (
    <View className="list">
      {chats.map((chat: ChatBase) => (
        <View key={chat.id} className="border-b border-gray-200 py-3">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigate('ChatScreen', { chat })}
          >
            <Image
              className="mr-4 h-12 w-12 rounded-full"
              source={{ uri: chat.imageSource }}
            />
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-800">
                {chat.firstName} {chat.lastName}
              </Text>
              <Text className="text-base text-gray-500">
                {chat.last_message}
              </Text>
            </View>
            <Text className="text-xl font-bold">
              {chat.unread_messages ? '•' : ''}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ChatListHeader;
