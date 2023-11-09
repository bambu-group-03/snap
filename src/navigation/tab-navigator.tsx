import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { Route } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';

import { tabs } from './tab-data';

type TabBarIconProps = {
  color: string;
  icon: IconDefinition;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ color, icon }) => {
  return <FontAwesomeIcon icon={icon} color={color} />;
};

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  const { colorScheme } = useColorScheme();

  const renderTabBarIcon = ({
    color,
    route,
  }: {
    color: string;
    route: Route<string>;
  }) => {
    const tab = tabs.find((t) => t.name === route.name);
    if (tab) {
      return <TabBarIcon icon={tab.icon} color={color} />;
    }
    return null;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#1DA1F' : '#A9A9A9',
        tabBarIcon: ({ color }) => renderTabBarIcon({ color, route }),
      })}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        {tabs.map(({ name, component, label }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              title: label,
              tabBarTestID: `${name}-tab`,
            }}
          />
        ))}
      </Tab.Group>
    </Tab.Navigator>
  );
};
