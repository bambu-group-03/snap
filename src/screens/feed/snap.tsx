import { useRoute } from '@react-navigation/native';
import * as React from 'react';

import { useSnap } from '@/api';
import type { RouteProp } from '@/navigation/types';
import { ActivityIndicator, FocusAwareStatusBar, Text, View } from '@/ui';
import { SnapView } from './snap-view';

export const Snap = () => {
  const { params } = useRoute<RouteProp<'Snap'>>();

  const data = params.snap;

  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <SnapView snap={data}></SnapView>
    </View>
  );
};
