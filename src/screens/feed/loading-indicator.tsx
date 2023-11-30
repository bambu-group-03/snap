import React from 'react';

import { Text, View } from '@/ui';

const LoadingSkeleton = () => {
  return (
    <View className="flex flex-row items-center justify-between p-4">
      <Text className="italic text-gray-400">Loading more items...</Text>
    </View>
  );
};

export default LoadingSkeleton;
