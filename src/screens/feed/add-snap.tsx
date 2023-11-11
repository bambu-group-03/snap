import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';
import { Compose } from './compose';

import { useAddSnap } from '@/api';
import { getUserState } from '@/core';
import { Button, ControlledInput, showErrorMessage, View } from '@/ui';

export const AddSnap = () => {
  const userData = getUserState();
  return (
    <View className=" ">
      {/* <ControlledInput
        name="content"
        label="Content"
        control={control}
        multiline
        testID="body-input"
      />
      <Button
        label="Add Snap"
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        testID="add-post-button"
      /> */}

      <Compose user={userData}></Compose>
    </View>
  );
};
