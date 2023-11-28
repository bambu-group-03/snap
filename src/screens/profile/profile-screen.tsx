import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import { client } from '@/api';
import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { FocusAwareStatusBar } from '@/ui';

import type { ProfileStackParamList } from './profile-navigator';
import ProfileSnapsView from './profile-snaps-view';
import ProfileScreenView from './profile-view';

const ProfileScreen = () => {
  const route = useRoute<RouteProp<ProfileStackParamList, 'UserProfile'>>();
  const currentUser = getUserState();
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  const fetchProfileData = useCallback(
    async (viewedUserId: string, currentUserId: string) => {
      try {
        const [userInfoResponse, followerResponse, followingResponse] =
          await Promise.all([
            client.identity.get(
              `/api/auth/${currentUserId}/users/${viewedUserId}`
            ), // Adjust this endpoint as needed
            client.identity.get(
              `/api/interactions/${viewedUserId}/count_followers`
            ),
            client.identity.get(
              `/api/interactions/${viewedUserId}/count_following`
            ),
          ]);

        setUser(userInfoResponse.data);
        setFollowerCount(followerResponse.data);
        setFollowingCount(followingResponse.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    },
    []
  );

  useEffect(() => {
    const viewedUserId = route.params?.user?.id || currentUser?.id;
    if (viewedUserId && currentUser) {
      fetchProfileData(viewedUserId, currentUser.id);
    }
  }, [route.params?.user, currentUser, fetchProfileData]);

  return (
    <>
      <FocusAwareStatusBar />
      <ProfileScreenView
        user={user}
        follower_count={followerCount}
        following_count={followingCount}
      />
      <ProfileSnapsView user={user} />
    </>
  );
};

export default React.memo(ProfileScreen);
