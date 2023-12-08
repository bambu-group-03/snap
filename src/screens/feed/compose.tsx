import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import type { Snap } from '@/api';
import { useAddSnap } from '@/api';
import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Image, TouchableOpacity, View } from '@/ui';
import { Button, ControlledInput } from '@/ui';

const SNAP_VISIBLE = 1;
const SNAP_HIDDEN = 2;

const schema = z.object({
  content: z.string().max(180),
  privacy: z.number(),
});

type FormType = z.infer<typeof schema>;

export const Compose = ({ user }: { user: UserType | undefined }) => {
  const { control, handleSubmit, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const currentUser = getUserState();
  const privacyOptions = useMemo(
    () => ['Everyone can see', 'Only Followers'],
    []
  );
  const [privacy, setPrivacyOption] = useState<string>(privacyOptions[0]);
  const addSnapMutation = useAddSnap(currentUser);
  const { isLoading } = addSnapMutation;

  const { navigate } = useNavigation();
  useEffect(() => {
    setValue(
      'privacy',
      privacy === privacyOptions[0] ? SNAP_VISIBLE : SNAP_HIDDEN
    );
  }, [privacy, setValue, privacyOptions]);

  const onSubmit = (data: FormType) => {
    addSnapMutation.mutate(
      {
        ...data,
        user_id: currentUser?.id,
        parent_id: '',
        privacy: privacy === privacyOptions[0] ? SNAP_VISIBLE : SNAP_HIDDEN,
      },
      {
        onSuccess: (createdSnap: Snap) => {
          console.log('onSuccess', createdSnap);
          // responseData should be the snap data
          navigate('Snap', { snap: createdSnap });
          showMessage({
            message: 'Snap added successfully',
            type: 'success',
          });
        },
        onError: () => {
          showMessage({
            message: 'Error adding snap',
            type: 'danger',
          });
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
            <TouchableOpacity className="flex items-center justify-center rounded-full bg-blue-100 p-3" />
            <TouchableOpacity className="flex items-center justify-center rounded-full bg-blue-100 p-3" />
            <TouchableOpacity className="flex items-center justify-center rounded-full bg-blue-100 p-3" />
            <TouchableOpacity
              className="flex items-center justify-center rounded-full bg-blue-100 p-3"
              onPress={() => alert('AUCH')}
            />
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
