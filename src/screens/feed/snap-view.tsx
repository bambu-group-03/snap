import axios from 'axios';
import React from 'react';

import type { Snap } from '@/api';
import { getSnap } from '@/api';
import { getUserState } from '@/core';
import { View } from '@/ui';

import { Card } from '../feed/card';
import { CommentInput } from './comment-component';
import { Comments } from './comment-list';

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

export const SnapView = ({ snap }: { snap: Snap }) => {
  const currentUser = getUserState();

  const [userSnap, setUserSnaps] = React.useState<any>();

  const { data } = getSnap({
    variables: { snap_id: snap.id, user_id: currentUser?.id },
  });

  React.useEffect(() => {
    setUserSnaps(data);
  }, [data]);

  const client = axios.create({
    baseURL: BASE_INTERACTION_URL,
  });

  return (
    <>
      <View>
        <Card snap={userSnap ? userSnap : snap} client={client} />
        <CommentInput snap={userSnap ? userSnap : snap} />
      </View>
      <Comments snap={userSnap ? userSnap : snap} client={client} />
    </>
  );
};
