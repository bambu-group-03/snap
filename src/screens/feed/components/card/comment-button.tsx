import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import { Button, Text, View } from '@/ui';

type CommentButtonProps = {
  commentCount: number;
  onPress: () => void;
};

const CommentButton: React.FC<CommentButtonProps> = ({
  commentCount,
  onPress,
}) => {
  return (
    <View className="duration-350 flex flex-row items-center text-xs text-gray-400 transition ease-in-out hover:text-red-400 dark:text-white dark:hover:text-green-400">
      <Text className="m-2">{commentCount}</Text>
      <Button
        variant="icon"
        onPress={onPress}
        label={<FontAwesomeIcon icon={faComment} color="black" />}
      />
    </View>
  );
};

export default CommentButton;
