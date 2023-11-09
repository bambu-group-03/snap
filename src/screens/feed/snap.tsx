import { useRoute } from '@react-navigation/native';
import * as React from 'react';

import { useSnap } from '@/api';
import type { RouteProp } from '@/navigation/types';
import { ActivityIndicator, FocusAwareStatusBar, Text, View } from '@/ui';

export const Snap = () => {
  const { params } = useRoute<RouteProp<'Snap'>>();

  const { data, isLoading, isError } = useSnap({
    variables: { tweet_id: params.id },
  });

  if (isLoading) {
    return (
      <View className="flex-1  justify-center">
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1  justify-center">
        <FocusAwareStatusBar />
        <Text variant="md" className="text-center">
          Error loading post
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <Text variant="md">{data.content} </Text>
    </View>
  );
};
