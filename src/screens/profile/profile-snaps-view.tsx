import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { Snap } from '@/api';
import { useSnapsFrom } from '@/api';
import type { UserType } from '@/core/auth/utils';
import { EmptyList, FocusAwareStatusBar, View } from '@/ui';

import Card from '../feed/card';
import LoadingIndicator from '../feed/loading-indicator';

const LIMIT = 10; // Number of items to fetch per page

const ProfileSnapsView = ({ user }: { user: UserType | undefined }) => {
  const { navigate } = useNavigation();
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

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const loadMoreItems = () => {
    hasNextPage && fetchNextPage();
  };

  const renderItem = ({ item }: { item: Snap }) => (
    <Card snap={item} onPress={() => navigate('Snap', { snap: item })} />
  );

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
        onEndReachedThreshold={0.8} // Load more items earlier
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
      />
    </View>
  );
};

export default ProfileSnapsView;
