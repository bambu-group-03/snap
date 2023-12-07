import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Image, Text, View } from '@/ui';

const ChatHeader = ({ chatUser }: { chatUser: UserType }) => {
  return (
    <View className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
      <View className="relative flex items-center space-x-4">
        <View className="relative">
          <Image
            source={chatUser?.profile_photo_id || ''}
            className="h-10 w-10 rounded-full sm:h-16 sm:w-16"
          />
        </View>
        <View className="flex flex-col leading-tight">
          <View className="mt-1 flex items-center text-2xl">
            <Text className="mr-3 text-gray-700">
              {chatUser?.first_name || 'First Name'}{' '}
              {chatUser?.last_name || 'Last Name'}
            </Text>
          </View>
          <Text className="text-center text-lg text-gray-600">
            {chatUser.bio_msg}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
