import { useNavigation } from '@react-navigation/native';
import type { AxiosInstance } from 'axios';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { Snap } from '@/api';
import { userReplySnaps } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

import { Card } from './card';

const INCREMENT_RENDER = 10;
const INITIAL_RENDER = 20;

// const BASE_INTERACTION_URL =
//   'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

export const Comments = ({
  snap,
  client,
}: {
  snap: Snap;
  client: AxiosInstance;
}) => {
  const currentUser = getUserState();

  const { data, isLoading, isError, refetch } = userReplySnaps({
    variables: { snap_id: snap?.id, user_id: currentUser?.id },
  });

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

    console.log(`handleEndReached after: ${renderCount}`);
  };

  return (
    <>
      <FocusAwareStatusBar />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        onEndReached={handleEndReached}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.1}
        getItemLayout={(_data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
    </>
  );
};
