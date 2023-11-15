import { FocusAwareStatusBar, View } from '@/ui';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileScreenView from './profile-view';
import ProfileSnapsView from './profile-snaps-view';
import { UserType } from '@/core/auth/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Snap } from '@/api';
import { getUserState } from '@/core';
import { RouteProp, useRoute } from '@react-navigation/native';

const BASE_INTERACTION_URL =
  'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/interactions/';

const BASE_SNAP_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/feed/';

const ProfileScreen = () => {
  // Obtengo los datos guardados en la memoria interna del telefono

  console.log('Ente en Profile Screen');

  const userData = useRoute().params?.user
    ? useRoute().params?.user
    : getUserState();

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

  console.log('El ID del usuario en este caso es' + userData?.id);
  console.log(userData?.first_name);

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
