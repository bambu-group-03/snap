import { View, Text } from '@/ui';

const Test = () => {
  return (
    <View>
      <View className="flex flex-wrap bg-white ">
        <View className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
          <View className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <View className="flex-auto p-4">
              <View className="flex flex-wrap">
                <View className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <Text className="text-blueGray-400 uppercase font-bold text-xs">
                    {' '}
                    Traffic
                  </Text>
                  <Text className="font-semibold text-xl text-blueGray-700">
                    334,100
                  </Text>
                </View>
                <View className="relative w-auto pl-4 flex-initial">
                  <View className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                    {/* <i className="fas fa-chart-bar"></i> */}
                  </View>
                </View>
              </View>
              <Text className="text-sm text-blueGray-400 mt-4">
                <Text className="text-emerald-500 mr-2">
                  <Text className="fas fa-arrow-up"></Text> 2,99%{' '}
                </Text>
                <Text className="whitespace-nowrap"> Since last month </Text>
              </Text>
            </View>
          </View>
        </View>

        <View className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
          <View className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
            <View className="flex-auto p-4">
              <View className="flex flex-wrap">
                <View className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <Text className="text-blueGray-400 uppercase font-bold text-xs">
                    New users
                  </Text>
                  <Text className="font-semibold text-xl text-blueGray-700">
                    2,999
                  </Text>
                </View>
                <View className="relative w-auto pl-4 flex-initial">
                  <View className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
                    {/* <i className="fas fa-chart-pie"></i> */}
                  </View>
                </View>
              </View>
              <Text className="text-sm text-blueGray-400 mt-4">
                <Text className="text-red-500 mr-2">
                  <Text className="fas fa-arrow-down"></Text> 4,01%
                </Text>
                <Text className="whitespace-nowrap"> Since last week </Text>
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
          <View className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <View className="flex-auto p-4">
              <View className="flex flex-wrap">
                <View className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <Text className="text-blueGray-400 uppercase font-bold text-xs">
                    Sales
                  </Text>
                  <Text className="font-semibold text-xl text-blueGray-700">
                    901
                  </Text>
                </View>
                <View className="relative w-auto pl-4 flex-initial">
                  <View className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-lightBlue-500">
                    {/* <i className="fas fa-users"></i> */}
                  </View>
                </View>
              </View>
              <Text className="text-sm text-blueGray-400 mt-4">
                <Text className="text-red-500 mr-2">
                  <Text className="fas fa-arrow-down"></Text> 1,25%{' '}
                </Text>
                <Text className="whitespace-nowrap"> Since yesterday </Text>
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
          <View className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <View className="flex-auto p-4">
              <View className="flex flex-wrap">
                <View className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <Text className="text-blueGray-400 uppercase font-bold text-xs">
                    Performance
                  </Text>
                  <Text className="font-semibold text-xl text-blueGray-700">
                    51.02%{' '}
                  </Text>
                </View>
                <View className="relative w-auto pl-4 flex-initial">
                  <View className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-emerald-500">
                    {/* <i className="fas fa-percent"></i> */}
                  </View>
                </View>
              </View>
              <Text className="text-sm text-blueGray-400 mt-4">
                <Text className="text-emerald-500 mr-2">
                  <Text className="fas fa-arrow-up"></Text> 12%{' '}
                </Text>
                <Text className="whitespace-nowrap"> Since last mounth </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Test;
