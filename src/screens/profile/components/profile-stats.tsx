import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { client } from '@/api/common';
import type { UserType } from '@/core/auth/utils';
import { Text, TouchableOpacity, View } from '@/ui';

type ProfileStatsProps = {
  user: UserType | undefined;
  followerCount: number;
  followingCount: number;
};

export const ProfileStats = ({
  user,
  followerCount,
  followingCount,
}: ProfileStatsProps) => {
  const navigate = useNavigation();

  const handleNavigateFollowers = async () => {
    const response = await client.identity.get(
      `/api/interactions/${user?.id}/followers`
    );
    navigate.navigate('Followers', { users: response.data });
  };

  const handleNavigateFollowing = async () => {
    const response = await client.identity.get(
      `/api/interactions/${user?.id}/following`
    );
    navigate.navigate('Following', { users: response.data });
  };

  return (
    <View className="flex flex-row justify-center">
      <View className="p-3 text-center">
        <TouchableOpacity onPress={handleNavigateFollowers}>
          <Text className="block text-center text-xl font-bold uppercase tracking-wide text-slate-700">
            {followerCount}
          </Text>
          <Text className="text-sm text-blue-600 underline">Followers</Text>
        </TouchableOpacity>
      </View>
      <View className="p-3 text-center">
        <TouchableOpacity onPress={handleNavigateFollowing}>
          <Text className="block text-center text-xl font-bold uppercase tracking-wide text-slate-700">
            {followingCount}
          </Text>
          <Text className="text-sm text-blue-600 underline">Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
