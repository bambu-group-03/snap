import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useAddSnap } from '@/api';
import { getUserState } from '@/core';
import { Button, ControlledInput, showErrorMessage, View } from '@/ui';

const schema = z.object({
  content: z.string().max(180),
});

type FormType = z.infer<typeof schema>;

export const AddSnap = () => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: addSnap, isLoading } = useAddSnap();
  const currentUser = getUserState();
  console.log('currentUser', currentUser);
  const onSubmit = (data: FormType) => {
    console.log(data);
    addSnap(
      { ...data, user_id: currentUser?.id }, //TODO: get user id from auth
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
    <View className="flex-1 p-4 ">
      <ControlledInput
        name="content"
        label="Content"
        control={control}
        multiline
        testID="body-input"
      />
      <Button
        label="Add Snap"
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        testID="add-post-button"
      />
    </View>
  );
};
