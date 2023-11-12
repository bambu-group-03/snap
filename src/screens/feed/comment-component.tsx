import { showErrorMessage, Button, ControlledInput, View } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAddReply } from '@/api';
import { showMessage } from 'react-native-flash-message';
import { Snap } from '@/api';
import { z } from 'zod';
import { getUserState } from '@/core';
import { useState } from 'react';

const schema = z.object({
  content: z.string().max(180),
});

type FormType = z.infer<typeof schema>;

export const CommentInput = ({ snap }: { snap: Snap }) => {
  const [replyOption, setReplyOption] = useState('Everyone can reply');

  const handleMenuSelection = (selectedOption: string) => {
    setReplyOption(selectedOption);
  };

  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: addSnap, isLoading } = useAddReply();
  const currentUser = getUserState();

  const onSubmit = (data: FormType) => {
    console.log(data);
    addSnap(
      { ...data, user_id: currentUser?.id, parent_id: snap.id },
      {
        onSuccess: () => {
          showMessage({
            message: 'Snap added successfully',
            type: 'success',
          });
        },
        onError: () => {
          showErrorMessage('Error adding post');
        },
      }
    );
  };

  return (
    <View className="flex flex-row p-4">
      <View id="textee" className="ml-3 w-full flex-1">
        <ControlledInput
          name="content"
          placeholder="What do you want to say?"
          className="h-32 w-full resize-none text-xl outline-none"
          control={control}
          multiline
          selectTextOnFocus={true}
          testID="body-input"
        />

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            label="Publish"
            className="inline rounded-full text-center bg-blue-300 px-4 py-3 font-bold text-white"
            onPress={handleSubmit(onSubmit)}
            testID="add-post-button"
          />
        </View>
      </View>
    </View>
  );
};