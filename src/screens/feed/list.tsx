import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Snap } from '@/api';
import { useSnaps } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

import { Card } from './card';
import Compose from './compose';

export const Feed = () => {
  const currentUser = getUserState();
  const { data, isLoading, isError } = useSnaps({
    variables: { user_id: currentUser?.id },
  });
  const { navigate } = useNavigation();

  const renderItem = React.useCallback(
    ({ item }: { item: Snap }) => (
      <Card snap={item} onPress={() => navigate('Snap', { id: item.id })} />
    ),
    [navigate]
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
  return (
    <>
      <Compose />
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
      />
    </>
  );
};
