import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Image, Text, View } from '@/ui';

type ProfileHeaderProps = {
  user: UserType | undefined;
};

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <>
      <View className="relative flex w-full items-center justify-center text-center">
        <Image
          source={user?.profile_photo_id}
          className="order-1 h-28 w-28 rounded-full"
        />
      </View>

      <View className=" flex items-center justify-between border-gray-200 py-5">
        <Text className="block text-center text-xl font-bold tracking-wide text-slate-700 ">
          @{user?.username}{' '}
          {user?.certified ? (
            <FontAwesomeIcon icon={faCheckCircle} size={18} color="#1DA1F2" />
          ) : (
            <></>
          )}
        </Text>
      </View>
    </>
  );
};
