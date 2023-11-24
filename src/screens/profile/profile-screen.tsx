import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { FocusAwareStatusBar, View } from '@/ui';

import type { ProfileStackParamList } from './profile-navigator';
import ProfileSnapsView from './profile-snaps-view';
import ProfileScreenView from './profile-view';

const BASE_URL =
  'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api';

const BASE_INTERACTION_URL =
  'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/interactions/';

const ProfileScreen = () => {
  const route = useRoute<RouteProp<ProfileStackParamList, 'UserProfile'>>();
  const routeUser = route.params?.user;

  const user = routeUser ? routeUser : getUserState();

  const [userFollowerCount, setUserFollowerCount] = React.useState<number>(0);
  const [userFollowingCount, setUserFollowingCount] = React.useState<number>(0);
  const [userUpdatedInfo, setUserUpdatedInfo] = React.useState<UserType>();

  useEffect(() => {
    axios
      .get(BASE_URL + '/auth/' + getUserState()?.id + '/users/' + user?.id)
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
    axios
      .get(BASE_URL + '/interactions/' + user?.id + '/count_followers')
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
    axios
      .get(BASE_URL + '/interactions/' + user?.id + '/count_following')
      .then((response) => {
        console.log(response.data);
        setUserFollowingCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const client = axios.create({
    baseURL: BASE_INTERACTION_URL,
  });

  return (
    <>
      <FocusAwareStatusBar />
      <View>
        <ScrollView>
          <ProfileScreenView
            user={userUpdatedInfo}
            follower_count={userFollowerCount}
            following_count={userFollowingCount}
            client={client}
          />
        </ScrollView>
      </View>
      <ProfileSnapsView user={userUpdatedInfo} />
    </>
  );
};

export default ProfileScreen;
