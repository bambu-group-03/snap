import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ControlledInput, View } from '@/ui';

const schema = z.object({
  content: z.string().max(180),
});

type FormType = z.infer<typeof schema>;

// Update the props type to include placeholder, onSubmit, and initialContent
type CommentInputProps = {
  placeholder: string;
  onSubmit: (data: FormType) => void;
  initialContent?: string; // Optional prop for initial content
};

export const CommentInput: React.FC<CommentInputProps> = ({
  placeholder,
  onSubmit,
  initialContent = '', // Default value is an empty string
}) => {
  console.log(`initialContent: '${initialContent}'`);
  const { control, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { content: initialContent }, // Initialize the form with initialContent
  });
  useEffect(() => {
    reset({ content: initialContent });
  }, [initialContent, reset]);

  return (
    <View className="flex flex-row p-4">
      <View id="textee" className="ml-3 w-full flex-1">
        <ControlledInput
          name="content"
          placeholder={placeholder}
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
            onPress={handleSubmit(onSubmit)}
            testID="add-post-button"
          />
        </View>
      </View>
    </View>
  );
};
