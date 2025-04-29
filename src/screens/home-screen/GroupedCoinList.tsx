import React, {memo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Coin} from '@/src/types';
import CoinCard from './CoinCard';

const GroupedCoinList = memo(({items}: { items: Coin[] }) => {
  const navigation = useNavigation<any>();
  const renderItem = useCallback(
    ({item}: { item: Coin }) => (
      <CoinCard
        item={item}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('CoinDetails', {
            id: item.id,
          });
        }}/>
    ),
    [navigation]
  );
  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="m-1"/>}
    />
  );
});


export default memo(GroupedCoinList);
