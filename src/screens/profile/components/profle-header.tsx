import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Image, Text, View } from '@/ui';

type ProfileHeaderProps = {
  user: UserType | undefined;
};

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <>
      <View className="flex w-full items-center justify-center text-center">
        <View className="relative">
          <Image
            source={user?.profile_photo_id}
            className="order-1 h-28 w-28 rounded-full" // Adjusted size to h-32 and w-32
          />
        </View>
      </View>
      <Text className="block text-center text-xl font-bold tracking-wide text-slate-700">
        @{user?.username}
      </Text>
    </>
  );
};
