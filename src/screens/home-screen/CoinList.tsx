import React, {memo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {Text} from '@/src/components/ui';
import {useNavigation} from '@react-navigation/native';
import {Coin} from '@/src/types';
import CoinRow from './CoinRow';
import GroupedCoinSection from './GroupedCoinSection';


const CoinsList = memo(({coins, fetchNextPage, isFetchingNextPage}: {
  coins: Coin[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}) => {
  const navigation = useNavigation<any>();
  const renderItem = useCallback(
    ({item}: { item: Coin }) => (
      <CoinRow
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
      contentContainerStyle={{flexGrow: 1}}
      data={coins}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <Text>Loading more...</Text> : null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View className="mb-4">
          <GroupedCoinSection/>
          <View className="">
            <View className="p-4 border-b border-primary-500 self-start">
              <Text size="xl">All Coins</Text>
            </View>
          </View>
        </View>
      }
      ItemSeparatorComponent={() => <View className="m-2"/>}
    />
  );
});


export default CoinsList;
