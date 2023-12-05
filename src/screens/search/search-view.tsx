import { useEffect, useState } from 'react';
import React from 'react';

import { client } from '@/api/common';
import type { UserType } from '@/core/auth/utils';
import { FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';

import UserList from '../users/user-list';
import { SearchBar } from './search-bar';

const SearchView = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    // console.log('Effect is running...');
    client.identity
      .get(`api/auth/users?limit=10&offset=0`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Request failed:', error);
      });
  }, []);

  return (
    <>
      <FocusAwareStatusBar />
      <View>
        <ScrollView>
          <SearchBar />
        </ScrollView>
      </View>
      <Text className="px-5 py-2 text-left text-2xl font-bold">
        Recommended Users
      </Text>
      <UserList users={users} />
    </>
  );
};

export default SearchView;
