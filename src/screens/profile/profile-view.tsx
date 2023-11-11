import { UserType } from '@/core/auth/utils';
import { FocusAwareStatusBar, View, Image, Text, TouchableOpacity } from '@/ui';

const ProfileScreenView = ({ user }: { user: UserType | undefined }) => {
  return (
    <View>
      <View className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-3">
        <View className="px-6">
          <View className="flex flex-wrap justify-center">
            <View className="w-full flex justify-center items-center text-center">
              <View className="relative">
                <Image
                  source={user?.profile_photo_id}
                  className="order-1 h-32 w-32 rounded-full" // Adjusted size to h-32 and w-32
                />
              </View>
              <Text className="text-xl font-bold block tracking-wide text-slate-700 text-center">
                @{user?.username}
              </Text>
            </View>
            <View className="w-full text-center mt-5 border-t border-blueGray-200">
              <View className="flex justify-center lg:pt-4 pt-2 pb-0 flex-row ">
                <View className="p-3 text-center">
                  <TouchableOpacity onPress={() => console.log('Followers')}>
                    <Text className="text-xl font-bold block uppercase tracking-wide text-slate-700 text-center">
                      2,454
                    </Text>

                    <Text
                      className="text-sm text-slate-400"
                      style={{
                        color: '#0077cc',
                        textDecorationLine: 'underline',
                      }}
                    >
                      Followers
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="p-3 text-center">
                  <TouchableOpacity onPress={() => console.log('Following')}>
                    <Text className="text-xl font-bold block uppercase tracking-wide text-slate-700 text-center">
                      564
                    </Text>

                    <Text
                      className="text-sm text-slate-400"
                      style={{
                        color: '#0077cc',
                        textDecorationLine: 'underline',
                      }}
                    >
                      Following
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View className="text-center mt-2">
            <Text className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {user?.first_name} {user?.last_name}
            </Text>
            <View className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <Text className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75">
                Buenos Aires, Argentina
              </Text>
            </View>
          </View>
          <View className="mt-1 py-3 border-t border-slate-200 text-center">
            <View className="flex flex-wrap justify-center">
              <View className="w-full px-4">
                <Text className="font-light leading-relaxed text-slate-600 mb-4">
                  {user?.bio_msg ? user?.bio_msg : 'No bio'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreenView;
