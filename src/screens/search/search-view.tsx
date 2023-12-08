import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { client } from '@/api/common/client';
import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Text, TouchableOpacity, View } from '@/ui';

import UserList from '../users/user-list';
import { SearchBar } from './search-bar';

const LAST_N_TRENDING_TOPICS = 10;

type TrendingTopic = {
  id: string;
  name: string;
  created_at: string;
  times_used: number;
};

const SearchView = () => {
  const [recommendedUsers, setRecommendedUsers] = useState<UserType[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const currentUser = getUserState();
  const { navigate } = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingResponse = await client.content.get(
          '/api/trending/get_all'
        );
        setTrendingTopics(trendingResponse.data);

        const usersRecommneded = await client.identity.get(
          `/api/interactions/${currentUser?.id}/recommended_users`
        );

        setRecommendedUsers(usersRecommneded.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentUser?.id]);

  const handleTopicSelect = async (topic: TrendingTopic) => {
    const topicName = topic.name.replace(/^#/, '');
    const {
      data: { snaps },
    } = await client.content.get(
      `/api/filter/hashtag?user_id=${currentUser?.id}&hashtag=${topicName}`
    );
    navigate('SnapList', { snaps });
  };

  const recentTrends = trendingTopics
    .sort((a, b) => b.times_used - a.times_used)
    .slice(0, LAST_N_TRENDING_TOPICS);

  const renderTrendingTopics = () => (
    <>
      <SearchBar />
      <View className="flex flex-row flex-wrap p-4">
        <Text className="w-full text-lg font-bold">Trending Topics</Text>
        {recentTrends.length === 0 ? (
          <View className="p-2 text-center">
            <Text>No current trending topics</Text>
          </View>
        ) : (
          recentTrends.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              onPress={() => handleTopicSelect(topic)}
              className="m-1 rounded-full bg-blue-100 px-4 py-2"
            >
              <Text className="text-blue-500">
                {topic.name} ({topic.times_used}){' '}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </>
  );

  return (
    <View className="flex flex-col">
      <UserList
        title="Recommended Users"
        users={recommendedUsers}
        headerComponent={renderTrendingTopics()}
      />
    </View>
  );
};

export default SearchView;
