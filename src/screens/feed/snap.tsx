import { useRoute } from '@react-navigation/native';
import * as React from 'react';

import type { RouteProp } from '@/navigation/types';
import { FocusAwareStatusBar, View } from '@/ui';

import { SnapView } from './snap-view';

export const Snap = () => {
  const { params } = useRoute<RouteProp<'Snap'>>();

  const data = params.snap;
  console.log('on SnapScreen', data);
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <SnapView snap={data} />
    </View>
  );
};
