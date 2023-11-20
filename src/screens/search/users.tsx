import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import type { UserType } from '@/core/auth/utils';

import UserList from '../users/user-list';
import type { SearchStackParamList } from './search-navigator';

const Users = () => {
  const route = useRoute<RouteProp<SearchStackParamList, 'Users'>>();
  const users: UserType[] = route.params?.users || [];
  return (
    <View>
      <UserList users={users} />
    </View>
  );
};

export default Users;
