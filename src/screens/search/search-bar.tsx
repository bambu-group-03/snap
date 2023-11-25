import type { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';

import type { FormType } from './form-for-search';
import { FormForSearch } from './form-for-search';
import type { SearchStackParamList } from './search-navigator';

const whenSearch = async (
  data: FormType,
  navigate: NavigationProp<SearchStackParamList>['navigate']
) => {
  const currentUser = getUserState();
  console.log(currentUser);

  console.log(data);
  if (data.username && data.username.trim() !== '') {
    try {
      const response = await fetch(
        `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/filter/${currentUser?.id}/${data.username}`
      );
      const users: UserType[] = await response.json();

      console.log(`LLEGA ACA: ${JSON.stringify(users)}`);
      navigate('Users', { users });
    } catch (error) {
      console.log(error);
    }
  }
  if (data.content && data.content.trim() !== '') {
    const responseC = await fetch(
      `https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/filter/content?user_id=${currentUser?.id}&content=${data.content}`
    );
    const snapsFromContent = await responseC.json();
    navigate('SnapList', { snaps: snapsFromContent.snaps });
  }
  if (data.hashtag && data.hashtag.trim() !== '') {
    const responseH = await fetch(
      `https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/filter/hashtag?user_id=${currentUser?.id}&hashtag=${data.hashtag}`
    );
    const snapFromHashtags = await responseH.json();
    navigate('SnapList', { snaps: snapFromHashtags.snaps });
  }
};

export const SearchBar: React.FC = () => {
  const { navigate } = useNavigation<NavigationProp<SearchStackParamList>>();

  const handleSearchSubmit: SubmitHandler<FormType> = async (data) => {
    console.log('ONSEARCHSUBMIT was executed');
    await whenSearch(data, navigate);
  };
  return <FormForSearch onSearchSubmit={handleSearchSubmit} />;
};
