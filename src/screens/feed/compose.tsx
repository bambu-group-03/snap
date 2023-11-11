import {
  faCalendarAlt,
  faGlobe,
  faImage,
  faPollH,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';

import { Image, Input, Text, TouchableOpacity, View } from '@/ui';
import { UserType } from '@/core/auth/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useAddSnap } from '@/api';
import { getUserState } from '@/core';
import { Button, ControlledInput, showErrorMessage } from '@/ui';
import DropdownMenu from './snap-visibility-menu';

const schema = z.object({
  content: z.string().max(180),
});

type FormType = z.infer<typeof schema>;

export const Compose = ({ user }: { user: UserType | undefined }) => {
  const [replyOption, setReplyOption] = useState('Everyone can reply');

  const handleMenuSelection = (selectedOption: string) => {
    setReplyOption(selectedOption);
  };

  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: addSnap, isLoading } = useAddSnap();
  const currentUser = getUserState();

  const onSubmit = (data: FormType) => {
    console.log(data);
    addSnap(
      { ...data, user_id: currentUser?.id, parent_id: '' }, //TODO: parent_id changes when re-snap
      {
        onSuccess: () => {
          showMessage({
            message: 'Snap added successfully',
            type: 'success',
          });
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(useSnaps.getKey());
        },
        onError: () => {
          showErrorMessage('Error adding post');
        },
      }
    );
  };

  return (
    <View className="my-auto w-full">
      <View className="w-full rounded-xl">
        <View className="flex flex-row p-4">
          <View id="imagee">
            <Image
              className="h-10 w-10 rounded-full"
              source={user?.profile_photo_id}
            />
          </View>
          <View id="textee" className="ml-3 w-full flex-1">
            <ControlledInput
              name="content"
              label="What's happening?"
              className="h-32 w-full resize-none text-xl outline-none"
              control={control}
              multiline
              testID="body-input"
            />

            {/* <TouchableOpacity className="-ml-4 pr-12 text-blue-400"> */}

            {/* <Text className="inline rounded-full bg-blue-100 px-4 py-3">
                <FontAwesomeIcon icon={faGlobe} /> Everyone can reply
              </Text> */}

            <View className="flex flex-row p-4">
              <Text className="inline rounded-full bg-blue-100 px-4 py-3">
                <View id="textee" className="ml-3 w-full flex-1">
                  <DropdownMenu
                    replyOption={replyOption}
                    handleMenuSelection={handleMenuSelection}
                  />
                </View>
              </Text>
            </View>
            {/* </TouchableOpacity> */}
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
            <Button
              label="Publish"
              className="inline rounded-full bg-blue-300 px-4 py-3 font-bold text-white"
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
              testID="add-post-button"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Compose;
