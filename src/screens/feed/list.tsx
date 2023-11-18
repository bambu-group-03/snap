import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native'; // Import FlatList

import type { Snap } from '@/api';
import { useSnaps } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

import { Card } from './card';

const INCREMENT_RENDER = 10;
const INITIAL_RENDER = 20;

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

export const Feed = () => {
  const currentUser = getUserState();

  const { data, isLoading, isError, refetch } = useSnaps({
    variables: { user_id: currentUser?.id },
  });

  const { navigate } = useNavigation();

  // State to track the number of items to render
  const [renderCount, setRenderCount] = useState(INITIAL_RENDER);

  const client = axios.create({
    baseURL: BASE_INTERACTION_URL,
  });

  // Corrected renderItem function
  const renderItem = ({ item, index }: { item: Snap; index: number }) => {
    // // Render the item only if its index is within the current renderCount
    // console.log(`renderItem: ${index}: ${renderCount}`);
    if (index < renderCount) {
      return (
        <Card
          snap={item}
          client={client}
          onPress={() => navigate('Snap', { snap: item })}
        />
      );
    }
    return null;
  };

  const handleEndReached = () => {
    console.log(`handleEndReached before: ${renderCount}`);

    // Load more items when the user reaches the end
    if (renderCount < (data ? data.length : 0)) {
      // Increase the render count by a suitable number
      setRenderCount(renderCount + INCREMENT_RENDER);
    }

    // console.log(`handleEndReached after: ${renderCount}`);
  };

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  const [refresh, setRefresh] = useState(false);

  let onRefresh = React.useCallback(() => {
    setRefresh(true);
    refetch().then(() => setRefresh(false));
  }, [refetch]);

  return (
    <View>
      <FocusAwareStatusBar />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        // Adjust the threshold as needed
        getItemLayout={(_data, index) => ({
          length: 100, // Adjust the item length as needed
          offset: 100 * index,
          index,
        })}
      />
    </View>
  );
};
