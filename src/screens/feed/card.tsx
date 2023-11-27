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

const SNAP_VISIBLE = 1;

const CardSharedInfo = ({ snap }: { snap: Snap }) => {
  return (
    <>
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
    </>
  );
};

const CardHeader = ({
  snap,
  formattedDate,
}: {
  snap: Snap;
  formattedDate: string;
}) => {
  return (
    <TouchableOpacity className="group block shrink-0">
      <CardSharedInfo snap={snap} />
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
  );
};

const CardContent = ({ snap }: { snap: Snap }) => {
  return (
    <Text className="width-auto shrink text-base font-medium text-black">
      {snap.content}
    </Text>
  );
};

type CardFooterProps = {
  snap: Snap;
  isLiked: boolean;
  isReSnaped: boolean;
  commentCount: number;
  onResnap: () => void;
  onLike: () => void;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  snap,
  isLiked,
  isReSnaped,
  commentCount,
  onResnap,
  onLike,
}) => {
  return (
    <View className="mt-2 flex border-t border-gray-200">
      <View className="w-full">
        <View className="flex flex-row items-center">
          <ResnapButton
            isResnaped={isReSnaped}
            reSnapCount={snap.shares}
            onPress={onResnap}
          />
          <HeartButton
            isLiked={isLiked}
            likeCount={snap.likes}
            onPress={onLike}
          />
          <CommentButton commentCount={commentCount} onPress={() => {}} />
          <View className=" flex flex-1 items-center text-xs text-gray-400">
            {snap.privacy === SNAP_VISIBLE ? (
              <Button
                variant="icon"
                label={<FontAwesomeIcon icon={faGlobeAmericas} color="gray" />}
              />
            ) : (
              <Button
                variant="icon"
                label={<FontAwesomeIcon icon={faUserGroup} color="gray" />}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export const Card = ({
  snap,
  onPress,
}: {
  snap: Snap;
  onPress?: () => void;
}) => {
  const currentUser = getUserState();
  const [isReSnaped, setIsReSnaped] = useState<boolean>(
    snap.has_shared && snap.shares > 0
  );
  const [isLiked, setIsLiked] = useState<boolean>(
    snap.has_liked && snap.likes > 0
  );
  const [commentCount, setCommentCount] = useState<number>(
    snap.num_replies || 0
  );

  const formattedDate = new Date(snap.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  useEffect(() => {
    setIsLiked(snap.has_liked);
    setIsReSnaped(snap.has_shared);
    setCommentCount(snap.num_replies);
  }, [snap]);

  const handleResnap = async () => {
    const interaction = isReSnaped ? '/unshare/' : '/share/';
    const method = isReSnaped ? 'DELETE' : 'POST';
    isReSnaped ? snap.shares-- : snap.shares++;

    const url = `/api/interactions/${currentUser?.id}${interaction}${snap.id}`;
    setIsReSnaped(!isReSnaped); //Optimistic update

    await client.content({ url, method });
  };

  const handleLike = async () => {
    const interaction = isLiked ? '/unlike/' : '/like/';
    const method = isLiked ? 'DELETE' : 'POST';
    isLiked ? snap.likes-- : snap.likes++;

    const url = `/api/interactions/${currentUser?.id}${interaction}${snap.id}`;
    setIsLiked(!isLiked); //Optimistic update

    await client.content({ url, method });
  };

  return (
    <Pressable className="flex shrink-0 p-4 pb-0" onPress={onPress}>
      <CardHeader snap={snap} formattedDate={formattedDate} />
      <View className="pl-16">
        <CardContent snap={snap} />
        <CardFooter
          snap={snap}
          isLiked={isLiked}
          isReSnaped={isReSnaped}
          commentCount={commentCount}
          onResnap={handleResnap}
          onLike={handleLike}
        />
      </View>
    </Pressable>
  );
};

export default Card;
