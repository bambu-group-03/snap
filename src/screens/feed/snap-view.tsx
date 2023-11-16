import axios from 'axios';

import type { Snap } from '@/api';
import { View } from '@/ui';

import { Card } from '../feed/card';
import { CommentInput } from './comment-component';
import { Comments } from './comment-list';

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

export const SnapView = ({ snap }: { snap: Snap }) => {
  const client = axios.create({
    baseURL: BASE_INTERACTION_URL,
  });

  return (
    <>
      <View>
        <Card snap={snap} client={client} />
        <CommentInput snap={snap} />
      </View>
      <Comments snap={snap} client={client} />
    </>
  );
};
