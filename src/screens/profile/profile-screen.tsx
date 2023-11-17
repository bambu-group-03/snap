import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { FocusAwareStatusBar, View } from '@/ui';

import type { ProfileStackParamList } from './profile-navigator';
import ProfileSnapsView from './profile-snaps-view';
import ProfileScreenView from './profile-view';

const BASE_INTERACTION_URL =
  'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/interactions/';

// const BASE_SNAP_URL =
//   'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/feed/';

// Define a type guard to check if the params have the 'user' property
const isUserProfile = (
  paramsToCheck: ProfileStackParamList[keyof ProfileStackParamList]
): paramsToCheck is { user: UserType } => {
  return (paramsToCheck as { user: UserType }).user !== undefined;
};

const ProfileScreen = () => {
  const { params } = useRoute<RouteProp<ProfileStackParamList>>();

  // Use the type guard to determine which type of params we're dealing with
  const userData = isUserProfile(params) ? params.user : getUserState();

  const [userFollowerCount, setUserFollowerCount] = useState<number>(0);
  const [userFollowingCount, setUserFollowingCount] = useState<number>(0);

  // Pido la cantidad de followers
  useEffect(() => {
    axios
      .get(BASE_INTERACTION_URL + userData?.id + '/count_followers')
      .then((response) => {
        console.log(response.data);
        setUserFollowerCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData]);

  // Pido la cantidad de following
  useEffect(() => {
    axios
      .get(BASE_INTERACTION_URL + userData?.id + '/count_following')
      .then((response) => {
        console.log(response.data);
        setUserFollowingCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData]);

  const client = axios.create({
    baseURL: BASE_INTERACTION_URL,
  });

  return (
    <>
      <FocusAwareStatusBar />
      <View>
        <ScrollView>
          <ProfileScreenView
            user={userData}
            follower_count={userFollowerCount}
            following_count={userFollowingCount}
            client={client}
          />
        </ScrollView>
      </View>
      <ProfileSnapsView user={userData} />
    </>
  );
};

export default ProfileScreen;
