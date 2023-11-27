import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { client } from '@/api';
import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { FocusAwareStatusBar, View } from '@/ui';

import type { ProfileStackParamList } from './profile-navigator';
import ProfileSnapsView from './profile-snaps-view';
import ProfileScreenView from './profile-view';

const ProfileScreen = () => {
  const route = useRoute<RouteProp<ProfileStackParamList, 'UserProfile'>>();
  const routeUser = route.params?.user;

  const user = routeUser ? routeUser : getUserState();

  const [userFollowerCount, setUserFollowerCount] = React.useState<number>(0);
  const [userFollowingCount, setUserFollowingCount] = React.useState<number>(0);
  const [userUpdatedInfo, setUserUpdatedInfo] = React.useState<UserType>();

  useEffect(() => {
    client.identity
      .get('/api/auth/' + getUserState()?.id + '/users/' + user?.id)
      .then((response) => {
        console.log(response.data);
        setUserUpdatedInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  // Pido la cantidad de followers
  useEffect(() => {
    client.identity
      .get('/api/interactions/' + user?.id + '/count_followers')
      .then((response) => {
        console.log(response.data);
        setUserFollowerCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  // Pido la cantidad de following
  useEffect(() => {
    client.identity
      .get('/api/interactions/' + user?.id + '/count_following')
      .then((response) => {
        console.log(response.data);
        setUserFollowingCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  return (
    <>
      <FocusAwareStatusBar />
      <View>
        <ScrollView>
          <ProfileScreenView
            user={userUpdatedInfo}
            follower_count={userFollowerCount}
            following_count={userFollowingCount}
            client={client.identity}
          />
        </ScrollView>
      </View>
      <ProfileSnapsView user={userUpdatedInfo} />
    </>
  );
};

export default ProfileScreen;
