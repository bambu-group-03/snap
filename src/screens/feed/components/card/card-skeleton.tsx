import React from 'react';

import { View } from '@/ui';

export const CardSkeleton = () => {
  return (
    <View className="flex shrink-0 p-2 pb-0">
      {/* Placeholder for header */}
      <View className="flex flex-row items-center">
        <View className="inline-block h-10 w-10 rounded-full bg-gray-300" />
        <View className="mx-3 flex-1">
          {/* Placeholder for content */}
          {/* Simulate a line of text */}
          <View className="mt-2 h-4 rounded bg-gray-300" />
          <View className="mt-1 h-4 w-3/4 rounded bg-gray-200" />
        </View>
      </View>
    </View>
  );
};
