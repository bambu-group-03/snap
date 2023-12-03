import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { Snap } from '@/api';
import { useSnaps } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar, View } from '@/ui';

import { Card } from './card';
import { CardSkeleton } from './components/card/card-skeleton';

const LIMIT = 15; // Number of items to fetch per page

export const Feed = () => {
  const currentUser = getUserState();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useSnaps({ userId: currentUser?.id, limit: LIMIT, offset: 0 });

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const loadMoreItems = () => {
    hasNextPage && fetchNextPage();
  };

  const renderItem = ({ item }: { item: Snap }) => <Card snap={item} />;

  if (isLoading && !data) {
    return (
      <View>
        <FocusAwareStatusBar />
        {Array.from({ length: LIMIT }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <FocusAwareStatusBar />
        <EmptyList isLoading={isLoading} />
      </View>
    );
  }

  return (
    <View>
      <FocusAwareStatusBar />
      <FlatList
        data={data?.pages.flatMap((page) => page.snaps) || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ListFooterComponent={isFetchingNextPage ? <CardSkeleton /> : null}
      />
    </View>
  );
};

export default Feed;
