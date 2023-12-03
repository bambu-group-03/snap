import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';

import { client, type Snap } from '@/api';
import { Pressable, Text } from '@/ui';

const CardContent = memo(({ snap }: { snap: Snap }) => {
  const { navigate } = useNavigation();
  const [parentSnap, setParentSnap] = useState<Snap | null>(null);

  useEffect(() => {
    const fetchParentSnap = async () => {
      if (snap.parent_id) {
        try {
          const { data: snapResponse } = await client.content.get<Snap>(
            `/api/feed/snap/${snap.parent_id}?user_id=${snap.author}`
          );
          setParentSnap(snapResponse);
        } catch (error) {
          console.error('Error fetching parent snap:', error);
        }
      }
    };

    fetchParentSnap();
  }, [snap.parent_id, snap.author]);

  const snapNavigate = parentSnap || snap;

  return (
    <Pressable
      className="flex flex-col items-start justify-start"
      onPress={() => navigate('Snap', { snap: snapNavigate })}
    >
      <Text className="width-auto shrink text-base font-medium text-black">
        {snap.content}
      </Text>
    </Pressable>
  );
});

export default CardContent;
