import React, { useEffect, useState } from 'react';

import type { Snap } from '@/api';
import { client } from '@/api/common';
import { getUserState } from '@/core';
import { TouchableOpacity, View } from '@/ui';

import CardContent from './components/card/card-content';
import CardFooter from './components/card/card-footer';
import CardHeader from './components/card/card-header';

const formatRelativeDate = (dateString: string) => {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const differenceInSeconds = Math.round(
    (now.getTime() - date.getTime()) / 1000
  );

  const minute: number = 60;
  const hour: number = minute * 60;
  const day: number = hour * 24;

  if (differenceInSeconds < minute) {
    return 'just now';
  } else if (differenceInSeconds < hour) {
    return `${Math.floor(differenceInSeconds / minute)} minutes ago`;
  } else if (differenceInSeconds < day) {
    return `${Math.floor(differenceInSeconds / hour)} hours ago`;
  } else {
    return `${Math.floor(differenceInSeconds / day)} days ago`;
  }
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

  const [isFavedBookmark, setFavedBookmark] = useState<boolean>(
    snap.has_faved || false
  );

  // Verificar si ya esta bookmarked

  const formattedDate = formatRelativeDate(snap.created_at);

  useEffect(() => {
    setIsLiked(snap.has_liked);
    setIsReSnaped(snap.has_shared);
    setCommentCount(snap.num_replies);
    setFavedBookmark(snap.has_faved);
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

  const handleFavBookmark = async () => {
    const interaction = isFavedBookmark ? '/unfav/' : '/fav/';
    const method = isFavedBookmark ? 'DELETE' : 'POST';

    const url = `/api/interactions/${currentUser?.id}${interaction}${snap.id}`;
    setFavedBookmark(!isFavedBookmark); //Optimistic update

    await client.content({ url, method });
  };
  const cardHeaderClass =
    snap.parent_id && snap.parent_id !== 'None'
      ? 'bg-gray-100 border-transparent rounded-lg shadow-sm border border-gray-100 ml-4 mr-2'
      : '';
  return (
    <TouchableOpacity
      className={`flex shrink-0 p-4 pb-0 ${cardHeaderClass}`}
      onPress={onPress}
    >
      <CardHeader snap={snap} formattedDate={formattedDate} />

      <View className="pl-16">
        <CardContent snap={snap} />
      </View>

      <View className="pl-16">
        <CardFooter
          snap={snap}
          isLiked={isLiked}
          isReSnaped={isReSnaped}
          commentCount={commentCount}
          isFavBookmarked={isFavedBookmark}
          onResnap={handleResnap}
          onLike={handleLike}
          onFavBookmark={handleFavBookmark}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Card;
