import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import { FlatList, Text } from 'react-native';

import type { Snap } from '@/api';
import { FocusAwareStatusBar } from '@/ui';

import { Card } from '../feed/card';

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

const Snaps = () => {
  const snaps: Snap[] = useRoute().params?.snaps;
  const { navigate } = useNavigation();
  const client = axios.create({
    baseURL: BASE_INTERACTION_URL,
  });

  const renderItem = ({ item }: { item: Snap }) => {
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
    <>
      <FocusAwareStatusBar />
      <Text>Snaps</Text>
      <FlatList
        data={snaps}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text>Snaps</Text>
    </>
  );
};

export default Snaps;
