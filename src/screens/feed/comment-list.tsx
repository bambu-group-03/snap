import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { Snap } from '@/api';
import { userReplySnaps } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

import { Card } from './card';
import { CardSkeleton } from './components/card/card-skeleton';

export const Comments = ({ snap }: { snap: Snap }) => {
  const currentUser = getUserState();

  const {
    data,
    isLoading,
    isError,
    refetch,
  }: {
    data: Snap[] | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
  } = userReplySnaps({
    variables: { snap_id: snap?.id, user_id: currentUser?.id },
  });

  const { navigate } = useNavigation();

  // The useCallback hook
  const onRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <View>
        <FocusAwareStatusBar />
        {Array.from({ length: data?.length || 6 }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </View>
    );
  }
  // Early return in case of error
  if (isError) {
    return (
      <View>
        <Text>Error Loading data</Text>
      </View>
    );
  }

  return (
    <>
      <FocusAwareStatusBar />
      <FlatList
        data={data}
        renderItem={({ item }: { item: Snap }) => (
          <Card snap={item} onPress={() => navigate('Snap', { snap: item })} />
        )}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        getItemLayout={(_data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
    </>
  );
};
