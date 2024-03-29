import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faBell,
  faMessage,
  faPaw,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { ChatNavigator } from '@/screens/chat/chat-navigator';
import { NotificationNavigator } from '@/screens/notifications/notification-navigator';
import { ProfileNavigator } from '@/screens/profile/profile-navigator';
import { SearchNavigator } from '@/screens/search/search-navigator';

import { FeedNavigator } from './feed-navigator';

/**
 * Type representing a single tab in the TabNavigator.
 * @property name - Unique identifier for the tab, must match the name of the associated React component.
 * @property component - Either a React component or a Stack.Navigator configuration.
 * @property label - Text label for the tab.
 * @property icon - FontAwesome icon for the tab.
 */
export type TabType = {
  name: string;
  component: React.ComponentType<any>;
  label: string;
  icon: IconDefinition;
};

/**
 * Array containing individual tab configurations for the TabNavigator.
 */
export const tabs: TabType[] = [
  {
    name: 'FeedNavigator',
    component: FeedNavigator, // Stack.Navigator configuration, has inside screens
    label: 'Feed',
    icon: faPaw,
  },
  {
    name: 'SearchNavigator',
    component: SearchNavigator, // React Search component screen
    label: 'Search',
    icon: faSearch,
  },
  {
    name: 'ChatNavigator',
    component: ChatNavigator, // React Chat component screen
    label: 'Chat',
    icon: faMessage,
  },
  {
    name: 'NotificationsNavigator',
    component: NotificationNavigator, // React Profile component screen
    label: 'Notifications',
    icon: faBell,
  },
  {
    name: 'ProfileNavigator',
    component: ProfileNavigator, // React Profile component screen
    label: 'Profile',
    icon: faUser,
  },
];
