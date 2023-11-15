import { UserType } from '@/core/auth/utils';
import { FocusAwareStatusBar, View } from '@/ui';
import { FlatList, RefreshControl } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
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
    <View>
      <FocusAwareStatusBar />

      <FlatList
        data={users}
        renderItem={renderItem}
        maxToRenderPerBatch={1}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserList;
