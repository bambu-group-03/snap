import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, ScrollView, Text, View } from '@/ui';

export const SEARCH_BY_USERNAME = 1;
export const SEARCH_BY_CONTENT = 2;
export const SEARCH_BY_HASHTAG = 3;

export const schema = z.object({
  search: z.string().max(50, 'Search cannot exceed 50 characters'),
  type: z.number(),
});

export type FormType = z.infer<typeof schema>;

export interface SearchFormProps {
  onSearchSubmit?: SubmitHandler<FormType>;
}

export const FormForSearch: React.FC<SearchFormProps> = ({
  onSearchSubmit = () => {},
}) => {
  const { handleSubmit, control, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const typeOptions = useMemo(() => ['username', 'content', 'hashtag'], []);
  const [type, setTypeOption] = useState<string>(typeOptions[0]);

  useEffect(() => {
    setValue(
      'type',
      type === typeOptions[0]
        ? SEARCH_BY_USERNAME
        : type === typeOptions[1]
        ? SEARCH_BY_CONTENT
        : SEARCH_BY_HASHTAG
    );
  }, [type, setValue, typeOptions]);

  return (
    <View className="flex-1 p-4">
      <Text className="py-2 text-center text-2xl font-bold">Search By</Text>
      <ScrollView className="flex-1 ">
        <View className="flex p-2">
          <Picker
            testID="type-input"
            selectedValue={type}
            className="inline rounded-full bg-blue-100 px-4 py-3"
            onValueChange={(itemValue) => {
              setTypeOption(itemValue);
            }}
          >
            {typeOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
        <ControlledInput
          testID="search-input"
          control={control}
          name="search"
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
