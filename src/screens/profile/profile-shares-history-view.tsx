import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { Snap } from '@/api';
import { useSnapSharedByMeFrom } from '@/api';
import type { UserType } from '@/core/auth/utils';
import { EmptyList, FocusAwareStatusBar, View } from '@/ui';

import { CardSkeleton } from '../feed/components/card/card-skeleton';
import CardProfile from './components/card-profile';

const LIMIT = 10; // Number of items to fetch per page

const ProfileSharesHistoryView = ({
  user,
  headerComponent,
}: {
  user: UserType | undefined;
  headerComponent: React.ComponentType<any> | React.ReactElement | null;
}) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useSnapSharedByMeFrom({ userId: user?.id, limit: LIMIT, offset: 0 });

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const loadMoreItems = () => {
    hasNextPage && fetchNextPage();
  };

  const { navigate } = useNavigation();

  const renderItem = ({ item }: { item: Snap }) => (
    <CardProfile
      snap={item}
      username={user?.username || ''}
      onPress={() => navigate('Snap', { snap: item })}
    />
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
    <FlatList
      data={data?.pages.flatMap((page) => page.snaps) || []}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0.5} // Load more items earlier
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      ListHeaderComponent={headerComponent}
      ListFooterComponent={isFetchingNextPage ? <CardSkeleton /> : null}
    />
  );
};

export default ProfileSharesHistoryView;
