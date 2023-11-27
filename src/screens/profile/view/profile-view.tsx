import React, { useEffect, useState } from 'react';

import { getUserState } from '@/core/auth';
import type { UserType } from '@/core/auth/utils';
import { View } from '@/ui';

import EditProfileButton from './edit-button';
import { FollowActions } from './follow-actions';
import { ProfileBio } from './profile-bio';
import { ProfileStats } from './profile-stats';
import { ProfileHeader } from './profle-header';

const ProfileScreenView = ({
  user,
  follower_count,
  following_count,
}: {
  user: UserType | undefined;
  follower_count: number;
  following_count: number;
}) => {
  const currentUser = getUserState();

  const [isFollowing, setIsFollowing] = useState<boolean>(
    user?.is_followed || false
  );
  const [followerCount, setFollowerCount] = useState(follower_count);
  const [followingCount, setFollowingCount] = useState(following_count);

  useEffect(() => {
    setFollowerCount(follower_count);
  }, [follower_count]);

  useEffect(() => {
    setFollowingCount(following_count);
  }, [following_count]);

  useEffect(() => {
    setIsFollowing(user?.is_followed || false);
  }, [user]);

  return (
    <View className="mx-auto mb-6 mt-3 w-full px-6">
      <ProfileHeader user={user} />
      <FollowActions
        user={user}
        currentUser={currentUser}
        isFollowing={isFollowing}
        setIsFollowing={setIsFollowing}
        setFollowerCount={setFollowerCount}
        followerCount={followerCount}
      />
      <ProfileStats
        user={user}
        followerCount={followerCount}
        followingCount={followingCount}
      />
      <EditProfileButton user={user} currentUser={currentUser} />
      <ProfileBio user={user} />
    </View>
  );
};

export default ProfileScreenView;
