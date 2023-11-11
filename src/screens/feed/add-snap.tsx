import * as React from 'react';
import { Compose } from './compose';

import { getUserState } from '@/core';
import { View } from '@/ui';

export const AddSnap = () => {
  const userData = getUserState();
  return (
    <View>
      <Compose user={userData}></Compose>
    </View>
  );
};
