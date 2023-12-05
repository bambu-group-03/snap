import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { client } from '@/api/common';
import { getUser, type UserType } from '@/core/auth/utils';
import { Text, TouchableOpacity, View } from '@/ui';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

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

  const currentUser = getUser();

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

  const handleNavigateFavoriteSnaps = async () => {
    const response = await client.content.get(
      `/api/interactions/${user?.id}/favs`
    );

    navigate.navigate('FavSnaps', { snaps: response.data.snaps });
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
      {user?.id === currentUser?.id ? (
        <View className="p-3 text-center ">
          <TouchableOpacity onPress={handleNavigateFavoriteSnaps}>
            <Text className="block text-center text-xl font-bold uppercase tracking-wide text-slate-700">
              <FontAwesomeIcon icon={faBookmark} color={'red'} />
            </Text>
            <Text className="text-sm text-blue-600 underline">Favs</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

{
  /* <Button
  variant="icon"
  onPress={onPress}
  label={
    <FontAwesomeIcon
      icon={faBookmark}
      color={isFavBookmarked ? 'red' : 'black'}
    />
  }
/>; */
}
