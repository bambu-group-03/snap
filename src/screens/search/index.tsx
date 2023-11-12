import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, ScrollView, View } from '@/ui';

const schema = z.object({
  username: z
    .string()
    .min(3, 'First Name must be at least 3 characters')
    .max(50, 'First Name cannot exceed 50 characters')
    .optional(),
  content: z
    .string()
    .min(3, 'Last Name must be at least 3 characters')
    .max(50, 'Last Name cannot exceed 50 characters')
    .optional(),
  hashtag: z
    .string()
    .min(3, 'Last Name must be at least 3 characters')
    .max(50, 'Last Name cannot exceed 50 characters')
    .optional(),
});

export type FormType = z.infer<typeof schema>;

export interface SearchFormProps {
  onSearchSubmit?: SubmitHandler<FormType>;
}

const whenSearch: SearchFormProps['onSearchSubmit'] = (data) => {
  console.log(data);
};

export const Search: React.FC = () => {
  return <FormForSearch onSearchSubmit={whenSearch} />;
};

export const FormForSearch: React.FC<SearchFormProps> = ({
  onSearchSubmit = () => {},
}) => {
  const { handleSubmit, control, watch } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const watchedFields = watch();
  const [isAnyFieldFilled, setIsAnyFieldFilled] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const anyFieldFilled = Object.values(watchedFields).some(
      (fieldValue) => fieldValue && fieldValue.trim() !== ''
    );
    setIsAnyFieldFilled(anyFieldFilled);
  }, [watchedFields]);

  const shouldDisableField = (fieldName: keyof FormType) => {
    const fieldValue = watchedFields[fieldName];
    const isFieldEmpty = !fieldValue || fieldValue.trim() === '';
    return isAnyFieldFilled && isFieldEmpty;
  };

  return (
    <View className="flex-1 p-4">
      <ScrollView className="flex-1 p-4">
        <ControlledInput
          testID="username-input"
          control={control}
          name="username"
          label="username"
          disabled={shouldDisableField('username')}
        />
        <ControlledInput
          testID="content-input"
          control={control}
          name="content"
          label="content"
          disabled={shouldDisableField('content')}
        />
        <ControlledInput
          testID="hashtag-input"
          control={control}
          name="hashtag"
          label="hashtag"
          disabled={shouldDisableField('hashtag')}
        />
      </ScrollView>

      <Button
        testID="search-button"
        label="Search"
        onPress={handleSubmit(onSearchSubmit)}
        variant="primary"
      />
    </View>
  );
};
