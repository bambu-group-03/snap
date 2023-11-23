import {
  faCalendarAlt,
  faImage,
  faPollH,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useAddSnap } from '@/api';
import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Image, TouchableOpacity, View } from '@/ui';
import { Button, ControlledInput, showErrorMessage } from '@/ui';

const SNAP_VISIBLE = 1;
const SNAP_HIDDEN = 2;

const schema = z.object({
  content: z.string().max(180),
  privacy: z.string().max(100),
});

type FormType = z.infer<typeof schema>;

export const Compose = ({ user }: { user: UserType | undefined }) => {
  const { control, handleSubmit, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const { mutate: addSnap, isLoading } = useAddSnap();
  const currentUser = getUserState();

  const [privacy, setPrivacyOption] = useState<string>('');

  const privacyOptions = ['Everyone can reply', 'Only me'];

  useEffect(() => {
    setValue('privacy', privacy); // Update the value for the 'ubication' field in the controller
  }, [privacy, setValue]);

  const onSubmit = (data: FormType) => {
    console.log(data);
    addSnap(
      {
        ...data,
        user_id: currentUser?.id,
        parent_id: '',
        visibility: privacy === privacyOptions[0] ? SNAP_VISIBLE : SNAP_HIDDEN,
      },
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
              placeholder="What's happening?"
              className="h-32 w-full resize-none text-xl outline-none"
              control={control}
              multiline
              testID="body-input"
            />

            <View className="flex p-4">
              <Picker
                testID="privacy-input"
                selectedValue={privacy}
                className="inline rounded-full bg-blue-100 px-4 py-3"
                onValueChange={(itemValue) => {
                  setPrivacyOption(itemValue);
                }}
              >
                {privacyOptions.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker>
            </View>
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
              className="inline rounded-full bg-blue-500 px-4 py-3 font-bold text-white"
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
