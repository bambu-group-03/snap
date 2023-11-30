import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { Snap } from '@/api';
import { useMentions } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

import { Card } from '../feed/card';

const INCREMENT_RENDER = 10;
const INITIAL_RENDER = 20;

const MentionScreen = () => {
  const currentUser = getUserState();

  const { data, isLoading, isError, refetch } = useMentions({
    variables: { user_id: currentUser?.id },
  });

  const [mentionSnaps, setMentionSnaps] = useState<Snap[]>([]);

  useEffect(() => {
    setMentionSnaps(data ? data : []);
  }, [data]);

  const { navigate } = useNavigation();

  // State to track the number of items to render
  const [renderCount, setRenderCount] = useState(INITIAL_RENDER);
  const [refresh, setRefresh] = useState(false);

  // The useCallback hook
  const onRefresh = useCallback(() => {
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
        <Card snap={item} onPress={() => navigate('Snap', { snap: item })} />
      );
    }
    return null;
  };

  const handleEndReached = () => {
    console.log(`handleEndReached before: ${renderCount}`);

    // Load more items when the user reaches the end
    if (renderCount < (data ? data.length : 0)) {
      setRenderCount(renderCount + INCREMENT_RENDER);
    }

    // console.log(`handleEndReached after: ${renderCount}`);
  };

  return (
    <View>
      <FocusAwareStatusBar />

      <FlatList
        data={mentionSnaps}
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

export default MentionScreen;
