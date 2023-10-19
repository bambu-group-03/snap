import React, { useState } from 'react';

import type { Snap } from '@/api';
import { Button, Pressable, Text, View } from '@/ui';

type Props = Snap & { onPress?: () => void };

export const Card = ({ content, author, onPress = () => {} }: Props) => {
  const [count, setCount] = useState(0);
  const like = () => setCount((prevCount) => prevCount + 1);

  return (
    <Pressable
      className="m-2 block overflow-hidden rounded-xl  bg-neutral-200 p-2 shadow-xl dark:bg-charcoal-900"
      onPress={onPress}
    >
      <View>
        <Text variant="md" numberOfLines={1} className="font-bold">
          {`@${author}`}
        </Text>
        <Text variant="xs" numberOfLines={3}>
          {content}
        </Text>
      </View>
      <Button label={'Likes: ' + count.toString()} onPress={like} />
      <Button label={'Share'} onPress={() => console.log('share')} />
      <Button label={'reSnap'} onPress={() => console.log('re snap')} />
      <></>
    </Pressable>
  );
};
