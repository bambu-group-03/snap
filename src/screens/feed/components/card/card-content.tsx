import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';

import type { Snap } from '@/api';
import { Pressable, Text } from '@/ui';

const CardContent = memo(({ snap }: { snap: Snap }) => {
  const { navigate } = useNavigation();
  return (
    <Pressable
      className="flex flex-col items-start justify-start"
      onPress={() => navigate('Snap', { snap })}
    >
      <Text className="width-auto shrink text-base font-medium text-black">
        {snap.content}
      </Text>
    </Pressable>
  );
});

export default CardContent;
