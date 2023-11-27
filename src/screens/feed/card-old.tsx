import {
  faComment,
  faGlobeAmericas,
  faRetweet,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';

import type { Snap } from '@/api';
import { client } from '@/api/common';
import { getUserState } from '@/core';
import { Button, Image, Pressable, Text, TouchableOpacity, View } from '@/ui';

import CommentButton from './comment-button';
import HeartButton from './heart-button';
import ResnapButton from './re-snap-button';

type Props = {
  snap: Snap;
  onPress?: () => void;
};

const SNAP_VISIBLE = 1;

export const Card = ({ snap, onPress = () => {} }: Props) => {
  const currentUser = getUserState();

  const [isRetweeted, setIsRetweeted] = useState(
    snap.has_shared === true && snap.shares > 0
  );
  const [isLiked, setIsLiked] = useState(
    snap.has_liked === true && snap.likes > 0
  );
  const [commentCount, setCommentCount] = useState(
    snap.num_replies ? snap.num_replies : 0
  );
  const formattedDate = new Date(snap.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  useEffect(() => {
    setIsLiked(snap.has_liked);
    setIsRetweeted(snap.has_shared);
    setCommentCount(snap.num_replies);
  }, [snap]);

  // console.log(snap);

  return (
    <Pressable className="flex shrink-0 p-4  pb-0" onPress={onPress}>
      <TouchableOpacity className="group block shrink-0">
        {snap.parent_id ? (
          <View className="flex items-start justify-end pr-2">
            {snap.parent_id ? (
              <View className="ml-auto">
                <FontAwesomeIcon icon={faComment} color={'#006AFF'} />
              </View>
            ) : null}
          </View>
        ) : null}

        {snap.is_shared_by.length > 0 ? (
          <View className="flex flex-row items-center pl-12">
            <FontAwesomeIcon icon={faRetweet} color={'green'} />
            <Text className="pl-2 text-sm leading-6 text-gray-400">
              shared by @{snap.is_shared_by[0]}
            </Text>
          </View>
        ) : null}

        <View className="flex flex-row items-center">
          <Image
            className="inline-block h-10 w-10 rounded-full"
            source={{
              uri: snap.profile_photo_url,
            }}
          />
          <View className="mx-3">
            <Text className="text-base leading-6 text-black">
              {snap.fullname}
              <Text className="text-sm leading-5 text-gray-400">
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
        <View className="mt-2 flex border-t border-gray-200">
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

                  client
                    .content({
                      url:
                        '/api/interactions/' +
                        currentUser?.id +
                        interaction +
                        snap.id,
                      method: method,
                    })
                    .then((response) => {
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

                  client
                    .content({
                      url:
                        '/api/interactions/' +
                        currentUser?.id +
                        interaction +
                        snap.id,
                      method: method,
                    })
                    .then((response) => {
                      console.log(
                        'response.data by' + interaction,
                        response.status
                      );
                    });

                  setIsLiked(!isLiked);
                }}
              />
              <CommentButton commentCount={commentCount} onPress={() => {}} />
              {/* <ShareButton /> */}

              {snap.privacy === SNAP_VISIBLE ? (
                <View className="duration-350 flex flex-1 items-center text-xs text-gray-400 transition ease-in-out hover:text-blue-400 dark:text-white dark:hover:text-blue-400">
                  <Button
                    variant="icon"
                    label={
                      <FontAwesomeIcon icon={faGlobeAmericas} color="gray" />
                    }
                  />
                </View>
              ) : (
                <View className="duration-350 flex flex-1 items-center text-xs text-gray-400 transition ease-in-out hover:text-blue-400 dark:text-white dark:hover:text-blue-400">
                  <Button
                    variant="icon"
                    label={<FontAwesomeIcon icon={faUserGroup} color="gray" />}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
