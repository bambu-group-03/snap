import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Image, Text, View } from '@/ui';

const ChatHeader = ({ chatUser }: { chatUser: UserType }) => {
  // const profile_photo =
  //   'https://avatars.githubchatUsercontent.com/u/40549839?s=400&u=f9968082a38e11cabaeec2033e3ffb3e18395eb6&v=4';

  return (
    <View className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
      <View className="relative flex items-center space-x-4">
        <View className="relative">
          <Image
            source={chatUser.profile_photo_id}
            className="h-10 w-10 rounded-full sm:h-16 sm:w-16"
          />
        </View>
        <View className="flex flex-col leading-tight">
          <View className="mt-1 flex items-center text-2xl">
            <Text className="mr-3 text-gray-700">
              {chatUser.first_name} {chatUser.last_name}
            </Text>
          </View>
          <Text className="text-lg text-gray-600">{chatUser.bio_msg}</Text>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
