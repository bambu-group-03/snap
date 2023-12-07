import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { client } from '@/api/common/client';
import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Text, TouchableOpacity, View } from '@/ui';

import UserList from '../users/user-list';
import { SearchBar } from './search-bar';

type TrendingTopic = {
  id: string;
  name: string;
};

const SearchView = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const currentUser = getUserState();
  const { navigate } = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await client.identity.get(
          'api/auth/users?limit=10&offset=0'
        );
        setUsers(userResponse.data);

        const trendingResponse = await client.content.get(
          '/api/trending/get_all'
        );
        setTrendingTopics(trendingResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTopicSelect = async (topic: TrendingTopic) => {
    const topicName = topic.name.replace(/^#/, '');
    const {
      data: { snaps },
    } = await client.content.get(
      `/api/filter/hashtag?user_id=${currentUser?.id}&hashtag=${topicName}`
    );
    navigate('SnapList', { snaps });
  };

  const renderTrendingTopics = () => (
    <>
      <SearchBar />
      <View className="flex flex-row flex-wrap p-4">
        <Text className="w-full text-lg font-bold">Trending Topics</Text>
        {trendingTopics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            onPress={() => handleTopicSelect(topic)}
            className="m-1 rounded-full bg-blue-100 px-4 py-2"
          >
            <Text className="text-blue-500">{topic.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  return (
    <View className="flex flex-col">
      <UserList
        title="Recommended Users"
        users={users}
        headerComponent={renderTrendingTopics()}
      />
    </View>
  );
};

export default SearchView;
