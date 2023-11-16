import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DropdownMenuProps {
  replyOption: string;
  handleMenuSelection: (option: string) => void;
}

const DropdownMenu = ({
  replyOption,
  handleMenuSelection,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const options: string[] = ['Everyone can reply', 'Only me'];

  const handleOptionClick = (option: string) => {
    handleMenuSelection(option);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        className="-ml-4 pr-12 text-blue-400"
        onPress={() => setIsOpen(!isOpen)}
      >
        <View>
          <Text className="inline rounded-full bg-blue-100 px-4 py-3">
            <FontAwesomeIcon icon={faGlobe} /> {replyOption}
          </Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View className="inline rounded-full bg-blue-100 px-4 py-3">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionClick(option)}
            >
              <Text className="inline rounded-full bg-blue-100 px-4 py-3">
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default DropdownMenu;
