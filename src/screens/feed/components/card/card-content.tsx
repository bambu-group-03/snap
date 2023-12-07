import React, { memo } from 'react';

import { type Snap } from '@/api';
import { Text, View } from '@/ui';

const CardContent = memo(({ snap }: { snap: Snap }) => {
  return (
    <View className="flex flex-col items-start justify-start">
      <Text className="width-auto shrink text-base font-medium text-black">
        {snap.content}
      </Text>
    </View>
  );
});

export default CardContent;
