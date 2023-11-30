import { faUserPlus, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import { client } from '@/api/common';
import type { UserType } from '@/core/auth/utils';
import { TouchableOpacity, View } from '@/ui';

import { ChatProfileButton } from './chat-profile-button';

type FollowActionsProps = {
  user: UserType | undefined;
  currentUser: UserType | undefined;
  isFollowing: boolean;
  setIsFollowing: (isFollowing: boolean) => void;
  setFollowerCount: (count: number) => void;
  followerCount: number;
};

export const FollowActions = ({
  user,
  currentUser,
  isFollowing,
  setIsFollowing,
  setFollowerCount,
  followerCount,
}: FollowActionsProps) => {
  // Do not display follow/unfollow button if the current user is viewing their own profile
  if (currentUser?.id === user?.id) return null;

  const handleFollow = async () => {
    const interaction = isFollowing ? '/unfollow/' : '/follow/';
    const method = isFollowing ? 'DELETE' : 'POST';

    // OPTIMISTIC UI
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
    setIsFollowing(!isFollowing);

    await client.identity({
      url: `/api/interactions/${currentUser?.id}${interaction}${user?.id}`,
      method,
    });
  };

  return (
    <View className="flex flex-row justify-center pb-0 lg:pt-4">
      <View className="mr-4 mt-4 text-center">
        <TouchableOpacity
          className={`inline rounded-full ${
            isFollowing ? 'bg-red-300' : 'bg-blue-300'
          } px-4 py-3 text-center font-bold text-white`}
          onPress={handleFollow}
          testID={isFollowing ? 'unfollow-button' : 'follow-button'}
        >
          <FontAwesomeIcon icon={isFollowing ? faUserTimes : faUserPlus} />
        </TouchableOpacity>
      </View>
      <ChatProfileButton
        currentUser={currentUser}
        otherUser={user}
        isFollowing={isFollowing}
      />
    </View>
  );
};
