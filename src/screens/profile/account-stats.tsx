import {
  faPencilAlt,
  faRetweet,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import { Text, View } from '@/ui';

import type { AccountStatistics } from './stadistics-screen';
import StatCard from './stats-card';

const LiveStats = ({ stats }: { stats: AccountStatistics | undefined }) => {
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
            {/* <StatCard
              label="Total Snaps in Thrending"
              value={stats.period_snaps}
              icon={faBomb}
            />
            <StatCard
              label="Total Stat 2"
              value={stats.period_likes}
              icon={faBeer}
            />
            <StatCard
              label="Total Stat 3"
              value={stats.period_shares}
              icon={faBug}
            /> */}
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

export default LiveStats;
