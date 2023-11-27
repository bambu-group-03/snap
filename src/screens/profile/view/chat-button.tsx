import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { TouchableOpacity } from '@/ui';

type ChatButtonProps = {
  currentUser: UserType | undefined;
  otherUser: UserType | undefined;
  isFollowing: boolean;
};

export const ChatProfileButton = ({
  currentUser,
  otherUser,
  isFollowing,
}: ChatButtonProps) => {
  const navigation = useNavigation();

  if (
    currentUser &&
    otherUser &&
    currentUser.id !== otherUser.id &&
    isFollowing
  ) {
    return (
      <TouchableOpacity
        className="mt-4 rounded-full bg-blue-300 px-4 py-3 text-center font-bold text-white"
        onPress={() =>
          navigation.navigate('ChatMessagesScreen', {
            user: otherUser,
            chat: {
              chat_id: '',
              owner_id: currentUser.id,
              other_id: otherUser.id,
              created_at: '',
            },
          })
        }
        testID="send-message-button"
      >
        <FontAwesomeIcon icon={faMessage} />
      </TouchableOpacity>
    );
  }
  return null;
};
