import { UserType } from '@/core/auth/utils';
import { AxiosInstance } from 'axios';
import { Image, Pressable, Text, TouchableOpacity, View } from '@/ui';

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
    <Pressable className="flex shrink-0 p-4 pb-0" onPress={onPress}>
      <TouchableOpacity className="group block shrink-0">
        <View className="flex flex-row items-center">
          <View>
            <Image
              className="inline-block h-10 w-10 rounded-full"
              source={{
                uri: user.profile_photo_id ? user.profile_photo_id : 'default',
              }}
            />
          </View>

          <View className="mx-3">
            <Text className="text-base font-medium leading-6 text-black">
              {user.first_name}
              <Text className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                {' '}
                @{user.username ? user.username : 'default'}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Pressable>
  );
};

export default Card;
