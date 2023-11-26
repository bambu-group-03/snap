import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useThemeConfig } from './use-theme-config';

export const NavigationContainer = React.forwardRef(
  (
    { children }: { children: React.ReactNode },
    ref: React.Ref<any> // Cambiar a un tipo más genérico
  ) => {
    const theme = useThemeConfig();
    return (
      <SafeAreaProvider>
        <RNNavigationContainer theme={theme} ref={ref}>
          {children}
        </RNNavigationContainer>
      </SafeAreaProvider>
    );
  }
);
