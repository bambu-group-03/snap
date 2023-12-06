import React, { useEffect } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import { useNotifications } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar } from '@/ui';

import NotificationCard from './notification-card';
import type { Notification } from './types';

export default function NotificationView() {
  const currentUser = getUserState();
  const { data, isLoading, isError, refetch } = useNotifications({
    variables: { user_id: currentUser?.id },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isError) {
    return (
      <View>
        <Text>Error Loading data</Text>
      </View>
    );
  }

  return (
    <View>
      <FocusAwareStatusBar />
      <FlatList
        data={data}
        renderItem={({ item }: { item: Notification }) => (
          <NotificationCard notification={item} />
        )}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
        }
        getItemLayout={(_, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
    </View>
  );
}
