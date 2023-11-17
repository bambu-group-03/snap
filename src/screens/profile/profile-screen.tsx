import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { getUserState } from '@/core';
import { FocusAwareStatusBar, View } from '@/ui';

import ProfileSnapsView from './profile-snaps-view';
import ProfileScreenView from './profile-view';

const BASE_INTERACTION_URL =
  'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/interactions/';

// const BASE_SNAP_URL =
//   'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/feed/';

const ProfileScreen = () => {
  // Obtengo los datos guardados en la memoria interna del telefono

  const params = useRoute().params?.user;

  const userData = params ? params : getUserState();

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
