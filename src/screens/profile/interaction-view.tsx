import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

import type { UserType } from '@/core/auth/utils';

import UserList from '../users/user-list';
const InteractionScreen = () => {
  const users: UserType[] = useRoute().params?.users;

  return (
    <View>
      <UserList users={users} />
    </View>
  );
};

export default InteractionScreen;
