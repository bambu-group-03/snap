import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { FlatList, Text } from 'react-native';

import type { Snap } from '@/api';
import { EmptyList, FocusAwareStatusBar, View } from '@/ui';

import { Card } from '../feed/card';
import { useEffect, useState } from 'react';

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

const SnapList = () => {
  const snaps: Snap[] = useRoute().params?.snaps;

  const { navigate } = useNavigation();

  const client = axios.create({
    baseURL: BASE_INTERACTION_URL,
  });

  const renderSnap = ({ item }: { item: Snap }) => {
    console.log(`Entre en renderItem: ${JSON.stringify(item)}`);
    return (
      <Card
        snap={item}
        client={client}
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
