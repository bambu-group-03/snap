import { UserType } from '@/core/auth/utils';
import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import UserList from '../users/user-list';
import { useEffect, useState } from 'react';

const InteractionScreen = () => {
  const users: UserType[] = useRoute().params?.users;

  return (
    <View>
      <UserList users={users} />
    </View>
  );
};

export default InteractionScreen;
