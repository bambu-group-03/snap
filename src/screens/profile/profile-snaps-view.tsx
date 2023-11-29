import React, { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { Snap } from '@/api';
import { useSnapsFrom } from '@/api';
import type { UserType } from '@/core/auth/utils';
import { EmptyList, FocusAwareStatusBar, View } from '@/ui';

import Card, { CardSkeleton } from '../feed/card';

const LIMIT = 10; // Number of items to fetch per page

const ProfileSnapsView = ({ user }: { user: UserType | undefined }) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useSnapsFrom({ userId: user?.id, limit: LIMIT, offset: 0 });

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

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
    <FlatList
      data={data?.pages.flatMap((page) => page.snaps) || []}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0.5} // Load more items earlier
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      ListFooterComponent={isFetchingNextPage ? <CardSkeleton /> : null}
    />
  );
};

export default ProfileSnapsView;
