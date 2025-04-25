import React from 'react';
import { useSelector } from 'react-redux';
import {selectAllCoins, useGetCoinsQuery} from '@/src/state/slices/coinSlice.ts';
import {FlatList, Text, View} from 'react-native';

const CoinList = () => {
  const { isLoading, isError, refetch } = useGetCoinsQuery({ page: 1, pageSize: 20 }, {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
  });

  const coins = useSelector(selectAllCoins);

  if (isLoading) {return <Text>Loading...</Text>;}
  if (isError) {return <Text>Failed to load data</Text>;}

  return (
    <FlatList
      data={coins}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Text>${item.currentPrice}</Text>
        </View>
      )}
    />
  );
};


export default CoinList;
