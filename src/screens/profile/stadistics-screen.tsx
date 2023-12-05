import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';

import { client } from '@/api';
import { getUserState } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

import Tab from './components/tab';
import SnapStats from './snap-stats';
import AccountStats from './account-stats';

export interface SnapStatistics {
  total_snaps: number;
  total_likes: number;
  total_shares: number;
  period_snaps: number;
  period_likes: number;
  period_shares: number;
}

export interface AccountStatistics {
  total_snaps: number;
  total_likes: number;
  total_shares: number;
  period_snaps: number;
  period_likes: number;
  period_shares: number;
}

const StatisticsScreen = () => {
  const [snapStatistics, setSnapStatistics] = useState<SnapStatistics>({
    total_snaps: 0,
    total_likes: 0,
    total_shares: 0,
    period_snaps: 0,
    period_likes: 0,
    period_shares: 0,
  });

  const [accountStatistics, setAccountStatistics] = useState<AccountStatistics>(
    {
      total_snaps: 0,
      total_likes: 0,
      total_shares: 0,
      period_snaps: 0,
      period_likes: 0,
      period_shares: 0,
    }
  );

  const currentUser = getUserState();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const fetchSnapStats = useCallback(
    async (userID: string) => {
      if (
        startDate.toISOString().split('T')[0] ===
          new Date().toISOString().split('T')[0] &&
        endDate.toISOString().split('T')[0] ===
          new Date().toISOString().split('T')[0]
      ) {
        return;
      }

      try {
        let snap_stats = await client.content.get(
          'api/metrics/' +
            userID +
            '/get_user_metrics_between_' +
            startDate.toISOString().split('T')[0] +
            '_and_' +
            endDate.toISOString().split('T')[0]
        );

        const mergedSnapStats = snap_stats.data.reduce(
          (acc: any, obj: any) => {
            acc.total_snaps = obj.total_snaps;
            acc.total_likes = obj.total_likes;
            acc.total_shares = obj.total_shares;
            acc.period_snaps = obj.period_snaps;
            acc.period_likes = obj.period_likes;
            acc.period_shares = obj.period_shares;
            return acc;
          },
          { ...snapStatistics }
        );

        setSnapStatistics(mergedSnapStats);
      } catch (err) {
        console.error(err);
      }
    },
    [startDate, endDate]
  );

  useEffect(() => {
    if (currentUser) {
      fetchSnapStats(currentUser.id);
    }
  }, [currentUser, fetchSnapStats]);

  const fetchAccountStats = useCallback(
    async (userID: string) => {
      if (
        startDate.toISOString().split('T')[0] ===
          new Date().toISOString().split('T')[0] &&
        endDate.toISOString().split('T')[0] ===
          new Date().toISOString().split('T')[0]
      ) {
        return;
      }

      try {
        // Otro endpoint
        let account_stats = await client.content.get(
          'api/metrics/' +
            userID +
            '/get_user_metrics_between_' +
            startDate.toISOString().split('T')[0] +
            '_and_' +
            endDate.toISOString().split('T')[0]
        );

        const mergedAccountStats = account_stats.data.reduce(
          (acc: any, obj: any) => {
            acc.total_snaps = obj.total_snaps;
            acc.total_likes = obj.total_likes;
            acc.total_shares = obj.total_shares;
            acc.period_snaps = obj.period_snaps;
            acc.period_likes = obj.period_likes;
            acc.period_shares = obj.period_shares;
            return acc;
          },
          { ...accountStatistics }
        );

        setAccountStatistics(mergedAccountStats);
      } catch (err) {
        console.error(err);
      }
    },
    [startDate, endDate]
  );

  useEffect(() => {
    if (currentUser) {
      fetchAccountStats(currentUser.id);
    }
  }, [currentUser, fetchAccountStats]);

  // Function to handle the validation of dates
  const handleDateChange = (
    type: 'start' | 'end',
    selectedDate: Date | null | undefined
  ) => {
    const newDate = selectedDate || (type === 'start' ? startDate : endDate);
    if (type === 'start' && newDate > endDate) {
      console.error('Start date must be before the end date.');
      setShowStartDatePicker(false);
      return;
    }
    if (type === 'end' && newDate < startDate) {
      console.error('End date must be after the start date.');
      setShowEndDatePicker(false);
      return;
    }

    type === 'start' ? setStartDate(newDate) : setEndDate(newDate);
    type === 'start'
      ? setShowStartDatePicker(false)
      : setShowEndDatePicker(false);
  };

  const formattedStartDate =
    (startDate.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    startDate.getDate().toString().padStart(2, '0') +
    '-' +
    startDate.getFullYear();

  const formattedEndDate =
    (endDate.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    endDate.getDate().toString().padStart(2, '0') +
    '-' +
    endDate.getFullYear();

  const [selectedTab, setSelectedTab] = useState<'snapStats' | 'userStats'>(
    'snapStats'
  );

  const handleTabChange = (tab: 'snapStats' | 'userStats') => {
    setSelectedTab(tab);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <FocusAwareStatusBar />
      <View>
        <View className="flex-row">
          <Tab
            selected={selectedTab === 'snapStats'}
            title="Snap Stats"
            onPress={() => handleTabChange('snapStats')}
          />
          <Tab
            selected={selectedTab === 'userStats'}
            title="User Stats"
            onPress={() => handleTabChange('userStats')}
          />
        </View>

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
                startDate.toISOString().split('T')[0] ===
                  new Date().toISOString().split('T')[0] &&
                endDate.toISOString().split('T')[0] ===
                  new Date().toISOString().split('T')[0]
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
                startDate.toISOString().split('T')[0] ===
                  new Date().toISOString().split('T')[0] &&
                endDate.toISOString().split('T')[0] ===
                  new Date().toISOString().split('T')[0]
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

      {/* Conditional Rendering based on Selected Tab */}
      {selectedTab === 'snapStats' ? (
        <View>
          <SnapStats stats={snapStatistics} />
        </View>
      ) : (
        <View>
          <AccountStats stats={accountStatistics} />
        </View>
      )}
    </ScrollView>
  );
};

export default StatisticsScreen;
