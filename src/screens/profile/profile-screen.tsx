import { FocusAwareStatusBar, View, Image, Text } from '@/ui';
import { ScrollView } from 'react-native-gesture-handler';

const MY_PROFILE_PHOTO =
  'https://avatars.githubusercontent.com/u/40549839?s=400&u=f9968082a38e11cabaeec2033e3ffb3e18395eb6&v=4';

const ProfileScreen = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View>
          <View className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
            <View className="px-6">
              <View className="flex flex-wrap justify-center">
                <View className="w-full flex justify-center">
                  <View className="relative">
                    <Image
                      source={MY_PROFILE_PHOTO}
                      className="order-1 h-20 w-20 rounded-full"
                      //   className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                    />
                  </View>
                </View>
                <View className="w-full text-center mt-20">
                  <View className="flex justify-center lg:pt-4 pt-8 pb-0">
                    <View className="p-3 text-center">
                      <Text className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                        3,360
                      </Text>
                      <Text className="text-sm text-slate-400">Photos</Text>
                    </View>
                    <View className="p-3 text-center">
                      <Text className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                        2,454
                      </Text>
                      <Text className="text-sm text-slate-400">Followers</Text>
                    </View>

                    <View className="p-3 text-center">
                      <Text className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                        564
                      </Text>
                      <Text className="text-sm text-slate-400">Following</Text>
                    </View>

                    <View className="p-3 text-center">
                      <Text className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                        1000000000000
                      </Text>
                      <Text className="text-sm text-slate-400">Followers</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="text-center mt-2">
                <Text className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                  Luis Paredes
                </Text>
                <View className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                  <Text className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75">
                    Buenos Aires, Argentina
                  </Text>
                </View>
              </View>
              <View className="mt-6 py-6 border-t border-slate-200 text-center">
                <View className="flex flex-wrap justify-center">
                  <View className="w-full px-4">
                    <Text className="font-light leading-relaxed text-slate-600 mb-4">
                      1/4 CEO of Panda.corp
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
