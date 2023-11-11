import { FocusAwareStatusBar } from '@/ui';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileScreenView from './profile-view';
import MySnapsView from './my-snaps-view';
import { UserType } from '@/core/auth/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Snap } from '@/api';
import { getUserState } from '@/core';

const BASE_USER_URL =
  'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/';

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/feed/';

const ProfileScreen = () => {
  // Obtengo los datos guardados en la memoria interna del telefono
  const currentUser = getUserState();
  const userID = currentUser?.id;

  const [userData, setUserData] = useState<UserType | null>(null);
  const [userSnaps, setUserSnaps] = useState<Snap[]>([]);

  useEffect(() => {
    axios
      .get(BASE_USER_URL + 'users/' + userID)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userID]);

  useEffect(() => {
    const limit = 100;
    const offset = 0;

    axios
      .get(
        BASE_INTERACTION_URL +
          userID +
          '/snaps?limit=' +
          limit +
          '&offset=' +
          offset
      )
      .then((response) => {
        console.log(response.data);
        setUserSnaps(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userID]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <ProfileScreenView user={userData} />
        <MySnapsView snaps={userSnaps} />
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
