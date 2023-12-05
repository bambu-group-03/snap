import type { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { client } from '@/api/common';
import { getUserState } from '@/core';

import type { FormType } from './form-for-search';
import { FormForSearch } from './form-for-search';
import {
  SEARCH_BY_CONTENT,
  SEARCH_BY_HASHTAG,
  SEARCH_BY_USERNAME,
} from './form-for-search';
import type { SearchStackParamList } from './search-navigator';

const whenSearch = async (
  data: FormType,
  navigate: NavigationProp<SearchStackParamList>['navigate']
) => {
  const currentUser = getUserState();

  if (data.type === SEARCH_BY_USERNAME && data.search.trim() !== '') {
    try {
      const { data: users } = await client.identity.get(
        `/api/filter/${currentUser?.id}/${data.search}`
      );
      navigate('Users', { users });
    } catch (error) {
      console.error('Error searching by username:', error);
    }
  } else if (data.type === SEARCH_BY_CONTENT && data.search.trim() !== '') {
    try {
      const { data: snapsFromContent } = await client.content.get(
        `/api/filter/content?user_id=${currentUser?.id}&content=${data.search}`
      );
      navigate('SnapList', { snaps: snapsFromContent.snaps });
    } catch (error) {
      console.error('Error searching by content:', error);
    }
  } else if (data.type === SEARCH_BY_HASHTAG && data.search.trim() !== '') {
    try {
      const { data: snapsFromHashtags } = await client.content.get(
        `/api/filter/hashtag?user_id=${currentUser?.id}&hashtag=${data.search}`
      );
      navigate('SnapList', { snaps: snapsFromHashtags.snaps });
    } catch (error) {
      console.error('Error searching by hashtag:', error);
    }
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
