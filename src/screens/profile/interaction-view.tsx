import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

import type { UserType } from '@/core/auth/utils';

import UserList from '../users/user-list';
import type { ProfileStackParamList } from './profile-navigator';
const InteractionScreen = () => {
  const route =
    useRoute<RouteProp<ProfileStackParamList, 'Followers' | 'Following'>>();
  const users: UserType[] | undefined = route.params?.users;

  return (
    <View>
      <UserList users={users || []} />
    </View>
  );
};

export default InteractionScreen;
