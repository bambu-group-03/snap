import { View, Text } from '@/ui';
import { UserStatistics } from './stadistics-screen';
import StatCard from './card';

const GrowthStats = ({ stats }: { stats: UserStatistics | undefined }) => {
  return (
    <View className="flex flex-wrap bg-white ">
      {stats ? (
        <View className="max-w-full mx-1 py-6 sm:mx-auto sm:px-6 lg:px-8">
          <View className="sm:flex sm:space-x-4">
            <StatCard label="Total Snaps" value={stats.total_snaps} />
            <StatCard label="Total Likes" value={stats.total_likes} />
            <StatCard label="Total Shares" value={stats.total_shares} />
            <StatCard label="Period Snaps" value={stats.period_snaps} />
            <StatCard label="Period Likes" value={stats.period_likes} />
            <StatCard label="Period Shares" value={stats.period_shares} />
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
