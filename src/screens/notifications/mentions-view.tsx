import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { Snap } from '@/api';
import { useMentions } from '@/api';
import { getUserState } from '@/core';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

import { Card } from '../feed/card';

const MentionScreen = () => {
  const currentUser = getUserState();

  const { data, isLoading, isError, refetch } = useMentions({
    variables: { user_id: currentUser?.id },
  });

  const { navigate } = useNavigation();

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    return (
      <View>
        <Text>Error Loading data</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Snap }) => (
    <Card snap={item} onPress={() => navigate('Snap', { snap: item })} />
  );

  return (
    <>
      <FocusAwareStatusBar />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        getItemLayout={(_, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
    </>
  );
};

export default MentionScreen;
