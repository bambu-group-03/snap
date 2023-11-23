import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import { useNotifications } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar } from '@/ui';

import NotificationCard from './notification-card';
import type { Notification } from './types';

const INCREMENT_RENDER = 10;
const INITIAL_RENDER = 20;

export default function NotificationView() {
  const currentUser = getUserState();

  const { data, isLoading, isError, refetch } = useNotifications({
    variables: { user_id: currentUser?.id },
  });

  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    setNotifications(data ? data : []);
  }, [data]);

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

  const renderItem = ({
    item,
    index,
  }: {
    item: Notification;
    index: number;
  }) => {
    if (index < renderCount) {
      return <NotificationCard notification={item} />;
    }
    return null;
  };

  const handleEndReached = () => {
    if (renderCount < (data ? data.length : 0)) {
      setRenderCount(renderCount + INCREMENT_RENDER);
    }
  };

  return (
    <View>
      <FocusAwareStatusBar />

      <FlatList
        data={notifications}
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
}
