import { useNavigation } from '@react-navigation/native';
import type { AxiosInstance } from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Button, Image, Text, TouchableOpacity, View } from '@/ui';

const ProfileScreenView = ({
  user,
  follower_count,
  following_count,
  user_is_followed = false,
  client,
}: {
  user: UserType | undefined;
  follower_count: number;
  following_count: number;
  user_is_followed?: boolean;
  client?: AxiosInstance;
}) => {
  const userData = getUserState();
  console.log(` user ${JSON.stringify(user)}`);
  console.log('Num de segudores: ' + follower_count);
  console.log('Num de seguidos: ' + following_count);

  const [isFollowing, setIsFollowing] = useState<boolean>(
    user?.is_followed || false
  );
  const [followerCount, setFollowerCount] = useState(follower_count);
  const [followingCount, setFollowingCount] = useState(following_count);

  useEffect(() => {
    setFollowerCount(follower_count);
  }, [follower_count]);

  useEffect(() => {
    setFollowingCount(following_count);
  }, [following_count]);

  const navigate = useNavigation();

  return (
    <View>
      <View className="relative mx-auto mb-6 mt-3 w-full min-w-0 max-w-md break-words rounded-xl bg-white shadow-lg md:max-w-2xl">
        <View className="px-6">
          <View className="flex flex-wrap justify-center">
            <View className="flex w-full items-center justify-center text-center">
              <View className="relative">
                <Image
                  source={user?.profile_photo_id}
                  className="order-1 h-32 w-32 rounded-full" // Adjusted size to h-32 and w-32
                />
              </View>

              <Text className="block text-center text-xl font-bold tracking-wide text-slate-700">
                @{user?.username}
              </Text>

              {user?.username !== userData?.username ? (
                <View className=" mt-4 text-center ">
                  {isFollowing === true ? (
                    <Button
                      label="UnFollow"
                      className="inline rounded-full bg-red-600 px-4 py-3 text-center font-bold text-white"
                      onPress={() => {
                        const interaction = '/unfollow/';
                        const method = 'DELETE';

                        client?.({
                          url: userData?.id + interaction + user?.id,
                          method: method,
                        }).then((response) => {
                          console.log(
                            'response.data by ' +
                              interaction +
                              ' ' +
                              response.status
                          );
                          console.log(userData?.id + interaction + user?.id);
                        });

                        if (followerCount > 0) {
                          setFollowerCount(followerCount - 1);
                        }
                        setIsFollowing(false);
                      }}
                      testID="unfollow-button"
                    />
                  ) : (
                    <Button
                      label="Follow"
                      className="inline rounded-full bg-blue-500 px-4 py-3 text-center font-bold text-white"
                      onPress={() => {
                        const interaction = '/follow/';
                        const method = 'POST';

                        client?.({
                          url: userData?.id + interaction + user?.id,
                          method: method,
                        }).then((response) => {
                          console.log(
                            'response.data by ' +
                              interaction +
                              ' ' +
                              response.status
                          );
                          console.log(userData?.id + interaction + user?.id);
                        });

                        setFollowerCount(followerCount + 1);
                        setIsFollowing(true);
                      }}
                      testID="follow-button"
                    />
                  )}
                </View>
              ) : null}
            </View>
            <View className="w-full text-center ">
              <View className="flex flex-row justify-center pb-0 lg:pt-4 ">
                <View className="p-3 text-center">
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Followers');

                      const interaction = '/followers';
                      const method = 'GET';

                      client?.({
                        url: user?.id + interaction,
                        method: method,
                      }).then((response) => {
                        console.log(
                          'response.data by ' +
                            interaction +
                            ' ' +
                            response.status
                        );

                        navigate.navigate('Followers', {
                          users: response.data,
                        });
                      });
                    }}
                  >
                    <Text className="block text-center text-xl font-bold uppercase tracking-wide text-slate-700">
                      {followerCount}
                    </Text>

                    <Text
                      className="text-sm text-slate-400"
                      style={{
                        color: '#0077cc',
                        textDecorationLine: 'underline',
                      }}
                    >
                      Followers
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="p-3 text-center">
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Following');

                      const interaction = '/following';
                      const method = 'GET';

                      client?.({
                        url: user?.id + interaction,
                        method: method,
                      }).then((response) => {
                        console.log(
                          'response.data by ' +
                            interaction +
                            ' ' +
                            response.status
                        );

                        navigate.navigate('Following', {
                          users: response.data,
                        });
                      });
                    }}
                  >
                    <Text className="block text-center text-xl font-bold uppercase tracking-wide text-slate-700">
                      {followingCount}
                    </Text>

                    <Text
                      className="text-sm text-slate-400"
                      style={{
                        color: '#0077cc',
                        textDecorationLine: 'underline',
                      }}
                    >
                      Following
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View className="mt-2 text-center">
            <Text className="mb-1 text-2xl font-bold leading-normal text-slate-700">
              {user?.first_name} {user?.last_name}
            </Text>
            <View className="mb-2 mt-0 text-xs font-bold uppercase text-slate-400">
              <Text className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75">
                {userData?.ubication}
              </Text>
            </View>
          </View>
          <View className="mt-1 border-t border-slate-200 py-3 text-center">
            <View className="flex flex-wrap justify-center">
              <View className="w-full px-4">
                <Text className="mb-4 font-light leading-relaxed text-slate-600">
                  {user?.bio_msg ? user?.bio_msg : 'No bio'}
                </Text>
              </View>
            </View>
          </View>
          <View className="border-blueGray-200 border-t" />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreenView;
