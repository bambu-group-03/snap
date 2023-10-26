import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import { Button, Text, View } from '@/ui';

type HeartButtonProps = {
  isLiked: boolean;
  likeCount: number;
  onPress: () => void;
};

const HeartButton: React.FC<HeartButtonProps> = ({
  isLiked,
  likeCount,
  onPress,
}) => {
  return (
    <View className="duration-350 flex flex-row items-center text-xs text-gray-400 transition ease-in-out hover:text-red-400 dark:text-white dark:hover:text-green-400">
      <Text className="m-2">{likeCount}</Text>
      <Button
        variant="icon"
        onPress={onPress}
        label={
          <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'black'} />
        }
      />
    </View>
  );
};

export default HeartButton;
