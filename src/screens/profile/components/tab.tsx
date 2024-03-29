import type { FC } from 'react';
import React from 'react';

import { Text, TouchableOpacity } from '@/ui';

interface TabProps {
  selected: boolean;
  title: string;
  onPress: () => void;
  className?: string; // Optional className prop
}

const Tab: FC<TabProps> = ({ selected, title, onPress, className }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 items-center py-2 ${
      selected ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'
    }`}
  >
    <Text
      className={`text-sm font-semibold ${
        selected ? className || 'text-blue-500' : 'text-gray-500'
      }`}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export default Tab;
