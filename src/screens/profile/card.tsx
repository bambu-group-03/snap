import React from 'react';
import { View, Text } from '@/ui';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: any;
}) => {
  return (
    <View className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4 flex justify-end">
      <View className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
        <View className="flex-auto p-4 flex justify-between ">
          <View className="flex flex-col">
            <Text className="text-blueGray-400 uppercase font-bold text-xs">
              {label}
            </Text>
            <Text className="font-semibold text-xl text-blueGray-700">
              {value}
            </Text>
            <View className="text-white p-3 inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  ml-auto">
              <FontAwesomeIcon icon={icon} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatCard;
