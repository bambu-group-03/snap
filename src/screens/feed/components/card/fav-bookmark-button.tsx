import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import { Button, View } from '@/ui';

type FavBookmarkButtonProps = {
  isFavBookmarked: boolean;
  onPress: () => void;
};

const FavBookmarkButton: React.FC<FavBookmarkButtonProps> = ({
  isFavBookmarked,

  onPress,
}) => {
  return (
    <View className="duration-350 flex flex-row items-center px-2 text-xs text-gray-400 transition ease-in-out hover:text-blue-400 dark:text-white dark:hover:text-blue-400">
      <Button
        variant="icon"
        onPress={onPress}
        label={
          <FontAwesomeIcon
            icon={faBookmark}
            color={isFavBookmarked ? 'red' : 'black'}
          />
        }
      />
    </View>
  );
};

export default FavBookmarkButton;
