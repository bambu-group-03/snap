import React from 'react';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

import { ScrollView, Text } from '@/ui';

const StatisticsScreen = () => {
  // Sample data for charts
  const engagementData = {
    labels: ['Likes', 'Retweets', 'Mentions'],
    datasets: [{ data: [300, 150, 75] }],
  };

  const followerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{ data: [200, 300, 280, 350, 400] }],
  };

  const contentData = [
    {
      name: 'Original',
      count: 10,
      color: 'blue',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'Shared',
      count: 5,
      color: 'green',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'Edited',
      count: 3,
      color: 'red',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <ScrollView className="flex-1 p-2">
      <Text>User Engagement</Text>
      <BarChart
        data={engagementData}
        width={300}
        height={220}
        chartConfig={chartConfig}
        yAxisLabel=""
        yAxisSuffix=""
      />

      <Text>Follower Growth</Text>
      <LineChart
        data={followerData}
        width={300}
        height={220}
        chartConfig={chartConfig}
      />

      <Text>Content Distribution</Text>
      <PieChart
        data={contentData}
        width={300}
        height={220}
        chartConfig={chartConfig}
        accessor={'count'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
      />

      {/* Additional charts can be added similarly */}
    </ScrollView>
  );
};

export default StatisticsScreen;
