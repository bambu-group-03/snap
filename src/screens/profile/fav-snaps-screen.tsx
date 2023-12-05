import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { ProfileStackParamList } from './profile-navigator';
import { Snap } from '@/api';

const FavoriteSnapScreen = () => {
  const route = useRoute<RouteProp<ProfileStackParamList, 'FavSnaps'>>();
  const snaps: Snap[] = route.params?.snaps || [];
  return (
    <View>
      {/* <UserList users={users} /> */}
      <Text>Favorite Snaps</Text>
    </View>
  );
};

export default FavoriteSnapScreen;
