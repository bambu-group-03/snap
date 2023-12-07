import { faComment, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { memo } from 'react';

import { client } from '@/api/common/client';
import type { Snap } from '@/api/snaps/types';
import type { UserType } from '@/core/auth/utils';
import { Image, Pressable, Text, View } from '@/ui';

const CardSharedInfo = ({
  snap,
  username,
}: {
  snap: Snap;
  username: string;
}) => {
  // Check if the snap is shared by the provided username
  const isSharedByProfileUser = snap.is_shared_by.includes(username);

  return (
    <>
      {snap.parent_id && snap.parent_id !== 'None' ? (
        <View className="mb-1 flex flex-row items-center pl-12">
          <FontAwesomeIcon icon={faComment} color={'green'} />
          <Text className="pl-2 text-sm leading-6 text-gray-400">reply</Text>
        </View>
      ) : null}

      {isSharedByProfileUser && (
        <View className="flex flex-row items-center pl-12">
          <FontAwesomeIcon icon={faRetweet} color={'green'} />
          <Text className="pl-2 text-sm leading-6 text-gray-400">
            shared by @{username}
          </Text>
        </View>
      )}
    </>
  );
};

const CardHeaderProfile = memo(
  ({
    snap,
    formattedDate,
    username,
  }: {
    snap: Snap;
    formattedDate: string;
    username: string;
  }) => {
    const { navigate } = useNavigation();
    const handlePress = async () => {
      const { data: user } = await client.identity.get<UserType>(
        `/api/auth/users/${snap.author}`
      );

      navigate('Profile', { user });
    };
    return (
      <Pressable className="group block shrink-0" onPress={handlePress}>
        <CardSharedInfo snap={snap} username={username} />
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
      </Pressable>
    );
  }
);

export default CardHeaderProfile;
