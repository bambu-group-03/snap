import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native'; // Import FlatList

import type { Snap } from '@/api';
import { useSnaps } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

import { Card } from './card';

const INCREMENT_RENDER = 10;
const INITIAL_RENDER = 20;

export const Feed = () => {
  const currentUser = getUserState();

  const { data, isLoading, isError, refetch } = useSnaps({
    variables: { user_id: currentUser?.id },
  });

  const [userSnaps, setUserSnaps] = React.useState<Snap[]>([]);

  React.useEffect(() => {
    setUserSnaps(data ? data : []);
  }, [data]);

  const { navigate } = useNavigation();

  // State to track the number of items to render
  const [renderCount, setRenderCount] = React.useState(INITIAL_RENDER);
  const [refresh, setRefresh] = React.useState(false);

  // The useCallback hook
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    refetch().then(() => setRefresh(false));
  }, [refetch]);

  // Early return in case of error
  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  // Corrected renderItem function
  const renderItem = ({ item, index }: { item: Snap; index: number }) => {
    // // Render the item only if its index is within the current renderCount
    // console.log(`renderItem: ${index}: ${renderCount}`);
    if (index < renderCount) {
      return (
        <Card snap={item} onPress={() => navigate('Snap', { snap: item })} />
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

  return (
    <View>
      <FocusAwareStatusBar />

      <FlatList
        data={userSnaps}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        getItemLayout={(_data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
    </View>
  );
};
