import { View, Text, FocusAwareStatusBar, ScrollView } from '@/ui';
import { SearchBar } from './search-bar';
import UserList from '../users/user-list';
import { UserType } from '@/core/auth/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

const SearchView = () => {
  const url =
    'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/users?limit=10&offset=0';

  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    console.log('Effect is running...');
    axios
      .get(url)
      .then((response) => {
        console.log('Request successful:', response.data);
        console.log('Cant users:', response.data.length);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Request failed:', error);
      });
  }, [users]);

  return (
    <View>
      <FocusAwareStatusBar />
      <View>
        <ScrollView>
          <SearchBar />
        </ScrollView>
      </View>

      <UserList users={users} />
    </View>
  );
};

export default SearchView;
