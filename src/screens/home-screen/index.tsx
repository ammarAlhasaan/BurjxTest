import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useGetCoinsPaginatedInfiniteQuery,
  useGetGroupedCoinsQuery,
} from '@/src/state/slices/coinSlice';
import {Text, Spinner, Center} from '@/src/components/ui';
import CoinsList from './CoinList';



const HomeScreen = () => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetCoinsPaginatedInfiniteQuery(undefined, {
    pollingInterval: 10000,
  });
  useGetGroupedCoinsQuery(undefined, {
    pollingInterval: 10000,
  });

  const coins = useMemo(() => data?.pages.flatMap((page: any) => page.data) ?? [], [data]);

  if (isLoading) {
    return <Center className="flex-1"><Spinner /></Center>;
  }
  if (isError) {
    return <Text>Something went wrong...</Text>;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <CoinsList coins={coins} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
    </SafeAreaView>
  );
};

export default HomeScreen;
