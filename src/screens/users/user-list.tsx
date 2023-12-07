import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import type { UserType } from '@/core/auth/utils';
import { Text, View } from '@/ui';

import UserCard from './user-card';

type UserListProps = {
  users: UserType[];
  headerComponent?: React.ComponentType<any> | React.ReactElement | null;
  title?: string; // Optional title prop
};

const UserList = ({ users, headerComponent, title }: UserListProps) => {
  const renderItem = ({ item }: { item: UserType }) => <UserCard user={item} />;
  const renderHeader = () => (
    <>
      <>{headerComponent}</>
      <View>
        {title && <Text className="px-4 py-2 text-lg font-bold">{title}</Text>}
      </View>
    </>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
    />
  );
};

export default UserList;
