import { View, Text } from '@/ui';
import { SearchBar } from './search-bar';
import UserList from './user-list';
import { ScrollView } from 'react-native-gesture-handler';
import { UserType } from '@/core/auth/utils';

const Search = () => {
  let users: UserType[] = [];

  return (
    <>
      <ScrollView>
        <SearchBar />
        <UserList users={users} />
      </ScrollView>
    </>
  );
};

export default Search;
