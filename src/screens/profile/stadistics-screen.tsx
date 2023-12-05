import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
// import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import GrowthStats from './growth-stats';
import { client } from '@/api';
import { getUserState } from '@/core';

export interface UserStatistics {
  total_snaps: number;
  total_likes: number;
  total_shares: number;
  period_snaps: number;
  period_likes: number;
  period_shares: number;
}

const StatisticsScreen = () => {
  const [statistics, setStatistics] = useState<UserStatistics>({
    total_snaps: 0,
    total_likes: 0,
    total_shares: 0,
    period_snaps: 0,
    period_likes: 0,
    period_shares: 0,
  });

  const currentUser = getUserState();

  const fetchUserStats = useCallback(async (userID: string) => {
    try {
      let res = await client.content.get(
        'api/metrics/' +
          userID +
          '/get_user_metrics_between_' +
          startDate.toISOString().split('T')[0] +
          '_and_' +
          endDate.toISOString().split('T')[0]
      );

      const mergedStats = res.data.reduce(
        (acc: any, obj: any) => {
          acc.total_snaps += obj.total_snaps;
          acc.total_likes += obj.total_likes;
          acc.total_shares += obj.total_shares;
          acc.period_snaps += obj.period_snaps;
          acc.period_likes += obj.period_likes;
          acc.period_shares += obj.period_shares;
          return acc;
        },
        { ...statistics }
      );

      setStatistics(mergedStats);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserStats(currentUser.id);
    }
  }, [currentUser, fetchUserStats]);

  console.log(statistics);

  const mockData = {
    engagement: [
      { date: '2023-01-01', likes: 300, retweets: 150, mentions: 75 },
      { date: '2023-02-01', likes: 200, retweets: 100, mentions: 50 },
      // ... more data
    ],
    followers: [
      { date: '2023-01-01', count: 200 },
      { date: '2023-02-01', count: 300 },
      // ... more data
    ],
    content: [
      { type: 'Original', count: 10 },
      { type: 'Shared', count: 5 },
      { type: 'Edited', count: 3 },
    ],
  };

  const [startDate, setStartDate] = useState(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState(new Date('2023-03-01'));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [filteredData, setFilteredData] = useState(mockData);

  // Function to handle the validation of dates
  const handleDateChange = (
    type: 'start' | 'end',
    selectedDate: Date | null | undefined
  ) => {
    const newDate = selectedDate || (type === 'start' ? startDate : endDate);
    if (type === 'start' && newDate > endDate) {
      console.error('Start date must be before the end date.');
      return;
    }
    if (type === 'end' && newDate < startDate) {
      console.error('End date must be after the start date.');
      return;
    }

    type === 'start' ? setStartDate(newDate) : setEndDate(newDate);
    type === 'start'
      ? setShowStartDatePicker(false)
      : setShowEndDatePicker(false);
  };

  // TODO:  ERROR  Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
  useEffect(() => {
    const filterData = () => {
      const filteredEngagement = mockData.engagement.filter(
        (item) =>
          new Date(item.date) >= startDate && new Date(item.date) <= endDate
      );
      const filteredFollowers = mockData.followers.filter(
        (item) =>
          new Date(item.date) >= startDate && new Date(item.date) <= endDate
      );
      const filteredContent = mockData.content;

      setFilteredData({
        engagement: filteredEngagement,
        followers: filteredFollowers,
        content: filteredContent,
      });
    };
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const engagementData = {
    labels: filteredData.engagement.map((item) => item.date),
    datasets: [{ data: filteredData.engagement.map((item) => item.likes) }],
  };

  const followerData = {
    labels: filteredData.followers.map((item) => item.date),
    datasets: [{ data: filteredData.followers.map((item) => item.count) }],
  };

  const defaultColors = ['blue', 'green', 'red'];
  const pieChartData = filteredData.content.map((item, index) => ({
    name: item.type,
    count: item.count,
    color: defaultColors[index % defaultColors.length],
    legendFontColor: 'black',
    legendFontSize: 15,
  }));

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const formattedStartDate =
    startDate.getDate().toString().padStart(2, '0') +
    '-' +
    (startDate.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    startDate.getFullYear();

  const formattedEndDate =
    endDate.getDate().toString().padStart(2, '0') +
    '-' +
    (endDate.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    endDate.getFullYear();

  console.log('startDate', startDate.toISOString().split('T')[0]);

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 52,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 0,
          }}
        >
          My Stats
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
            <Button
              title={
                startDate.toISOString().split('T')[0] === '2023-01-01'
                  ? 'Select Start Date'
                  : formattedStartDate
              }
              color="#007AFF"
              onPress={() => setShowStartDatePicker(true)}
            />
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  handleDateChange('start', selectedDate)
                }
              />
            )}
          </View>

          <View style={{ flex: 1, marginLeft: 5 }}>
            <Button
              title={
                endDate.toISOString().split('T')[0] === '2023-03-01'
                  ? 'Select End Date'
                  : formattedEndDate
              }
              color="#FF4500"
              onPress={() => setShowEndDatePicker(true)}
            />
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  handleDateChange('end', selectedDate)
                }
              />
            )}
          </View>
        </View>
      </View>

      <View>
        <GrowthStats stats={statistics} />
      </View>
    </ScrollView>
  );
};

export default StatisticsScreen;
