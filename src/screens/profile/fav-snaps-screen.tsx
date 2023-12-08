import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native';

import type { Snap } from '@/api';
import { EmptyList, FocusAwareStatusBar } from '@/ui';

import Card from '../feed/card';
import type { ProfileStackParamList } from './profile-navigator';

const FavoriteSnapScreen = () => {
  const route = useRoute<RouteProp<ProfileStackParamList, 'FavSnaps'>>();
  const snaps: Snap[] = route.params?.snaps || [];

  const renderItem = ({ item }: { item: Snap }) => <Card snap={item} />;

  if (snaps.length === 0) {
    return (
      <View>
        <FocusAwareStatusBar />
        <EmptyList isLoading={false} />
      </View>
    );
  }

  return (
    <View>
      <FocusAwareStatusBar />
      <FlatList
        data={snaps.reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.8}
      />
    </View>
  );
};

export default FavoriteSnapScreen;
