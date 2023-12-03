import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

const StatisticsScreen = () => {
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

  return (
    <ScrollView style={{ flex: 1, padding: 2 }}>
      <View>
        <Button
          title="Select Start Date"
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
        <Text>
          Selected Start Date: {startDate.toISOString().split('T')[0]}
        </Text>
      </View>

      <View>
        <Button
          title="Select End Date"
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
        <Text>Selected End Date: {endDate.toISOString().split('T')[0]}</Text>
      </View>

      {/* Chart sections */}
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
        data={pieChartData}
        width={300}
        height={220}
        chartConfig={chartConfig}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute={false}
      />
    </ScrollView>
  );
};

export default StatisticsScreen;