import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ControlledInput, View } from '@/ui';

const schema = z.object({
  content: z.string().max(180),
});

type FormType = z.infer<typeof schema>;

// Update the props type to include placeholder and onSubmit
type CommentInputProps = {
  placeholder: string;
  onSubmit: (data: FormType) => void;
};

export const CommentInput: React.FC<CommentInputProps> = ({
  placeholder,
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <View className="flex flex-row p-4">
      <View id="textee" className="ml-3 w-full flex-1">
        <ControlledInput
          name="content"
          placeholder={placeholder} // Use the placeholder prop
          className="h-32 w-full resize-none text-xl outline-none"
          control={control}
          multiline
          selectTextOnFocus={true}
          testID="body-input"
        />

        <View className="flex flex-row items-center justify-between">
          <Button
            label="Publish"
            className="inline rounded-full bg-blue-500 px-4 py-3 text-center font-bold text-white"
            onPress={handleSubmit(onSubmit)} // Use the onSubmit prop
            testID="add-post-button"
          />
        </View>
      </View>
    </View>
  );
};
