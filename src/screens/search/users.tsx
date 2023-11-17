import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

import type { UserType } from '@/core/auth/utils';

import UserList from '../users/user-list';
import type { RouteProp } from '@/navigation/types';

const Users = () => {
  const { params } = useRoute<RouteProp<'Users'>>();

  const users: UserType[] = params.users ? params.users : [];

  return (
    <View>
      <UserList users={users} />
    </View>
  );
};

export default Users;
