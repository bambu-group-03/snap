import { View, Text } from '@/ui';
import { UserStatistics } from './stadistics-screen';
import StatCard from './card';

import {
  faCalendarAlt,
  faShareAlt,
  faThumbsUp,
  faRetweet,
  faPollH,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';

const GrowthStats = ({ stats }: { stats: UserStatistics | undefined }) => {
  return (
    <View className=" bg-white ">
      {stats ? (
        <View className="max-w-full mx-1 py-6 sm:mx-auto sm:px-6 lg:px-8">
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
        <View className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default GrowthStats;
