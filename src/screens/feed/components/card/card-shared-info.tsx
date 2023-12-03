import { faComment, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import type { Snap } from '@/api';
import { Text, View } from '@/ui';

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

export default CardSharedInfo;
