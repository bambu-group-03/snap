import { useNavigation } from '@react-navigation/native';
import type { AxiosInstance } from 'axios';
import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { Snap } from '@/api';
import { userReplySnaps } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

import { Card } from './card';

const INCREMENT_RENDER = 10;
const INITIAL_RENDER = 20;

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
  const [renderCount, setRenderCount] = useState(INITIAL_RENDER);
  const [refresh, setRefresh] = useState(false);

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
    if (renderCount < (data ? data.length : 0)) {
      setRenderCount(renderCount + INCREMENT_RENDER);
    }
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    refetch().then(() => setRefresh(false));
  }, [refetch]); // Added 'refetch' to dependency array

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
