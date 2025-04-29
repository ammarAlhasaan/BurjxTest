import React, {memo, useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useAppSelector} from '@/src/state/hooks';
import {selectGroupedCoins} from '@/src/state/slices/coinSlice';
import {ScrollableTabs} from '@/src/components/ui';
import GroupedCoinList from './GroupedCoinList';

const GroupedCoinSection = () => {
  const groupedCoins = useAppSelector(selectGroupedCoins);
  const [selectedGroup, setSelectedGroup] = useState<'featured' | 'topGainers' | 'topLosers'>('featured');

  const trendingCoins = useMemo(() => groupedCoins[selectedGroup], [groupedCoins, selectedGroup]);

  const handleTabChange = useCallback((group: 'featured' | 'topGainers' | 'topLosers') => {
    setSelectedGroup(group);
  }, []);
  const tabs = useMemo(() => ([
    { value: 'featured', label: '🔥 Featured' },
    { value: 'topGainers', label: '🚀 Top Gainers' },
    { value: 'topLosers', label: '🚨 Top Losers' },
  ]), []);
  return (
    <View className="mb-4">
      <View className="mb-4">
        <ScrollableTabs
          tabs={tabs}
          // @ts-ignore
          onTabChange={handleTabChange}
        />
      </View>
      <GroupedCoinList items={trendingCoins}/>
    </View>
  );
};

export default memo(GroupedCoinSection);
