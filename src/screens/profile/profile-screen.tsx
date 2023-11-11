import { FocusAwareStatusBar } from '@/ui';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileScreenView from './profile-view';

const ProfileScreen = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <ProfileScreenView />
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
