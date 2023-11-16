import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';

import type { UserType } from '@/core/auth/utils';
import { EmptyList, FocusAwareStatusBar } from '@/ui';

import UserCard from './user-card';

const UserList = ({ users }: { users: UserType[] }) => {
  const { navigate } = useNavigation();

  const renderItem = ({ item }: { item: UserType }) => {
    return (
      <UserCard
        user={item}
        onPress={() => {
          navigate('UserProfile', { user: item });
        }}
      />
    );
  };

  return (
    <>
      <FocusAwareStatusBar />

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyList isLoading={false} />}
      />
    </>
  );
};

export default UserList;
