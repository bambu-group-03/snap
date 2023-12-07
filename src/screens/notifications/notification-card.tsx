import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faBell,
  faComment,
  faMessage,
  faPlus,
  faThumbsUp,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Text, View } from 'react-native';

import { client } from '@/api/common/client';
import type { Snap } from '@/api/snaps/types';
import type { UserType } from '@/core/auth/utils';

type NotificationMetadata = {
  icon: IconDefinition;
  navigate: string;
  redirect_id: string;
};

import { useNavigation } from '@react-navigation/native';

import { TouchableOpacity } from '@/ui';

import type { Notification } from './types';

function getNotificationMetada(
  notification: Notification
): NotificationMetadata {
  if (notification.redirect_id && notification.notification_type) {
    if (notification?.notification_type === 'NewTrendingNotification') {
      return {
        icon: faBell,
        navigate: 'Snap',
        redirect_id: `/api/feed/snap/${notification.redirect_id}?user_id=${notification.user_id}`,
      };
    } else if (notification?.notification_type === 'NewFollowerNotification') {
      return {
        icon: faBell,
        navigate: 'Profile',
        redirect_id: `/api/auth/users/${notification.redirect_id}`,
      };
    } else {
      return {
        icon: faPlus,
        navigate: '',
        redirect_id: '',
      };
    }
  } else {
    let title = notification?.title;
    if (title?.includes('follower')) {
      return {
        icon: faUserPlus,
        navigate: '',
        redirect_id: '',
      };
    } else if (title?.includes('like')) {
      return {
        icon: faThumbsUp,
        navigate: '',
        redirect_id: '',
      };
    } else if (title?.includes('comment')) {
      return {
        icon: faComment,
        navigate: '',
        redirect_id: '',
      };
    } else if (title?.includes('message')) {
      return {
        icon: faMessage,
        navigate: '',
        redirect_id: '',
      };
    } else if (title?.includes('mention')) {
      return {
        icon: faBell,
        navigate: '',
        redirect_id: '',
      };
    } else {
      return {
        icon: faPlus,
        navigate: '',
        redirect_id: '',
      };
    }
  }
}

export default function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  const navigate = useNavigation();

  let notif_metadata: NotificationMetadata =
    getNotificationMetada(notification);

  const handleNotification = async () => {
    console.log(notif_metadata);

    if (
      notif_metadata.navigate === 'Snap' &&
      notif_metadata.redirect_id !== ''
    ) {
      try {
        const { data: snap } = await client.content.get<Snap>(
          notif_metadata.redirect_id
        );
        navigate.navigate('Snap', { snap: snap });
      } catch (error) {
        console.log(error);
        alert('Sorry, snap deleted');
      }
    } else if (
      notif_metadata.navigate === 'Profile' &&
      notif_metadata.redirect_id !== ''
    ) {
      const { data: user } = await client.identity.get<UserType>(
        notif_metadata.redirect_id
      );

      navigate.navigate('Profile', { user: user });
    } else {
      console.log('No redirect');
    }
  };

  return (
    <TouchableOpacity onPress={handleNotification}>
      <View className="max-w-md flex-1 overflow-hidden rounded-lg bg-white shadow-black">
        <View style={{ width: 2, backgroundColor: 'gray-800' }} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 6,
            marginLeft: 5,
          }}
        >
          {/* <Image
          style={{ width: 48, height: 48, borderRadius: 24 }}
          source={{
            uri: notification?.user?.profile_photo_id
              ? notification?.user?.profile_photo_id
              : 'https://i1.wp.com/www.kickassfacts.com/wp-content/uploads/2016/11/panda-bear.jpg',
          }}
        /> */}

          <FontAwesomeIcon icon={notif_metadata.icon} />

          <View style={{ marginLeft: 11 }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              {notification?.title}
            </Text>
            <Text>{notification?.content}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
