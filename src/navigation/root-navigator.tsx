import { useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';

import { NavigationContainer } from './navigation-container';
import { Root } from './root';

export const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Root navigationRef={navigationRef} />
    </NavigationContainer>
  );
};
