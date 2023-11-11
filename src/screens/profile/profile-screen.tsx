import { FocusAwareStatusBar } from '@/ui';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileScreenView from './profile-view';
import { UserType } from '@/core/auth/utils';

const MY_PROFILE_PHOTO =
  'https://avatars.githubusercontent.com/u/40549839?s=400&u=f9968082a38e11cabaeec2033e3ffb3e18395eb6&v=4';

const ProfileScreen = () => {
  const user: UserType = {
    bio_msg: '1/4 CEO of Panda.corp',
    blocked: false,
    created_at: '2021-10-04T20:00:00.000Z',
    email: 'luis@gmail.com',
    first_name: 'Luis',
    id: '1',
    last_name: 'Paredes',
    phone_number: 'xxx',
    profile_photo_id: MY_PROFILE_PHOTO,
    username: 'luis',
  };

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <ProfileScreenView user={user} />
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
