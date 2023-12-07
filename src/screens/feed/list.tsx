import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import type { Snap as SnapType } from '@/api';
import { useSnaps } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar } from '@/ui';

import Card from './card';
import { CardSkeleton } from './components/card/card-skeleton';

const LIMIT = 15; // Number of items to fetch per page

const Feed = React.memo(() => {
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

  const { navigate } = useNavigation();

  const renderItem = ({ item }: { item: SnapType }) => (
    <Card snap={item} onPress={() => navigate('Snap', { snap: item })} />
  );

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

  const flatListData = useMemo(
    () => data?.pages.flatMap((page) => page.snaps) || [],
    [data]
  );

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
    <>
      <FocusAwareStatusBar />
      <FlatList
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ListFooterComponent={isFetchingNextPage ? <CardSkeleton /> : null}
        initialNumToRender={10}
      />
    </>
  );
});

export default Feed;
