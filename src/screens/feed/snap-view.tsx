import axios from 'axios';
import React from 'react';

import type { Snap } from '@/api';
import { View } from '@/ui';

import { Card } from '../feed/card';
import { CommentInput } from './comment-component';
import { Comments } from './comment-list';

const BASE_INTERACTION_URL =
  'https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/';

export const SnapView = ({ snap }: { snap: Snap }) => {
  const { updatedSnap, isLoading, isError, refetch } = getSnapsFrom({
    variables: { snap_id: snap.id },
  });

  const [userSnap, setUserSnaps] = React.useState<Snap>();

  React.useEffect(() => {
    setUserSnaps(userSnap);
  }, [updatedSnap]);

  const client = axios.create({
    baseURL: BASE_INTERACTION_URL,
  });

  return (
    <>
      <View>
        <Card snap={userSnap} client={client} />
        <CommentInput snap={userSnap} />
      </View>
      <Comments snap={userSnap} client={client} />
    </>
  );
};
