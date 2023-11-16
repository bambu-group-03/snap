import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { FlatList, Text } from 'react-native';

import type { Snap } from '@/api';
import { FocusAwareStatusBar, View } from '@/ui';

import { Card } from '../feed/card';
import { useEffect, useState } from 'react';

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

const SnapList = () => {
  let params = useRoute().params;
  const snaps: Snap[] = params?.snaps;

  console.log(`snaps hasta ahora: ${JSON.stringify(snaps)}`);

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

  console.log(`snaps para renderizar: ${JSON.stringify(snaps)}`);
  return (
    <View>
      <FocusAwareStatusBar />
      <FlatList
        data={snaps}
        renderItem={renderSnap}
        keyExtractor={(_, index) => `item-${index}`}
      />
    </View>
  );
};
export default SnapList;
