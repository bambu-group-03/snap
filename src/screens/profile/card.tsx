import React from 'react';
import { View, Text } from '@/ui';

import {
  faCalendarAlt,
  faImage,
  faPollH,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const StatCard = ({ label, value }: { label: string; value: number }) => {
  return (
    <View className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
      <View className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
        <View className="flex-auto p-4">
          <View className="flex flex-wrap">
            <View className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <Text className="text-blueGray-400 uppercase font-bold text-xs">
                {label}
              </Text>
              <Text className="font-semibold text-xl text-blueGray-700">
                {value}
              </Text>
            </View>
            <View className="relative w-auto pl-4 flex-initial">
              <View className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                <FontAwesomeIcon icon={faImage} />
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
  );
};

export default StatCard;
