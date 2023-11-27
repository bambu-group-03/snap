import React from 'react';

import type { Snap } from '@/api';
import { getSnap } from '@/api';
import { getUserState } from '@/core';
import { View } from '@/ui';

import { Card } from '../feed/card';
import { CommentInput } from './comment-component';
import { Comments } from './comment-list';

export const SnapView = ({ snap }: { snap: Snap }) => {
  const currentUser = getUserState();

  const [userSnap, setUserSnaps] = React.useState<any>(snap);

  const { data } = getSnap({
    variables: { snap_id: snap.id, user_id: currentUser?.id },
  });

  console.log('Recibi');
  console.log(data);

  React.useEffect(() => {
    setUserSnaps(data);
  }, [data]);

  const endSnap = userSnap !== undefined ? userSnap : snap;

  return (
    <>
      <View>
        <Card snap={endSnap} />
        <CommentInput snap={endSnap} />
      </View>
      <Comments snap={endSnap} />
    </>
  );
};
