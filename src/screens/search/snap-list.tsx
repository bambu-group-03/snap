import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';

import { type Snap } from '@/api';
import { EmptyList, FocusAwareStatusBar, View } from '@/ui';

import { Card } from '../feed/card';
import type { SearchStackParamList } from './search-navigator';

const SnapList = () => {
  const route = useRoute<RouteProp<SearchStackParamList, 'SnapList'>>();
  const snaps: Snap[] = route.params?.snaps;
  const { navigate } = useNavigation();

  const renderSnap = ({ item }: { item: Snap }) => {
    // console.log(`Entre en renderItem: ${JSON.stringify(item)}`);
    return (
      <Card
        snap={item}
        onPress={() => {
          navigate('Snap', { snap: item });
        }}
      />
    );
  };

  return (
    <View>
      <FocusAwareStatusBar />
      <FlatList
        data={snaps}
        renderItem={renderSnap}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={false} />}
      />
    </View>
  );
};
export default SnapList;
