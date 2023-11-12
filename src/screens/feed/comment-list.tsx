import { FocusAwareStatusBar, View, Text, EmptyList } from '@/ui';
import { Snap, userReplySnaps } from '@/api';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { AxiosInstance } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Card } from './card';

const INCREMENT_RENDER = 10;
const INITIAL_RENDER = 20;

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

export const Comments = ({
  snap,
  client,
}: {
  snap: Snap;
  client: AxiosInstance;
}) => {
  const { data, isLoading, isError } = userReplySnaps({
    variables: { snap_id: snap?.id },
  });
  const { navigate } = useNavigation();

  // State to track the number of items to render
  const [renderCount, setRenderCount] = useState(INITIAL_RENDER);

  // Corrected renderItem function
  const renderItem = ({ item, index }: { item: Snap; index: number }) => {
    // Render the item only if its index is within the current renderCount
    console.log(`renderItem: ${index}: ${renderCount}`);
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

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <>
      <FocusAwareStatusBar />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        onEndReached={handleEndReached}
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
