import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { memo } from 'react';

import { client } from '@/api/common/client';
import type { Snap } from '@/api/snaps/types';
import type { UserType } from '@/core/auth/utils';
import { Image, Pressable, Text, View } from '@/ui';

import CardSharedInfo from './card-shared-info';

const CardHeader = memo(
  ({ snap, formattedDate }: { snap: Snap; formattedDate: string }) => {
    const navigate = useNavigation();
    const handlePress = async () => {
      const { data: user } = await client.identity.get<UserType>(
        `/api/auth/users/${snap.author}`
      );

      navigate.navigate('UserProfile', { user });
    };
    return (
      <View className="group block shrink-0">
        <CardSharedInfo snap={snap} />
        <Pressable onPress={handlePress}>
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
                  @{snap.username ? snap.username : 'default'} - {formattedDate}
                </Text>
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
);

export default CardHeader;
