import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import { Button, View } from '@/ui';

type ShareButtonProps = {};

const ShareButton: React.FC<ShareButtonProps> = () => {
  return (
    <View className="duration-350 flex flex-1 items-center text-xs text-gray-400 transition ease-in-out hover:text-blue-400 dark:text-white dark:hover:text-blue-400">
      <Button
        variant="icon"
        label={<FontAwesomeIcon icon={faShare} color="gray" />}
      />
    </View>
  );
};

export default ShareButton;
