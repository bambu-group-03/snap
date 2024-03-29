import {
  faMessage,
  faUserPlus,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { client } from '@/api/common';
import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Button, Image, Text, TouchableOpacity, View } from '@/ui';

const ProfileScreenView = ({
  user,
  follower_count,
  following_count,
}: // user_is_followed = false,
{
  user: UserType | undefined;
  follower_count: number;
  following_count: number;
  user_is_followed?: boolean;
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

  useEffect(() => {
    setIsFollowing(user?.is_followed || false);
  }, [user]);

  const navigate = useNavigation();

  return (
    <View className="relative mx-auto mb-6 mt-3 w-full min-w-0 max-w-md break-words rounded-xl bg-white shadow-lg">
      <View className="px-6">
        <View className="flex flex-wrap justify-center">
          {/* ProfileHeader START */}
          <>
            <View className="flex w-full items-center justify-center text-center">
              <View className="relative">
                <Image
                  source={user?.profile_photo_id}
                  className="order-1 h-32 w-32 rounded-full" // Adjusted size to h-32 and w-32
                />
              </View>
            </View>
            <Text className="block text-center text-xl font-bold tracking-wide text-slate-700">
              @{user?.username}
            </Text>
          </>
          {/* ProfileHeader END */}
          {/* START FollowActions */}
          <>
            <View className="flex flex-row justify-center pb-0 lg:pt-4 ">
              {/* START FOLLOW BUTTONS */}
              {user?.username !== userData?.username ? (
                <View className=" mr-4 mt-4 text-center">
                  {isFollowing === true ? (
                    <TouchableOpacity
                      className="inline rounded-full bg-red-300 px-4 py-3 text-center font-bold text-white"
                      onPress={() => {
                        const interaction = '/unfollow/';
                        const method = 'DELETE';

                        client
                          .identity({
                            url:
                              '/api/interactions/' +
                              userData?.id +
                              interaction +
                              user?.id,
                            method: method,
                          })
                          .then((response) => {
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
                    >
                      <FontAwesomeIcon icon={faUserTimes} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className="inline rounded-full bg-blue-300 px-4 py-3
                        text-center font-bold text-white"
                      onPress={() => {
                        const interaction = '/follow/';
                        const method = 'POST';

                        client
                          .identity({
                            url:
                              '/api/interactions/' +
                              userData?.id +
                              interaction +
                              user?.id,
                            method: method,
                          })
                          .then((response) => {
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
                    >
                      <FontAwesomeIcon icon={faUserPlus} />
                    </TouchableOpacity>
                  )}
                </View>
              ) : null}
              {/* END FOLLOW BUTTONS */}

              {/* START CHAT BUTTON */}
              {user && userData && user.id !== userData.id && isFollowing ? (
                <TouchableOpacity
                  className="mt-4 rounded-full bg-blue-500 px-4 py-3 text-center font-bold text-white"
                  onPress={() =>
                    navigate.navigate('Chat', {
                      user,
                      chat: {
                        chat_id: '',
                        owner_id: userData?.id,
                        other_id: user?.id,
                        created_at: '',
                      },
                    })
                  }
                  testID="send-message-button"
                >
                  <FontAwesomeIcon icon={faMessage} />
                </TouchableOpacity>
              ) : null}
              {/*  END CHAT BUTTON */}
            </View>
          </>
          {/* END FollowActions */}
          {/* START ProfileStats */}
          <>
            <View className="flex flex-row justify-center pb-0 lg:pt-4 ">
              <View className="p-3 text-center">
                <TouchableOpacity
                  onPress={() => {
                    console.log('Followers');

                    const interaction = '/followers';
                    const method = 'GET';

                    client
                      .identity({
                        url: '/api/interactions/' + user?.id + interaction,
                        method: method,
                      })
                      .then((response) => {
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

                  <Text className="text-sm text-blue-600 underline">
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

                    client
                      .identity({
                        url: '/api/interactions/' + user?.id + interaction,
                        method: method,
                      })
                      .then((response) => {
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

                  <Text className="text-sm text-blue-600 underline">
                    Following
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
          {/* END ProfileStats */}

          {/* START EDIT BUTTON */}
          {user?.id === userData?.id ? (
            <View className="flex flex-row justify-center pb-0 lg:pt-4 ">
              <Button
                label="Edit"
                className="mt-4 rounded-full bg-blue-400 px-4 py-2 text-center font-bold text-white shadow hover:bg-blue-500"
                onPress={() => {
                  navigate.navigate('EditProfile', {
                    user: userData,
                  });
                }}
              />
            </View>
          ) : null}
          {/* END EDIT BUTTON */}
        </View>
        {/* START PROFILE BIO*/}
        <>
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
        </>
        {/* END PROFILE BIO*/}
      </View>
    </View>
  );
};

export default ProfileScreenView;
