import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import { Text, View } from '@/ui';

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
    <View className="my-4 flex w-full justify-end px-5 lg:w-6/12 xl:w-3/12">
      <View className="relative mb-3 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
        <View className="flex flex-auto justify-between p-4 ">
          <View className="flex flex-col">
            <Text className="text-blueGray-400 text-xs font-bold uppercase">
              {label}
            </Text>
            <Text className="text-blueGray-700 text-xl font-semibold">
              {value}
            </Text>
            <View className="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-full p-3 text-white  shadow-lg">
              <FontAwesomeIcon icon={icon} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatCard;
