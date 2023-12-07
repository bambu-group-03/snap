import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { memo } from 'react';
import { useEffect, useState } from 'react';

import { client } from '@/api/common/client';
import type { Snap } from '@/api/snaps/types';
import type { UserType } from '@/core/auth/utils';
import { Image, Text, TouchableOpacity, View } from '@/ui';

import CardSharedInfo from './card-shared-info';

const CardHeader = memo(
  ({ snap, formattedDate }: { snap: Snap; formattedDate: string }) => {
    const navigate = useNavigation();
    const handlePress = async () => {
      const { data: user } = await client.identity.get<UserType>(
        `/api/auth/users/${snap.author}`
      );

      navigate.navigate('Profile', { user });
    };

    const [parentSnap, setParentSnap] = useState<Snap | null>(null);

    useEffect(() => {
      const fetchParentSnap = async () => {
        if (snap.parent_id) {
          try {
            const { data: snapResponse } = await client.content.get<Snap>(
              `/api/feed/snap/${snap.parent_id}?user_id=${snap.author}`
            );
            setParentSnap(snapResponse);
          } catch (error) {
            console.error('Error fetching parent snap:', error);
          }
        }
      };

      fetchParentSnap();
    }, [snap.parent_id, snap.author]);

    const snapNavigate = parentSnap || snap;
    return (
      <View className="group block shrink-0">
        <TouchableOpacity
          className="mx-3"
          onPress={() => navigate.navigate('Snap', { snap: snapNavigate })}
        >
          <CardSharedInfo snap={snap} />
        </TouchableOpacity>

        <View className="flex flex-row items-center">
          <TouchableOpacity onPress={handlePress}>
            <Image
              className="inline-block h-10 w-10 rounded-full"
              source={{
                uri: snap.profile_photo_url,
              }}
            />
          </TouchableOpacity>

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
      </View>
    );
  }
);

export default CardHeader;
