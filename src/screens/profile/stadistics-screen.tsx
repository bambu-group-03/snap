import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { client } from '@/api';
import { getUserState } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

import LiveStats from './account-stats';
import Tab from './components/tab';
import PeriodStats from './snap-stats';

const TIMER_INTERVAL = 10;

export interface Statistics {
  total_snaps: number;
  total_likes: number;
  total_shares: number;
  period_snaps: number;
  period_likes: number;
  period_shares: number;
}

const StatisticsScreen = () => {
  const [snapStatistics, setSnapStatistics] = useState<Statistics>({
    total_snaps: 0,
    total_likes: 0,
    total_shares: 0,
    period_snaps: 0,
    period_likes: 0,
    period_shares: 0,
  });

  const [accountStatistics, setAccountStatistics] = useState<Statistics>({
    total_snaps: 0,
    total_likes: 0,
    total_shares: 0,
    period_snaps: 0,
    period_likes: 0,
    period_shares: 0,
  });

  const currentUser = getUserState();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [timer, setTimer] = useState<number>(TIMER_INTERVAL);
  const [isActive, setIsActive] = useState(false);

  function toggle_timer() {
    setIsActive(!isActive);
  }

  const reset_timer = () => {
    setTimer(TIMER_INTERVAL);
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);

      if (timer === 0) {
        reset_timer();
        showMessage({
          message: 'Fetching Live Stats',
          type: 'success',
        });
        fetchAccountStats(currentUser!.id);
      }
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const fetchSnapStats = useCallback(
    async (userID: string) => {
      if (
        startDate.toISOString().split('T')[0] ===
          new Date().toISOString().split('T')[0] &&
        endDate.toISOString().split('T')[0] ===
          new Date().toISOString().split('T')[0]
      ) {
        setSnapStatistics({
          total_snaps: 0,
          total_likes: 0,
          total_shares: 0,
          period_snaps: 0,
          period_likes: 0,
          period_shares: 0,
        });

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
        setAccountStatistics({
          total_snaps: 0,
          total_likes: 0,
          total_shares: 0,
          period_snaps: 0,
          period_likes: 0,
          period_shares: 0,
        });

        return;
      }

      try {
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

  const [selectedTab, setSelectedTab] = useState<'periodStats' | 'liveStats'>(
    'periodStats'
  );

  const handleTabChange = (tab: 'periodStats' | 'liveStats') => {
    if (tab === 'liveStats') {
      toggle_timer();
      reset_timer();
      setStartDate(new Date('2021-01-01'));
      setEndDate(new Date());
    } else {
      toggle_timer();
      reset_timer();
      setStartDate(new Date());
      setEndDate(new Date());
    }
    setSelectedTab(tab);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <FocusAwareStatusBar />
      <View className="flex-row">
        <Tab
          selected={selectedTab === 'periodStats'}
          title="Stats by Period"
          onPress={() => handleTabChange('periodStats')}
        />
        <Tab
          selected={selectedTab === 'liveStats'}
          title="Live"
          onPress={() => handleTabChange('liveStats')}
        />
      </View>
      {selectedTab === 'periodStats' ? (
        <View>
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

          <PeriodStats stats={snapStatistics} />
        </View>
      ) : (
        <View>
          <LiveStats stats={accountStatistics} />
        </View>
      )}
    </ScrollView>
  );
};

export default StatisticsScreen;
