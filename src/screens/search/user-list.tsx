import { UserType } from '@/core/auth/utils';
import { View, Text } from '@/ui';

const UserList = ({ users }: { users: UserType[] }) => {
  return (
    <View>
      <Text>user list</Text>
    </View>
  );
};

export default UserList;
