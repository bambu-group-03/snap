import {
  faGlobeAmericas,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import type { Snap } from '@/api';
import { Button, View } from '@/ui';

import CommentButton from './comment-button';
import FavBookmarkButton from './fav-bookmark-button';
import HeartButton from './heart-button';
import ResnapButton from './re-snap-button';

const SNAP_VISIBLE = 1;

type CardFooterProps = {
  snap: Snap;
  isLiked: boolean;
  isReSnaped: boolean;
  isFavBookmarked: boolean;
  commentCount: number;
  onResnap: () => void;
  onLike: () => void;
  onFavBookmark: () => void;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  snap,
  isLiked,
  isReSnaped,
  commentCount,
  isFavBookmarked,
  onResnap,
  onLike,
  onFavBookmark,
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
          <FavBookmarkButton
            isFavBookmarked={isFavBookmarked}
            onPress={onFavBookmark}
          />
        </View>
      </View>
    </View>
  );
};

export default CardFooter;
