import { View, Text } from '@/ui';

const GrowthStats = () => {
  return (
    <View>
      <View className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
        <View className="sm:flex sm:space-x-4">
          <View className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <View className="bg-white p-5">
              <View className="sm:flex sm:items-start">
                <View className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <Text className="text-sm leading-6 font-medium text-gray-400">
                    Total Subscribers
                  </Text>
                  <Text className="text-3xl font-bold text-black">71,897</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <View className="bg-white p-5">
              <View className="sm:flex sm:items-start">
                <View className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <Text className="text-sm leading-6 font-medium text-gray-400">
                    Avg. Open Rate
                  </Text>
                  <Text className="text-3xl font-bold text-black">58.16%</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <View className="bg-white p-5">
              <View className="sm:flex sm:items-start">
                <View className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <Text className="text-sm leading-6 font-medium text-gray-400">
                    Avg. Click Rate
                  </Text>
                  <Text className="text-3xl font-bold text-black">24.57%</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GrowthStats;
