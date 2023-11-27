import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Text, View } from '@/ui';

type ProfileBioProps = {
  user: UserType | undefined;
};

export const ProfileBio = ({ user }: ProfileBioProps) => {
  return (
    <>
      <View className="mt-2 text-center">
        <Text className="mb-1 text-2xl font-bold leading-normal text-slate-700">
          {user?.first_name} {user?.last_name}
        </Text>
        <View className="mb-2 mt-0 text-xs font-bold uppercase text-slate-400">
          <Text className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75">
            {user?.ubication}
          </Text>
        </View>
      </View>
      <View className="mt-1 border-t border-slate-200 py-3 text-center">
        <View className="flex flex-wrap justify-center">
          <View className="w-full px-4">
            <Text className="mb-4 font-light leading-relaxed text-slate-600">
              {user?.bio_msg || 'No bio'}
            </Text>
          </View>
        </View>
      </View>
      <View className="border-blueGray-200 border-t" />
    </>
  );
};

export default ProfileBio;
