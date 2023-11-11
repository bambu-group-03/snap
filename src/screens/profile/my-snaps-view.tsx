import { Snap } from '@/api';
import { FocusAwareStatusBar, View, Image, Text } from '@/ui';

const MySnapsView = ({ snaps }: { snaps: Snap[] }) => {
  return (
    <View>
      <Text>Aca van los snaps que publique yo</Text>
    </View>
  );
};

export default MySnapsView;
