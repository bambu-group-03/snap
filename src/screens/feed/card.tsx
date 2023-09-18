import React, { useState } from 'react';

import type { Post } from '@/api';
import { Button, Image, Pressable, Text, View } from '@/ui';

type Props = Post & { onPress?: () => void };

export const Card = ({ body, onPress = () => {} }: Props) => {
  const [count, setCount] = useState(0);
  const like = () => setCount((prevCount) => prevCount + 1);

  return (
    <Pressable
      className="m-2 block overflow-hidden rounded-xl  bg-neutral-200 p-2 shadow-xl dark:bg-charcoal-900"
      onPress={onPress}
    >
      <View>
        <Text variant="md" numberOfLines={1} className="font-bold">
          {'@pandaluis'}
        </Text>
        <Text variant="xs" numberOfLines={3}>
          {body}
        </Text>
      </View>
      <Image
        className="h-56 w-full object-cover "
        source={{
          uri: 'https://cff2.earth.com/uploads/2018/06/27125210/Panda-conservation-can-generate-billions-of-dollars-in-value.jpg',
        }}
      />

      <Button label={'Likes: ' + count.toString()} onPress={like} />
      <Button label={'Share'} onPress={() => console.log('share')} />
      <Button label={'reSnap'} onPress={() => console.log('re snap')} />
    </Pressable>
  );
};
