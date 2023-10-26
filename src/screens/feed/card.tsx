import {
  faComment,
  faHeart,
  faRetweet,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';

import type { Snap } from '@/api';
import { Button, Image, Pressable, Text, TouchableOpacity, View } from '@/ui';

type Props = {
  snap: Snap;
  onPress?: () => void;
};
export const Card = ({ snap, onPress = () => {} }: Props) => {
  const [likeCount, setCount] = useState(0);
  const [reSnapCount, setReSnapCount] = useState(0);
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
              {snap.author}
              <Text className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                {' '}
                @{snap.author} . {formattedDate}
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
              <View className="duration-350 flex flex-row items-center text-xs text-gray-400 transition ease-in-out hover:text-blue-400 dark:text-white dark:hover:text-blue-400">
                <Text className="m-2">{reSnapCount}</Text>
                <Button
                  variant="icon"
                  onPress={() => setReSnapCount(reSnapCount + 1)}
                  label={<FontAwesomeIcon icon={faRetweet} />}
                />
              </View>
              <View className="duration-350 flex flex-row items-center text-xs text-gray-400 transition ease-in-out hover:text-red-400 dark:text-white dark:hover:text-green-400">
                <Text className="m-2">{likeCount}</Text>
                <Button
                  variant="icon"
                  onPress={() => setCount(likeCount + 1)}
                  label={<FontAwesomeIcon icon={faHeart} />}
                />
              </View>
              <View className="duration-350 flex flex-row items-center text-xs text-gray-400 transition ease-in-out hover:text-green-600 dark:text-white dark:hover:text-red-600">
                <Text className="m-2">{commentCount}</Text>
                <Button
                  variant="icon"
                  onPress={() => setCommentCount(commentCount + 1)}
                  label={<FontAwesomeIcon icon={faComment} />}
                />
              </View>
              <View className="duration-350 flex flex-1 items-center text-xs text-gray-400 transition ease-in-out hover:text-blue-400 dark:text-white dark:hover:text-blue-400">
                <FontAwesomeIcon icon={faShare} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
