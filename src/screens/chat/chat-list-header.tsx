import React from 'react';

import { Text, View } from '@/ui';

export const ChatListHeader = () => {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Text className="text-2xl font-bold text-gray-800">Chats</Text>
    </View>
  );
};
