import type { AxiosInstance } from 'axios';
import React, { useState } from 'react';

import type { Snap } from '@/api';
import { Image, Pressable, Text, TouchableOpacity, View } from '@/ui';

import CommentButton from './comment-button';
import HeartButton from './heart-button';
import ResnapButton from './re-snap-button';
import ShareButton from './share-button';

type Props = {
  snap: Snap;
  client: AxiosInstance;
  onPress?: () => void;
};

export const Card = ({ snap, client, onPress = () => {} }: Props) => {
  const [isRetweeted, setIsRetweeted] = useState(
    snap.has_shared && snap.shares > 0
  );
  const [isLiked, setIsLiked] = useState(snap.has_liked && snap.likes > 0);
  const [commentCount, setCommentCount] = useState(
    snap.num_replies ? snap.num_replies : 0
  );
  const formattedDate = new Date(snap.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  console.log(snap);

  return (
    <Pressable className="flex shrink-0 p-4 pb-0" onPress={onPress}>
      <TouchableOpacity className="group block shrink-0">
        <View className="flex flex-row items-center">
          <View>
            <Image
              className="inline-block h-10 w-10 rounded-full"
              source={{
                uri: snap.profile_photo_url,
              }}
            />
          </View>
          <View className="mx-3">
            <Text className="text-base font-medium leading-6 text-black">
              {snap.fullname}
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
                onPress={() => {
                  let interaction = '';
                  let method = '';

                  if (isRetweeted) {
                    interaction = '/unshare/';
                    method = 'DELETE';
                    if (snap.shares > 0) {
                      snap.shares--;
                    }
                  } else {
                    interaction = '/share/';
                    method = 'POST';
                    snap.shares++;
                  }

                  client({
                    url: snap.author + interaction + snap.id,
                    method: method,
                  }).then((response) => {
                    console.log(
                      'response.data by ' + interaction + response.status
                    );
                  });

                  setIsRetweeted(!isRetweeted);
                }}
              />
              <HeartButton
                isLiked={isLiked}
                likeCount={snap.likes}
                onPress={async () => {
                  let interaction = '';
                  let method = '';

                  if (isLiked) {
                    interaction = '/unlike/';
                    method = 'DELETE';
                    if (snap.likes > 0) {
                      snap.likes--;
                    }
                  } else {
                    interaction = '/like/';
                    method = 'POST';
                    snap.likes++;
                  }

                  client({
                    url: snap.author + interaction + snap.id,
                    method: method,
                  }).then((response) => {
                    console.log(
                      'response.data by' + interaction,
                      response.status
                    );
                  });

                  setIsLiked(!isLiked);
                }}
              />
              <CommentButton commentCount={commentCount} onPress={() => {}} />
              <ShareButton />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
