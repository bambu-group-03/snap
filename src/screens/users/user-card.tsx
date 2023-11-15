import { UserType } from '@/core/auth/utils';
import { View, Text } from '@/ui';
import { AxiosInstance } from 'axios';

const Card = ({
  user,
  client,
  onPress = () => {},
}: {
  user: UserType;
  client: AxiosInstance;
  onPress?: () => void;
}) => {
  return (
    <View>
      <Text>Users</Text>
    </View>
  );
};

export default Card;
