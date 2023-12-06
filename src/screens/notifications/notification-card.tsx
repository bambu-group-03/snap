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

import type { Notification } from './types';

function getTypeIcon(title: string | undefined) {
  if (title?.includes('follower')) {
    return faUserPlus;
  } else if (title?.includes('like')) {
    return faThumbsUp;
  } else if (title?.includes('comment')) {
    return faComment;
  } else if (title?.includes('message')) {
    return faMessage;
  } else if (title?.includes('mention')) {
    return faBell;
  } else {
    return faPlus;
  }
}

export default function NotificationCard({
  notification,
}: {
  notification: Notification | null;
}) {
  return (
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
        <FontAwesomeIcon icon={getTypeIcon(notification?.title)} />
        <View style={{ marginLeft: 11 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>
            {notification?.title}
          </Text>
          <Text>{notification?.content}</Text>
        </View>
      </View>
    </View>
  );
}
