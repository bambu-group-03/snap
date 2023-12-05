import React, { useEffect, useState } from 'react';

import { getUserState } from '@/core/auth';
import type { UserType } from '@/core/auth/utils';
import { View } from '@/ui';

import EditProfileButton from './components/edit-profile-button';
import { FollowActions } from './components/follow-actions';
import { ProfileBio } from './components/profile-bio';
import { ProfileStats } from './components/profile-stats';
import { ProfileHeader } from './components/profle-header';
import StadisticsButton from './components/stadistics-button';
import VerifyButton from './components/verify-button';

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

  const [moreOptions, setMoreOptions] = useState<boolean>(false);

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
    <View className="mx-auto mb-2 mt-3 w-full px-6">
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
        currentUser={currentUser}
        followerCount={followerCount}
        followingCount={followingCount}
        option={moreOptions}
        setOption={setMoreOptions}
      />

      {/* <Button
        className="py-18 mx-20 mt-3 flex items-center justify-center rounded-full bg-blue-400 px-6 text-center font-bold text-black shadow"
        onPress={() => setMoreOptions(!moreOptions)}
        label={moreOptions ? 'Less Options' : 'More Options'}
      /> */}

      {moreOptions ? (
        <View className=" flex flex-row justify-center border-gray-200 py-1">
          <EditProfileButton user={user} currentUser={currentUser} />
          <StadisticsButton user={user} currentUser={currentUser} />
          <VerifyButton user={user} currentUser={currentUser} />
        </View>
      ) : null}
      <ProfileBio user={user} />
    </View>
  );
};

export default ProfileScreenView;
