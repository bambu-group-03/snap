import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';

import { client, type Snap } from '@/api';
import { Pressable, Text, TouchableOpacity } from '@/ui';

const CardContent = memo(({ snap }: { snap: Snap }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      className="flex flex-col items-start justify-start"
      onPress={() => navigate('Snap', { snap: snap })}
    >
      <Text className="width-auto shrink text-base font-medium text-black">
        {snap.content}
      </Text>
    </TouchableOpacity>
  );
});

export default CardContent;
