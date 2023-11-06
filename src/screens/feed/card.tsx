import React, { useState } from 'react';

import type { Snap } from '@/api';
import { Image, Pressable, Text, TouchableOpacity, View } from '@/ui';

import CommentButton from './comment-button';
import HeartButton from './heart-button';
import ResnapButton from './re-snap-button';
import ShareButton from './share-button';

type Props = {
  snap: Snap;
  onPress?: () => void;
};
export const Card = ({ snap, onPress = () => {} }: Props) => {
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const formattedDate = new Date(snap.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <Pressable className="flex shrink-0 p-4 pb-0" onPress={onPress}>
      <TouchableOpacity className="group block shrink-0">
        <View className="flex flex-row items-center">
          <View>
            <Image
              className="inline-block h-10 w-10 rounded-full"
              source={{
                uri: 'https://avatars.githubusercontent.com/u/56934023?v=4',
              }}
            />
          </View>
          <View className="mx-3">
            <Text className="text-base font-medium leading-6 text-black">
              {snap.username}
              <Text className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                {' '}
                @{snap.username ? snap.username : 'default'} . {formattedDate}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View className="pl-16">
        <Text className="width-auto shrink text-base font-medium text-black">
          {snap.content}
        </Text>
        <View className="mt-2 flex border-t border-gray-200 pt-2">
          <View className="w-full">
            <View className="flex flex-row items-center">
              <ResnapButton
                isResnaped={isRetweeted}
                reSnapCount={snap.shares}
                onPress={() => setIsRetweeted(!isRetweeted)}
              />
              <HeartButton
                isLiked={isLiked}
                likeCount={snap.likes}
                onPress={() => setIsLiked(!isLiked)}
              />
              <CommentButton
                commentCount={commentCount}
                onPress={() => setCommentCount(commentCount + 1)}
              />
              <ShareButton />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
