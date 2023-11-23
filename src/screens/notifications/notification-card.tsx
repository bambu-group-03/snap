import { Text, TouchableOpacity, View } from 'react-native';

import { Image } from '@/ui';

import type { Notification } from './types';

export type NotificationCardProps = {
  uri: string;
  title: string;
  description: string;
  onPress: () => void;
};

export default function NotificationCard({
  notification,
}: {
  notification: Notification | null;
}) {
  return (
    <View className="max-w-md flex-1 overflow-hidden rounded-lg bg-white shadow-black">
      <View style={{ width: 2, backgroundColor: 'gray-800' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 6 }}>
        <Image
          style={{ width: 48, height: 48, borderRadius: 24 }}
          source={{
            uri: notification?.user?.profile_photo_id
              ? notification?.user?.profile_photo_id
              : '',
          }}
        />
        <View style={{ marginLeft: 9 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray-800' }}>
            Hello john
          </Text>
          <Text style={{ color: 'gray-600' }}>
            Sara was replied on the{' '}
            <TouchableOpacity>
              <Text style={{ color: 'blue-500' }}>Upload Image</Text>
            </TouchableOpacity>
            .
          </Text>
        </View>
      </View>

      <View style={{ width: 2, backgroundColor: 'gray-800' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 6 }}>
        <Image
          style={{ width: 48, height: 48, borderRadius: 24 }}
          source={{
            uri: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          }}
        />
        <View style={{ marginLeft: 9 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray-800' }}>
            Hello john
          </Text>
          <Text style={{ color: 'gray-600' }}>
            Sara was replied on the{' '}
            <TouchableOpacity>
              <Text style={{ color: 'blue-500' }}>Upload Image</Text>
            </TouchableOpacity>
            .
          </Text>
        </View>
      </View>
      <View style={{ width: 2, backgroundColor: 'gray-800' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 6 }}>
        <Image
          style={{ width: 48, height: 48, borderRadius: 24 }}
          source={{
            uri: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          }}
        />
        <View style={{ marginLeft: 9 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray-800' }}>
            Hello john
          </Text>
          <Text style={{ color: 'gray-600' }}>
            Sara was replied on the{' '}
            <TouchableOpacity>
              <Text style={{ color: 'blue-500' }}>Upload Image</Text>
            </TouchableOpacity>
            .
          </Text>
        </View>
      </View>
      <View style={{ width: 2, backgroundColor: 'gray-800' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 6 }}>
        <Image
          style={{ width: 48, height: 48, borderRadius: 24 }}
          source={{
            uri: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          }}
        />
        <View style={{ marginLeft: 9 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray-800' }}>
            Hello john
          </Text>
          <Text style={{ color: 'gray-600' }}>
            Sara was replied on the{' '}
            <TouchableOpacity>
              <Text style={{ color: 'blue-500' }}>Upload Image</Text>
            </TouchableOpacity>
            .
          </Text>
        </View>
      </View>
    </View>
  );
}
