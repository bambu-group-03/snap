import * as React from 'react';

import { getUserState } from '@/core';
import { View } from '@/ui';

import { Compose } from './compose';

export const AddSnap = () => {
  const userData = getUserState();
  return (
    <View>
      <Compose user={userData} />
    </View>
  );
};
