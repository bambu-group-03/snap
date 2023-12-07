import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import { client } from '@/api';
import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { FocusAwareStatusBar, View } from '@/ui';

import Tab from './components/tab';
import type { ProfileStackParamList } from './profile-navigator';
import ProfileSharesHistoryView from './profile-shares-history-view';
import ProfileSnapsView from './profile-snaps-view';
import ProfileScreenView from './profile-view';

const ProfileScreen = () => {
  const route = useRoute<RouteProp<ProfileStackParamList, 'Profile'>>();
  const currentUser = getUserState();
  const [userData, setUserData] = useState<{
    user: UserType | undefined;
    followerCount: number;
    followingCount: number;
  }>({ user: undefined, followerCount: 0, followingCount: 0 });
  const [selectedTab, setSelectedTab] = useState<'snaps' | 'shared'>('snaps');

  const handleTabChange = (tab: 'snaps' | 'shared') => {
    setSelectedTab(tab);
  };
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

        setUserData({
          user: userInfoResponse.data,
          followerCount: followerResponse.data,
          followingCount: followingResponse.data,
        });
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

  const profileScreenViewComponent = (
    <ProfileScreenView
      user={userData.user}
      follower_count={userData.followerCount}
      following_count={userData.followingCount}
    />
  );
  return (
    <>
      <FocusAwareStatusBar />
      <View className="border-blueGray-200 border-t border-gray-100" />

      {/* Tab Selector */}
      <View className="flex-row">
        <Tab
          selected={selectedTab === 'snaps'}
          title="Snaps"
          onPress={() => handleTabChange('snaps')}
        />
        <Tab
          selected={selectedTab === 'shared'}
          title="Shared by"
          onPress={() => handleTabChange('shared')}
        />
      </View>

      {/* Conditional Rendering based on Selected Tab */}
      {selectedTab === 'snaps' ? (
        <ProfileSnapsView
          user={userData.user}
          headerComponent={profileScreenViewComponent}
        />
      ) : (
        <ProfileSharesHistoryView
          user={userData.user}
          headerComponent={profileScreenViewComponent}
        />
      )}
    </>
  );
};

export default React.memo(ProfileScreen);
