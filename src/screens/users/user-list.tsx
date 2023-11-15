import { UserType } from '@/core/auth/utils';
import { FocusAwareStatusBar, View } from '@/ui';
import { FlatList, RefreshControl } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import UserCard from './user-card';

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

const UserList = ({ users }: { users: UserType[] }) => {
  const { navigate } = useNavigation();

  const client = axios.create({
    baseURL: BASE_INTERACTION_URL,
  });

  const renderItem = ({ item }: { item: UserType }) => {
    return (
      <UserCard
        user={item}
        client={client}
        onPress={() => navigate('UserProfile', { user: item })}
      />
    );
  };

  return (
    <View>
      <FocusAwareStatusBar />

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // keyExtractor={(_, index) => `item-${index}`}
        // //onEndReached={handleEndReached}
        // onEndReachedThreshold={0.1}
        // getItemLayout={(_data, index) => ({
        //   length: 100, // Adjust the item length as needed
        //   offset: 100 * index,
        //   index,
        // })}
      />
    </View>
  );
};

export default UserList;
