import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Image, Text, View } from '@/ui';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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
            className="order-1 h-28 w-28 rounded-full"
          />
        </View>
      </View>
      <View className=" border-gray-200 flex py-5 justify-between items-center">
        <Text className="block text-center text-xl font-bold tracking-wide text-slate-700">
          @{user?.username}
        </Text>
        {user?.certified ? (
          <View className="py-2">
            <FontAwesomeIcon icon={faCheckCircle} size={20} color="#1DA1F2" />
          </View>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};
