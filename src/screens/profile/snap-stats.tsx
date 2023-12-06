import {
  faCalendarAlt,
  faPencilAlt,
  faPollH,
  faRetweet,
  faShareAlt,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import { Text, View } from '@/ui';

import type { SnapStatistics } from './stadistics-screen';
import StatCard from './stats-card';

const SnapStats = ({ stats }: { stats: SnapStatistics | undefined }) => {
  return (
    <View className=" bg-white ">
      {stats ? (
        <View className="mx-1 max-w-full py-6 sm:mx-auto sm:px-6 lg:px-8">
          <View className="sm:flex sm:space-x-4">
            <StatCard
              label="Total Snaps"
              value={stats.total_snaps}
              icon={faPencilAlt}
            />
            <StatCard
              label="Total Likes"
              value={stats.total_likes}
              icon={faThumbsUp}
            />
            <StatCard
              label="Total Shares"
              value={stats.total_shares}
              icon={faRetweet}
            />
            <StatCard
              label="Period Snaps"
              value={stats.period_snaps}
              icon={faCalendarAlt}
            />
            <StatCard
              label="Period Likes"
              value={stats.period_likes}
              icon={faPollH}
            />
            <StatCard
              label="Period Shares"
              value={stats.period_shares}
              icon={faShareAlt}
            />
          </View>
        </View>
      ) : (
        <View className="mx-4 max-w-full py-6 sm:mx-auto sm:px-6 lg:px-8">
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default SnapStats;
