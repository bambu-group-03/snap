import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import type { Snap } from '@/api';
import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Button, ControlledInput, ScrollView, View } from '@/ui';
import { FormForSearch } from './form-for-search';

export const schema = z.object({
  username: z
    .string()
    .max(50, 'First Name cannot exceed 50 characters')
    .optional(),
  content: z
    .string()
    .max(50, 'Last Name cannot exceed 50 characters')
    .optional(),
  hashtag: z
    .string()
    .max(50, 'Last Name cannot exceed 50 characters')
    .optional(),
});

export type FormType = z.infer<typeof schema>;

export interface SearchFormProps {
  onSearchSubmit?: SubmitHandler<FormType>;
}

const whenSearch: SearchFormProps['onSearchSubmit'] = async (data) => {
  const currentUser = getUserState();
  console.log(data);
  if (data.username && data.username.trim() !== '') {
    const response = await fetch(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/filter/${data.username}`
    );
    const users: UserType[] = await response.json();
    console.log(`username: ${JSON.stringify(users)}`);
  }
  if (data.content && data.content.trim() !== '') {
    const responseC = await fetch(
      `https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/filter/content?user_id=${currentUser?.id}&content=${data.content}`
    );
    const snapsFromContent: Snap[] = await responseC.json();
    console.log(`content:${JSON.stringify(snapsFromContent)}`);
  }
  if (data.hashtag && data.hashtag.trim() !== '') {
    const responseH = await fetch(
      `https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/filter/hashtag?user_id=${currentUser?.id}&hashtag=${data.hashtag}`
    );
    const snapFromHashtags: Snap[] = await responseH.json();
    console.log(`hashtag: ${JSON.stringify(snapFromHashtags)}`);
  }
};

export const SearchBar: React.FC = () => {
  return <FormForSearch onSearchSubmit={whenSearch} />;
};