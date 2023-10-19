import {
  faCalendarAlt,
  faGlobe,
  faImage,
  faPollH,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import { Image, Text, TextInput, TouchableOpacity, View } from '@/ui';

export default function Compose() {
  return (
    <View className="my-auto w-full">
      <View className="w-full rounded-xl">
        <View className="flex flex-row p-4">
          <View id="imagee">
            <Image
              className="h-10 w-10 rounded-full"
              source={{
                uri: 'https://avatars.githubusercontent.com/u/56934023?v=4',
              }}
            />
          </View>
          <View id="textee" className="ml-3 flex w-full flex-col">
            <TextInput
              placeholder="What's happening?"
              className="h-32 w-full resize-none text-xl outline-none"
            />

            <TouchableOpacity className="-ml-4 pr-12 text-blue-400">
              <Text className="inline rounded-full bg-blue-100 px-4 py-3">
                <FontAwesomeIcon icon={faGlobe} /> Everyone can reply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between border-t border-gray-500  p-2 text-blue-400">
          <View className="flex flex-row pl-12">
            <TouchableOpacity className="flex items-center justify-center rounded-full bg-blue-100 p-3">
              <FontAwesomeIcon icon={faImage} />
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center rounded-full bg-blue-100 p-3">
              <FontAwesomeIcon icon={faPollH} />
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center rounded-full bg-blue-100 p-3">
              <FontAwesomeIcon icon={faSmile} />
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center rounded-full bg-blue-100 p-3">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="inline rounded-full bg-blue-300 px-4 py-3 font-bold text-white">
              Tweet
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
