import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import { Button, Text, View } from '@/ui';

type ResnapButtonProps = {
  isResnaped: boolean;
  reSnapCount: number;
  onPress: () => void;
};

const ResnapButton: React.FC<ResnapButtonProps> = ({
  isResnaped,
  reSnapCount,
  onPress,
}) => {
  return (
    <View className="duration-350 flex flex-row items-center text-xs text-gray-400 transition ease-in-out hover:text-blue-400 dark:text-white dark:hover:text-blue-400">
      <Text className="m-2">{reSnapCount}</Text>
      <Button
        variant="icon"
        onPress={onPress}
        label={
          <FontAwesomeIcon
            icon={faRetweet}
            color={isResnaped ? 'green' : 'black'}
          />
        }
      />
    </View>
  );
};

export default ResnapButton;
