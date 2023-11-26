import type { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { getUserState } from '@/core';

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
      const { data: users } = await axios.get(
        `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/filter/${currentUser?.id}/${data.username}`
      );
      navigate('Users', { users });
    } catch (error) {
      console.error('Error searching by username:', error);
    }
  }
  if (data.content && data.content.trim() !== '') {
    try {
      const { data: snapsFromContent } = await axios.get(
        `https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/filter/content?user_id=${currentUser?.id}&content=${data.content}`
      );
      navigate('SnapList', { snaps: snapsFromContent.snaps });
    } catch (error) {
      console.error('Error searching by content:', error);
    }
  }
  if (data.hashtag && data.hashtag.trim() !== '') {
    try {
      const { data: snapsFromHashtags } = await axios.get(
        `https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/filter/hashtag?user_id=${currentUser?.id}&hashtag=${data.hashtag}`
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
