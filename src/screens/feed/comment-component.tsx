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
  initialContent = '',
}) => {
  const { control, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { content: initialContent },
  });

  const handleFormSubmit = (data: FormType) => {
    // Call the onSubmit function
    onSubmit(data);

    // Reset the form to clear the input field
    reset({ content: '' }); // Clear the 'content' field
  };

  useEffect(() => {
    reset({ content: initialContent });
  }, [initialContent, reset]);

  return (
    <View className="flex flex-row px-2 pb-4">
      <View id="textee" className="ml-2 w-full flex-1">
        <ControlledInput
          name="content"
          placeholder={placeholder}
          className="h-28 w-full resize text-xl outline-none"
          control={control}
          multiline
          selectTextOnFocus={true}
          testID="body-input"
        />

        <View className="flex flex-row items-center justify-between">
          <Button
            label="Publish"
            className="inline rounded-full bg-blue-500 px-4 py-3 text-center font-bold text-white"
            onPress={handleSubmit(handleFormSubmit)} // Use handleFormSubmit instead
            testID="add-post-button"
          />
        </View>
      </View>
    </View>
  );
};
